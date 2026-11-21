export const SITE_URL = 'https://deviego.xyz';
export const GITHUB = 'https://github.com/diegowritescode';
export const LINKEDIN = 'https://linkedin.com/in/diego-andres-ramirez-mejia';
export const EMAIL = 'diegowritescode@gmail.com';

export type Lang = 'en' | 'es';
export const LANGS: readonly Lang[] = ['en', 'es'];
export const DEFAULT_LANG: Lang = 'en';

/** A string that exists in both languages. */
export type I18n = Readonly<Record<Lang, string>>;
/** A list that exists in both languages. */
export type I18nList = Readonly<Record<Lang, readonly string[]>>;

export const profile = {
  name: 'Diego Ramírez',
  location: { en: 'Medellín, Colombia', es: 'Medellín, Colombia' },
  role: {
    en: 'Software engineer',
    es: 'Ingeniero de software',
  },
  headline: {
    en: 'I build systems that stay correct under load, and I write down why.',
    es: 'Construyo sistemas que se mantienen correctos bajo carga, y dejo escrito por qué.',
  },
  summary: {
    en: 'Three years across banking, SaaS and my own products. Node.js, NestJS and TypeScript on PostgreSQL, with Java and .NET behind me. Every system below is live, tested down to its invariants, deployed from immutable images, and explained in architecture decision records.',
    es: 'Tres años entre banca, SaaS y producto propio. Node.js, NestJS y TypeScript sobre PostgreSQL, con Java y .NET detrás. Cada sistema de abajo está en producción, probado hasta sus invariantes, desplegado desde imágenes inmutables y explicado en registros de decisión de arquitectura.',
  },
  availability: {
    en: 'Open to remote and hybrid roles',
    es: 'Disponible para roles remotos e híbridos',
  },
} as const;

export const nav = {
  work: { en: 'Work', es: 'Proyectos' },
  experience: { en: 'Experience', es: 'Experiencia' },
  approach: { en: 'Approach', es: 'Método' },
  roadmap: { en: 'Roadmap', es: 'Ruta' },
  contact: { en: 'Contact', es: 'Contacto' },
} as const;

export const ui = {
  skipToContent: { en: 'Skip to content', es: 'Saltar al contenido' },
  seeTheWork: { en: 'See the work', es: 'Ver los proyectos' },
  githubProfile: { en: 'GitHub profile', es: 'Perfil de GitHub' },
  downloadCv: { en: 'Download CV', es: 'Descargar CV' },
  newTab: { en: 'opens in a new tab', es: 'abre en una pestaña nueva' },
  liveLabel: { en: 'Live', es: 'En vivo' },
  screenshots: { en: 'Screens', es: 'Pantallas' },
  closeImage: { en: 'Close image', es: 'Cerrar imagen' },
  stackLabel: { en: 'Stack', es: 'Stack' },
  langSwitch: { en: 'Español', es: 'English' },
  langSwitchLabel: { en: 'Cambiar a español', es: 'Switch to English' },
  present: { en: 'Present', es: 'Actualidad' },
  heroCaption: {
    en: 'Each node is a tenant. The highlighted path is one authorization resolving: relationships first, then roles, then conditions.',
    es: 'Cada nodo es un cliente. El camino resaltado es una autorización resolviéndose: primero relaciones, luego roles, luego condiciones.',
  },
  heroPause: { en: 'Pause animation', es: 'Pausar animación' },
  heroPlay: { en: 'Play animation', es: 'Reproducir animación' },
} as const;

export interface ProjectLink {
  readonly label: I18n;
  readonly href: string;
}

export interface Shot {
  readonly src: string;
  readonly alt: I18n;
}

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly kind: I18n;
  readonly tagline: I18n;
  readonly summary: I18n;
  readonly highlights: I18nList;
  readonly metrics: readonly { readonly value: string; readonly label: I18n }[];
  readonly stack: readonly string[];
  readonly links: readonly ProjectLink[];
  readonly note?: I18n;
  readonly shots?: readonly Shot[];
  readonly award?: I18n;
}

const L = {
  source: { en: 'Source', es: 'Código' },
  adr: { en: 'Decision records', es: 'Registros de decisión' },
  liveConsole: { en: 'Live console', es: 'Consola en vivo' },
  liveDashboard: { en: 'Live dashboard', es: 'Panel en vivo' },
  apiRef: { en: 'API reference', es: 'Referencia de la API' },
  apiDocs: { en: 'API docs', es: 'Documentación de la API' },
} as const;

export const projects: readonly Project[] = [
  {
    id: 'toque',
    name: 'Toque',
    kind: {
      en: 'Multi-tenant restaurant SaaS',
      es: 'SaaS multi-tenant para restaurantes',
    },
    tagline: {
      en: 'A WhatsApp agent that takes the order, and the operation that fulfils it.',
      es: 'Un agente de WhatsApp que toma el pedido, y la operación que lo cumple.',
    },
    summary: {
      en: 'An operations platform serving several restaurants from a single core: orders, kitchen, tables, deliveries and billing. A conversational agent reads the customer message, queries the real menu through retrieval over pgvector, and returns a structured order the backend validates before creating. I designed, built, deployed and operate all of it.',
      es: 'Una plataforma de operación que atiende varios restaurantes desde un core único: pedidos, cocina, mesas, domicilios y cobro. Un agente conversacional lee el mensaje del cliente, consulta el menú real con recuperación sobre pgvector y devuelve un pedido estructurado que el backend valida antes de crear. Lo diseñé, construí, desplegué y lo opero.',
    },
    highlights: {
      en: [
        'Tenant isolation is enforced in the query layer, not in application logic: the AI agent cannot read another restaurant because the filter and the similarity search run in the same SQL statement.',
        'A second product — QR self-ordering at the table — shipped on the same core without forking code, which is the test any multi-tenant design has to pass.',
        'The model proposes, the backend decides: every generated order is validated against the schema before a row is written.',
        'Delivery zones as geofences validated by latitude and longitude, per-dish and per-courier schedules, and single-use delivery codes verified at the door.',
      ],
      es: [
        'El aislamiento entre clientes se aplica en la capa de consulta, no en la lógica de la aplicación: el agente no puede leer otro restaurante porque el filtro y la búsqueda por similitud corren en la misma sentencia SQL.',
        'Un segundo producto — autoservicio por QR en mesa — salió sobre el mismo core sin bifurcar código, que es la prueba que cualquier diseño multi-tenant tiene que pasar.',
        'El modelo propone, el backend decide: cada pedido generado se valida contra el esquema antes de escribir una fila.',
        'Zonas de domicilio como geocercas validadas por latitud y longitud, horarios por plato y por repartidor, y códigos de entrega de un solo uso verificados en la puerta.',
      ],
    },
    metrics: [
      { value: '2', label: { en: 'products on one core', es: 'productos sobre un core' } },
      { value: '80+', label: { en: 'architecture decision records', es: 'registros de decisión' } },
      { value: '1', label: { en: 'engineer, end to end', es: 'ingeniero, de punta a punta' } },
    ],
    stack: [
      'TypeScript',
      'Node.js',
      'React',
      'Next.js',
      'PostgreSQL',
      'pgvector',
      'OpenAI API',
      'WhatsApp Cloud API',
      'Docker',
      'Traefik',
    ],
    links: [{ label: { en: 'Live site', es: 'Sitio en vivo' }, href: 'https://aiteralabs.com' }],
    note: {
      en: 'Screens come from a demo tenant with invented customers and phone numbers.',
      es: 'Las pantallas vienen de un cliente de demostración con comensales y teléfonos inventados.',
    },
    shots: [
      {
        src: '/media/toque/01-orders.jpg',
        alt: {
          en: 'Order board showing each order moving through its lifecycle',
          es: 'Tablero de pedidos con cada pedido avanzando en su ciclo de vida',
        },
      },
      {
        src: '/media/toque/02-whatsapp-agent.jpg',
        alt: {
          en: 'Internal inbox rendering a WhatsApp conversation with the ordering agent',
          es: 'Bandeja interna que renderiza una conversación de WhatsApp con el agente de pedidos',
        },
      },
      {
        src: '/media/toque/03-kitchen.jpg',
        alt: {
          en: 'Real-time kitchen screen grouped by preparation station',
          es: 'Pantalla de cocina en tiempo real agrupada por estación de preparación',
        },
      },
      {
        src: '/media/toque/04-couriers.jpg',
        alt: {
          en: 'Courier assignment view with delivery zones',
          es: 'Vista de asignación de domiciliarios con zonas de entrega',
        },
      },
      {
        src: '/media/toque/05-tables.jpg',
        alt: {
          en: 'Table map with per-table state and open tabs',
          es: 'Mapa de mesas con estado por mesa y cuentas abiertas',
        },
      },
      {
        src: '/media/toque/06-qr-ordering.jpg',
        alt: {
          en: 'Customer ordering from the table by scanning a QR code',
          es: 'Cliente pidiendo desde la mesa escaneando un código QR',
        },
      },
      {
        src: '/media/toque/07-whatsapp-thread.jpg',
        alt: {
          en: 'The same conversation as the customer sees it in WhatsApp',
          es: 'La misma conversación como la ve el cliente en WhatsApp',
        },
      },
    ],
  },
  {
    id: 'accesscore',
    name: 'AccessCore',
    kind: {
      en: 'Identity & authorization platform',
      es: 'Plataforma de identidad y autorización',
    },
    tagline: {
      en: 'A hybrid ReBAC + RBAC + ABAC policy engine with Zanzibar-style consistency.',
      es: 'Un motor de políticas híbrido ReBAC + RBAC + ABAC con consistencia estilo Zanzibar.',
    },
    summary: {
      en: 'Relationships, IAM-style deny-override and Cedar-like conditions are resolved in one call that is deterministic, explainable, and consistent under concurrent writes. Other services authorize through its published SDK.',
      es: 'Relaciones, deny-override estilo IAM y condiciones tipo Cedar se resuelven en una sola llamada determinista, explicable y consistente bajo escrituras concurrentes. Otros servicios autorizan a través de su SDK publicado.',
    },
    highlights: {
      en: [
        'Consistency tokens and revision-keyed caching: a cached permit can never outlive a write or skip a step-up to MFA.',
        'Zanzibar-scale work: a decision cache, a batched decision log, a Watch API over SSE, and a Leopard-style flattened membership index gated per tenant.',
        'Security as the product: EdDSA tokens signed by non-exportable Vault Transit keys, refresh-token reuse detection, lockout, and a tamper-evident audit chain.',
        'An admin console behind a backend-for-frontend: the browser never holds a token.',
      ],
      es: [
        'Tokens de consistencia y caché por revisión: un permiso en caché nunca puede sobrevivir a una escritura ni saltarse una elevación a MFA.',
        'Trabajo a escala Zanzibar: caché de decisiones, log de decisiones por lotes, Watch API sobre SSE e índice de membresía aplanado estilo Leopard, habilitado por cliente.',
        'La seguridad como producto: tokens EdDSA firmados con claves no exportables de Vault Transit, detección de reuso de refresh tokens, bloqueo por intentos y cadena de auditoría a prueba de manipulación.',
        'Una consola de administración detrás de un backend-for-frontend: el navegador nunca sostiene un token.',
      ],
    },
    metrics: [
      {
        value: '1.3 ms',
        label: {
          en: 'p50 check with the decision cache (k6)',
          es: 'p50 de verificación con caché (k6)',
        },
      },
      { value: '~96%', label: { en: 'merged line coverage', es: 'cobertura de líneas combinada' } },
      { value: '27', label: { en: 'architecture decision records', es: 'registros de decisión' } },
    ],
    stack: ['NestJS', 'PostgreSQL', 'Redis', 'Vault Transit', 'Drizzle', 'Next.js', 'Playwright'],
    links: [
      { label: L.liveConsole, href: 'https://console.deviego.xyz' },
      { label: L.apiRef, href: 'https://auth.deviego.xyz/reference' },
      { label: L.source, href: `${GITHUB}/accesscore` },
      { label: L.adr, href: `${GITHUB}/accesscore/tree/main/docs/adr` },
    ],
    note: {
      en: 'The demo account is prefilled on the sign-in page. Its data resets every night.',
      es: 'La cuenta de demostración viene precargada en la página de ingreso. Sus datos se reinician cada noche.',
    },
  },
  {
    id: 'miniledger',
    name: 'MiniLedger',
    kind: { en: 'Double-entry ledger API', es: 'API de contabilidad por partida doble' },
    tagline: {
      en: 'Money that is conserved, idempotent, and safe under concurrency.',
      es: 'Dinero que se conserva, idempotente y seguro bajo concurrencia.',
    },
    summary: {
      en: 'Transfers post balanced entries between accounts, retries never double-spend, and every posting is hash-chained. It is the first consumer of AccessCore: every write is authorized through its SDK.',
      es: 'Las transferencias registran asientos balanceados entre cuentas, los reintentos nunca duplican el gasto y cada asiento va encadenado por hash. Es el primer consumidor de AccessCore: cada escritura se autoriza a través de su SDK.',
    },
    highlights: {
      en: [
        'Balance enforced twice: by the domain model and by a deferred sum-zero trigger in PostgreSQL that rejects an unbalanced transaction at commit.',
        'Idempotency keys and ordered row locks: no double-spend on retry, and no lost update, write skew or deadlock under concurrent transfers.',
        'A per-account hash chain and a conservation proof that anyone can re-run from the dashboard.',
        'Browser tests run against the released AccessCore image, so a breaking change upstream turns this build red.',
      ],
      es: [
        'El balance se exige dos veces: por el modelo de dominio y por un trigger diferido de suma cero en PostgreSQL que rechaza una transacción desbalanceada al confirmar.',
        'Claves de idempotencia y bloqueos de fila ordenados: sin doble gasto al reintentar, y sin lost update, write skew ni deadlock bajo transferencias concurrentes.',
        'Una cadena de hash por cuenta y una prueba de conservación que cualquiera puede volver a correr desde el panel.',
        'Las pruebas de navegador corren contra la imagen publicada de AccessCore, así que un cambio incompatible aguas arriba pone este build en rojo.',
      ],
    },
    metrics: [
      { value: '~99%', label: { en: 'merged line coverage', es: 'cobertura de líneas combinada' } },
      {
        value: '100%',
        label: {
          en: 'mutation score on the ledger domain',
          es: 'mutation score en el dominio contable',
        },
      },
      { value: '14', label: { en: 'architecture decision records', es: 'registros de decisión' } },
    ],
    stack: ['NestJS', 'PostgreSQL', 'Drizzle', 'fast-check', 'Next.js', 'Playwright'],
    links: [
      { label: L.liveDashboard, href: 'https://app.ledger.deviego.xyz' },
      { label: L.apiDocs, href: 'https://ledger.deviego.xyz/docs' },
      { label: L.source, href: `${GITHUB}/miniledger` },
      { label: L.adr, href: `${GITHUB}/miniledger/tree/main/docs/adr` },
    ],
    note: {
      en: 'Signs in through AccessCore with the same shared demo account.',
      es: 'Ingresa a través de AccessCore con la misma cuenta de demostración compartida.',
    },
  },
  {
    id: 'zyrcle',
    name: 'Zyrcle',
    kind: {
      en: 'Tokenized recycling with blockchain and IoT',
      es: 'Reciclaje tokenizado con blockchain e IoT',
    },
    tagline: {
      en: 'Recycling that pays the resident, routed by the city it runs on.',
      es: 'Reciclaje que le paga al residente, enrutado por la ciudad donde corre.',
    },
    summary: {
      en: 'Residents earn tokens for material they separate correctly; collectors see routes optimized over a real map of Medellín; the operator sees the whole circuit. Three dashboards, one domain, built and working by the end of the event.',
      es: 'Los residentes ganan tokens por el material que separan bien; los recolectores ven rutas optimizadas sobre un mapa real de Medellín; el operador ve el circuito completo. Tres paneles, un dominio, construido y funcionando al cierre del evento.',
    },
    highlights: {
      en: [
        'First place overall, plus Best Use of Precompiles and Best Interoperability, judged on working software.',
        'Three role-specific dashboards — resident, collector and operator — over one shared domain model.',
        'Collection routes computed and drawn over the real street map of Medellín with Leaflet.',
        'On-chain rewards on Avalanche, with the contract reachable from the resident dashboard.',
      ],
      es: [
        'Primer puesto general, más Mejor Uso de Precompilados y Mejor Interoperabilidad, evaluados sobre software funcionando.',
        'Tres paneles según rol — residente, recolector y operador — sobre un mismo modelo de dominio.',
        'Rutas de recolección calculadas y dibujadas sobre el mapa real de calles de Medellín con Leaflet.',
        'Recompensas on-chain en Avalanche, con el contrato alcanzable desde el panel del residente.',
      ],
    },
    metrics: [
      {
        value: '1st',
        label: { en: 'place, Avalanche Hackadev 2025', es: 'puesto, Hackadev Avalanche 2025' },
      },
      { value: '3', label: { en: 'role-specific dashboards', es: 'paneles según rol' } },
      { value: '2', label: { en: 'additional technical awards', es: 'reconocimientos técnicos extra' } },
    ],
    stack: ['React', 'TypeScript', 'Python', 'Solidity', 'Avalanche', 'Leaflet'],
    links: [],
    award: {
      en: 'Avalanche Hackadev 2025 — Universidad Pontificia Bolivariana, Medellín',
      es: 'Hackadev Avalanche 2025 — Universidad Pontificia Bolivariana, Medellín',
    },
    shots: [
      {
        src: '/media/zyrcle/01-resident.jpg',
        alt: {
          en: 'Resident dashboard showing tokens earned per material type',
          es: 'Panel del residente con los tokens ganados por tipo de material',
        },
      },
      {
        src: '/media/zyrcle/02-routes.jpg',
        alt: {
          en: 'Collection routes drawn over the street map of Medellín',
          es: 'Rutas de recolección dibujadas sobre el mapa de calles de Medellín',
        },
      },
      {
        src: '/media/zyrcle/03-award.jpg',
        alt: {
          en: 'The team receiving first place at Avalanche Hackadev 2025',
          es: 'El equipo recibiendo el primer puesto en el Hackadev Avalanche 2025',
        },
      },
    ],
  },
];

export interface Role {
  readonly company: string;
  readonly client?: I18n;
  readonly title: I18n;
  readonly period: I18n;
  readonly body: I18n;
  readonly stack: readonly string[];
}

export const experience: readonly Role[] = [
  {
    company: 'Aitera Labs',
    title: { en: 'Technical owner', es: 'Responsable técnico' },
    period: { en: 'Sep 2026 — Present', es: 'Sep 2026 — Actualidad' },
    body: {
      en: 'Sole engineer on a multi-tenant SaaS in production: architecture, data model, APIs, interface, infrastructure and operations. I also built the tooling I work with — a custom MCP server over the codebase and data, plus subagents and hooks that carry code and test generation, review, decision records and operational tasks.',
      es: 'Único ingeniero de un SaaS multi-tenant en producción: arquitectura, modelo de datos, APIs, interfaz, infraestructura y operación. También construí las herramientas con las que trabajo — un servidor MCP propio sobre el código y los datos, más subagentes y hooks que sostienen generación de código y pruebas, revisión, registros de decisión y tareas de operación.',
    },
    stack: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'pgvector', 'Docker', 'Traefik', 'MCP'],
  },
  {
    company: 'Blackbird Labs',
    client: {
      en: 'Client: Tuya S.A., credit card issuer',
      es: 'Cliente: Tuya S.A., emisor de tarjetas de crédito',
    },
    title: { en: 'Backend developer', es: 'Desarrollador backend' },
    period: { en: 'Jul 2025 — Aug 2026', es: 'Jul 2025 — Ago 2026' },
    body: {
      en: 'Critical backend services in .NET, Java and Node.js in parallel over an AS400/DB2 banking core, under a regulated environment with strict security and traceability controls. Advanced SQL over high-volume transactional models, production debugging across distributed services, and automated suites in Playwright, Selenium and Postman with SonarQube in the pipeline.',
      es: 'Servicios backend críticos en .NET, Java y Node.js en paralelo sobre un core bancario AS400/DB2, en un entorno regulado con controles estrictos de seguridad y trazabilidad. SQL avanzado sobre modelos transaccionales de alto volumen, depuración en producción entre servicios distribuidos y suites automatizadas en Playwright, Selenium y Postman con SonarQube en el pipeline.',
    },
    stack: ['.NET', 'Java', 'Node.js', 'DB2/AS400', 'SQL', 'Playwright', 'Selenium', 'SonarQube'],
  },
  {
    company: 'Los de Marketing',
    title: { en: 'Full stack developer', es: 'Desarrollador full stack' },
    period: { en: 'Mar 2026 — Nov 2026', es: 'Mar 2026 — Nov 2026' },
    body: {
      en: 'Built the platform that turned the agency services into a product. The core problem was normalizing the Meta Ads, Google Ads and TikTok Ads APIs behind one abstraction: three OAuth flows, three token lifetimes, three data models, one interface. An AI layer turned natural-language instructions into structured operations validated against each platform before executing.',
      es: 'Construí la plataforma con la que la agencia convirtió sus servicios en producto. El problema central fue normalizar las APIs de Meta Ads, Google Ads y TikTok Ads detrás de una sola abstracción: tres flujos OAuth, tres vidas de token, tres modelos de datos, una interfaz. Una capa de IA traducía instrucciones en lenguaje natural a operaciones estructuradas, validadas contra cada plataforma antes de ejecutarse.',
    },
    stack: ['TypeScript', 'Node.js', 'React', 'Next.js', 'PostgreSQL', 'OAuth 2.0', 'Anthropic API'],
  },
  {
    company: 'Riwi.io',
    title: { en: 'Full stack developer', es: 'Desarrollador full stack' },
    period: { en: 'Feb 2024 — Apr 2025', es: 'Feb 2024 — Abr 2025' },
    body: {
      en: 'REST APIs in Node.js/Express and Java/Spring Boot with modular architecture and SOLID principles, with the PostgreSQL and MySQL schemas behind them. React interfaces on top, quality through Jest, code reviews and GitFlow, Docker on Linux, and mentoring for junior developers.',
      es: 'APIs REST en Node.js/Express y Java/Spring Boot con arquitectura modular y principios SOLID, junto con los esquemas en PostgreSQL y MySQL detrás. Interfaces en React encima, calidad con Jest, code reviews y GitFlow, Docker sobre Linux, y mentoría a desarrolladores junior.',
    },
    stack: ['Node.js', 'Express', 'Java', 'Spring Boot', 'React', 'PostgreSQL', 'MySQL', 'Docker'],
  },
];

export const practices: readonly { readonly title: I18n; readonly body: I18n }[] = [
  {
    title: { en: 'Decisions are written down', es: 'Las decisiones quedan escritas' },
    body: {
      en: 'Every significant choice has a decision record with its context, the alternatives, and the cost accepted. Each project ships architecture, data model, security, testing, deployment and trade-off documents.',
      es: 'Cada decisión significativa tiene un registro con su contexto, las alternativas y el costo aceptado. Cada proyecto incluye documentos de arquitectura, modelo de datos, seguridad, pruebas, despliegue y compromisos.',
    },
  },
  {
    title: { en: 'Tests prove properties', es: 'Las pruebas demuestran propiedades' },
    body: {
      en: 'Property-based tests state the invariants, mutation testing checks that the tests can fail, concurrency runs against real PostgreSQL, and Playwright drives the UIs. Read-only journeys run hourly against production.',
      es: 'Las pruebas basadas en propiedades declaran los invariantes, el mutation testing comprueba que las pruebas puedan fallar, la concurrencia corre contra PostgreSQL real y Playwright maneja las interfaces. Recorridos de solo lectura corren cada hora contra producción.',
    },
  },
  {
    title: { en: 'AI proposes, the system decides', es: 'La IA propone, el sistema decide' },
    body: {
      en: 'I direct coding agents through a custom MCP server and reviewed subagents, and I review their output with the same rigor as a colleague pull request. In production, model output is validated against the schema before it is persisted, and isolation lives in the query, not in the prompt.',
      es: 'Dirijo agentes de codificación a través de un servidor MCP propio y subagentes revisados, y reviso su salida con el mismo rigor que un pull request de un compañero. En producción, la salida del modelo se valida contra el esquema antes de persistirse, y el aislamiento vive en la consulta, no en el prompt.',
    },
  },
  {
    title: { en: 'Shipped like production', es: 'Desplegado como producción' },
    body: {
      en: 'Images are built once in CI and deployed by commit SHA behind Traefik with TLS. Services run with least-privilege database roles, private metrics, memory limits and log rotation.',
      es: 'Las imágenes se construyen una vez en CI y se despliegan por SHA de commit detrás de Traefik con TLS. Los servicios corren con roles de base de datos de mínimo privilegio, métricas privadas, límites de memoria y rotación de logs.',
    },
  },
];

export type RoadmapStatus = 'Live' | 'Next' | 'Planned';

export const roadmapStatusLabel: Readonly<Record<RoadmapStatus, I18n>> = {
  Live: { en: 'Live', es: 'En vivo' },
  Next: { en: 'Next', es: 'Siguiente' },
  Planned: { en: 'Planned', es: 'Planeado' },
};

export const roadmap: readonly {
  readonly name: string;
  readonly status: RoadmapStatus;
  readonly body: I18n;
}[] = [
  {
    name: 'AccessCore',
    status: 'Live',
    body: {
      en: 'Identity, sessions and a hybrid authorization engine.',
      es: 'Identidad, sesiones y un motor de autorización híbrido.',
    },
  },
  {
    name: 'MiniLedger',
    status: 'Live',
    body: {
      en: 'A double-entry ledger that authorizes through AccessCore.',
      es: 'Un libro contable de partida doble que autoriza a través de AccessCore.',
    },
  },
  {
    name: 'EventBridge',
    status: 'Next',
    body: {
      en: 'A transactional outbox relayed to RabbitMQ, idempotent consumers, and dead-letter handling.',
      es: 'Un outbox transaccional retransmitido a RabbitMQ, consumidores idempotentes y manejo de mensajes fallidos.',
    },
  },
  {
    name: 'CQRS Reporting',
    status: 'Planned',
    body: {
      en: 'Read models and projections fed by those events, with eventual consistency made explicit.',
      es: 'Modelos de lectura y proyecciones alimentados por esos eventos, con la consistencia eventual hecha explícita.',
    },
  },
  {
    name: 'LegacyBridge',
    status: 'Planned',
    body: {
      en: 'An anti-corruption layer over flat files and legacy interfaces.',
      es: 'Una capa anticorrupción sobre archivos planos e interfaces legadas.',
    },
  },
  {
    name: 'Enterprise Ops Platform',
    status: 'Planned',
    body: {
      en: 'The pieces above composed into one operable platform.',
      es: 'Las piezas anteriores compuestas en una sola plataforma operable.',
    },
  },
];

export const contact = {
  heading: { en: 'Get in touch', es: 'Hablemos' },
  body: {
    en: 'Open to remote and hybrid engineering roles. The fastest way to reach me is email.',
    es: 'Disponible para roles de ingeniería remotos e híbridos. La vía más rápida es el correo.',
  },
} as const;
