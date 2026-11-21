'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * An authorization graph resolving, drawn the way AccessCore resolves one:
 * a subject reaches a resource through relationships, and the path lights up
 * edge by edge. It is a visual of the real thing, not an abstract decoration.
 */

const NODE_COUNT = 34;
const RING_RADIUS = 2.45;

interface Node {
  readonly position: THREE.Vector3;
  readonly scale: number;
}

interface Edge {
  readonly from: number;
  readonly to: number;
}

function buildGraph(): { nodes: readonly Node[]; edges: readonly Edge[]; path: readonly number[] } {
  // Deterministic layout: the same graph renders on every visit and in tests.
  const nodes: Node[] = [];
  for (let i = 0; i < NODE_COUNT; i += 1) {
    // Fibonacci sphere, flattened on Z so it reads as a graph, not a ball.
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * 2.399963229728653;
    nodes.push({
      position: new THREE.Vector3(
        Math.cos(theta) * radius * RING_RADIUS,
        y * 1.55,
        Math.sin(theta) * radius * RING_RADIUS * 0.55,
      ),
      scale: 0.035 + (i % 5) * 0.006,
    });
  }

  const edges: Edge[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < NODE_COUNT; i += 1) {
    // Each node links to its two nearest neighbours ahead of it in the spiral.
    for (const step of [1, 3]) {
      const to = (i + step) % NODE_COUNT;
      const key = i < to ? `${i}-${to}` : `${to}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ from: i, to });
    }
  }

  // The highlighted walk: subject → relationship → role → condition → resource.
  const path = [2, 5, 8, 11, 14, 17, 20];
  return { nodes, edges, path };
}

function Graph({ paused }: { paused: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { nodes, edges, path } = useMemo(buildGraph, []);

  const pathEdges = useMemo(() => {
    const segments: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < path.length - 1; i += 1) {
      const from = nodes[path[i] ?? 0];
      const to = nodes[path[i + 1] ?? 0];
      if (from && to) segments.push([from.position, to.position]);
    }
    return segments;
  }, [nodes, path]);

  const baseGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (const edge of edges) {
      const from = nodes[edge.from];
      const to = nodes[edge.to];
      if (from && to) points.push(from.position, to.position);
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [edges, nodes]);

  const pathRefs = useRef<(THREE.LineSegments | null)[]>([]);
  const pathNodeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const instances = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const elapsed = useRef(0);

  useEffect(() => {
    const mesh = instances.current;
    if (!mesh) return;
    nodes.forEach((node, i) => {
      dummy.position.copy(node.position);
      dummy.scale.setScalar(node.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [dummy, nodes]);

  useFrame((_, delta) => {
    if (paused) return;
    elapsed.current += delta;
    const t = elapsed.current;

    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.12) * 0.42;
      group.current.rotation.x = Math.sin(t * 0.09) * 0.1;
    }

    // Walk the path: one segment lights, holds, then hands off to the next.
    const cycle = pathEdges.length + 2.2;
    const head = (t * 0.85) % cycle;

    pathRefs.current.forEach((line, i) => {
      if (!line) return;
      const material = line.material as THREE.LineBasicMaterial;
      const distance = head - i;
      const lit = distance >= 0 ? Math.max(0, 1 - distance / 2.4) : 0;
      material.opacity = 0.14 + lit * 0.86;
    });

    // Lines are always 1px in WebGL, so the nodes on the path carry the signal.
    pathNodeRefs.current.forEach((node, i) => {
      if (!node) return;
      const distance = head - i;
      const lit = distance >= 0 ? Math.max(0, 1 - distance / 2.4) : 0;
      const material = node.material as THREE.MeshBasicMaterial;
      material.opacity = 0.2 + lit * 0.8;
      node.scale.setScalar(0.05 + lit * 0.055);
    });
  });

  return (
    <group ref={group}>
      <lineSegments geometry={baseGeometry}>
        <lineBasicMaterial color="#7b86ad" transparent opacity={0.3} />
      </lineSegments>

      {pathEdges.map((segment, i) => (
        <lineSegments
          key={i}
          ref={(node) => {
            pathRefs.current[i] = node;
          }}
          geometry={new THREE.BufferGeometry().setFromPoints(segment)}
        >
          <lineBasicMaterial color="#8b85ff" transparent opacity={0.14} />
        </lineSegments>
      ))}

      {path.map((nodeIndex, i) => {
        const node = nodes[nodeIndex];
        if (!node) return null;
        return (
          <mesh
            key={`path-node-${nodeIndex}`}
            ref={(mesh) => {
              pathNodeRefs.current[i] = mesh;
            }}
            position={node.position}
            scale={0.05}
          >
            <icosahedronGeometry args={[1, 2]} />
            <meshBasicMaterial color="#8b85ff" transparent opacity={0.2} />
          </mesh>
        );
      })}

      <instancedMesh ref={instances} args={[undefined, undefined, NODE_COUNT]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#9aa4d4" transparent opacity={0.72} />
      </instancedMesh>
    </group>
  );
}

/** A still frame for reduced motion, no-WebGL and the pre-mount render. */
function StaticFallback() {
  return (
    <svg
      viewBox="0 0 600 340"
      className="h-full w-full opacity-50"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeOpacity="0.22" fill="none">
        <path d="M60 250 L160 120 L270 210 L380 95 L500 180" />
        <path d="M60 250 L190 265 L300 200 L420 250 L540 160" />
        <path d="M160 120 L300 200 M270 210 L420 250 M380 95 L540 160" />
      </g>
      <g fill="currentColor" fillOpacity="0.5">
        {[
          [60, 250],
          [160, 120],
          [270, 210],
          [380, 95],
          [500, 180],
          [190, 265],
          [300, 200],
          [420, 250],
          [540, 160],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
        ))}
      </g>
    </svg>
  );
}

export function HeroScene({ paused = false }: { paused?: boolean }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    // Only mount WebGL where it actually works; otherwise the SVG stays.
    try {
      const probe = document.createElement('canvas');
      const gl = probe.getContext('webgl2') ?? probe.getContext('webgl');
      if (gl) setEnabled(true);
    } catch {
      // No WebGL: the fallback is already on screen.
    }
  }, []);

  if (!enabled) {
    return (
      <div className="h-full w-full text-brand">
        <StaticFallback />
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 44 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      frameloop={paused ? 'demand' : 'always'}
      style={{ pointerEvents: 'none' }}
    >
      <Graph paused={paused} />
    </Canvas>
  );
}
