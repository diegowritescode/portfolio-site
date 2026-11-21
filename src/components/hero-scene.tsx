'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * A field of packets travelling along a tenant graph.
 * It reads as infrastructure under load, which is what the site is about.
 * The camera drifts with scroll progress, so the scene belongs to the page
 * rather than sitting behind it.
 */

const NODES = 46;
const PACKETS = 26;

interface Built {
  readonly positions: Float32Array;
  readonly linePositions: Float32Array;
  readonly routes: readonly (readonly [THREE.Vector3, THREE.Vector3])[];
}

function build(): Built {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < NODES; i += 1) {
    // Deterministic pseudo-random: identical on every load, no hydration drift.
    const a = Math.sin(i * 12.9898) * 43758.5453;
    const b = Math.sin(i * 78.233) * 43758.5453;
    const c = Math.sin(i * 39.425) * 43758.5453;
    points.push(
      new THREE.Vector3(
        (a - Math.floor(a) - 0.5) * 13,
        (b - Math.floor(b) - 0.5) * 7.2,
        (c - Math.floor(c) - 0.5) * 7,
      ),
    );
  }

  const positions = new Float32Array(NODES * 3);
  points.forEach((p, i) => {
    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;
  });

  // Connect each node to its nearest neighbours, which gives a mesh that
  // looks like a real topology instead of random noise.
  const linePoints: number[] = [];
  const routes: [THREE.Vector3, THREE.Vector3][] = [];
  points.forEach((from, i) => {
    const near = points
      .map((to, j) => ({ j, d: from.distanceTo(to) }))
      .filter((entry) => entry.j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, 2);
    for (const { j } of near) {
      const to = points[j];
      if (!to || j < i) continue;
      linePoints.push(from.x, from.y, from.z, to.x, to.y, to.z);
      if (routes.length < PACKETS) routes.push([from, to]);
    }
  });

  return { positions, linePositions: new Float32Array(linePoints), routes };
}

function Field({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const { positions, linePositions, routes } = useMemo(build, []);
  const group = useRef<THREE.Group>(null);
  const packets = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { camera } = useThree();
  const clock = useRef(0);

  useFrame((_, delta) => {
    clock.current += delta;
    const t = clock.current;
    const scroll = scrollRef.current ?? 0;

    if (group.current) {
      group.current.rotation.y = t * 0.035 + scroll * 0.9;
      group.current.rotation.x = Math.sin(t * 0.14) * 0.08 - scroll * 0.25;
    }

    // Pull the camera back and down as the visitor scrolls past the hero.
    camera.position.z = 11 + scroll * 7;
    camera.position.y = scroll * -2.4;
    camera.lookAt(0, 0, 0);

    // Each packet travels its own edge on a loop, offset so they never sync.
    const mesh = packets.current;
    if (!mesh) return;
    routes.forEach(([from, to], i) => {
      const progress = (t * 0.26 + i * 0.137) % 1;
      dummy.position.lerpVectors(from, to, progress);
      const fade = Math.sin(progress * Math.PI);
      dummy.scale.setScalar(0.035 + fade * 0.055);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1d5a52" transparent opacity={0.55} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={NODES}
          />
        </bufferGeometry>
        <pointsMaterial color="#4ae3c4" size={0.085} transparent opacity={0.75} sizeAttenuation />
      </points>

      <instancedMesh ref={packets} args={[undefined, undefined, PACKETS]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color="#6cf0d6" transparent opacity={0.95} />
      </instancedMesh>
    </group>
  );
}

function StaticFallback() {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" aria-hidden="true" focusable="false">
      <g stroke="#1d5a52" strokeOpacity="0.7" fill="none" strokeWidth="1">
        <path d="M80 380 L210 180 L350 300 L470 140 L620 250 L720 170" />
        <path d="M80 380 L250 410 L400 320 L560 390 L720 290" />
        <path d="M210 180 L400 320 M350 300 L560 390 M470 140 L720 290 M620 250 L400 320" />
      </g>
      <g fill="#4ae3c4" fillOpacity="0.8">
        {[
          [80, 380],
          [210, 180],
          [350, 300],
          [470, 140],
          [620, 250],
          [720, 170],
          [250, 410],
          [400, 320],
          [560, 390],
          [720, 290],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" />
        ))}
      </g>
    </svg>
  );
}

export function HeroScene({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      const probe = document.createElement('canvas');
      if (probe.getContext('webgl2') ?? probe.getContext('webgl')) setEnabled(true);
    } catch {
      // No WebGL: the SVG already on screen stays.
    }
  }, []);

  if (!enabled) return <StaticFallback />;

  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 55 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ pointerEvents: 'none' }}
    >
      <Field scrollRef={scrollRef} />
    </Canvas>
  );
}
