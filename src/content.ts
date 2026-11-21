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
  /** The profile handle, as a username would read on a real profile. */
  handle: 'diegowritescode',
  location: { en: 'Medellín, Colombia', es: 'Medellín, Colombia' },
  role: {
    en: 'Software engineer',
    es: 'Ingeniero de software',
  },
  headlineLead: {
    en: 'Systems that stay correct',
    es: 'Sistemas que siguen siendo correctos',
  },
  headlineAccent: {
    en: 'under load.',
    es: 'bajo carga.',
  },
  summary: {
    en: 'Three years across a regulated bank, a SaaS I run alone, and products that shipped. Everything below is live — not a demo.',
    es: 'Tres años entre un banco regulado, un SaaS que opero solo, y productos que salieron a producción. Todo lo de abajo está en vivo — no es demo.',
  },
  stats: [
    { value: '4', label: { en: 'systems in production', es: 'sistemas en producción' } },
    { value: '120+', label: { en: 'decision records', es: 'registros de decisión' } },
    { value: '1.3ms', label: { en: 'p50 authz check', es: 'p50 de autorización' } },
  ],
  availability: {
    en: 'Open to remote and hybrid roles',
    es: 'Disponible para roles remotos e híbridos',
  },
  /** The bio, as the few stacked lines a profile shows under the name. */
  bio: {
    en: [
      'I build systems that handle money, identity and real customers — and I keep them running.',
      'Backend and full stack: Node.js · NestJS · TypeScript · PostgreSQL · React · AWS',
      'Shipped inside a regulated bank. Today I run a multi-tenant SaaS on my own, end to end.',
      'AI inside the product, and AI agents inside how I build it.',
    ],
    es: [
      'Construyo sistemas que manejan dinero, identidad y clientes reales — y los mantengo andando.',
      'Backend y full stack: Node.js · NestJS · TypeScript · PostgreSQL · React · AWS',
      'Entregué dentro de un banco regulado. Hoy opero un SaaS multi-tenant solo, de punta a punta.',
      'IA dentro del producto, y agentes de IA dentro de cómo lo construyo.',
    ],
  },
  /** The three counters in the profile header. */
  counts: [
    { value: '5', label: { en: 'projects', es: 'proyectos' } },
    { value: '4', label: { en: 'roles', es: 'roles' } },
    { value: '120+', label: { en: 'decision records', es: 'decisiones' } },
  ],
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
  prevImage: { en: 'Previous image', es: 'Imagen anterior' },
  nextImage: { en: 'Next image', es: 'Imagen siguiente' },
  portraitAlt: { en: 'Diego Ramírez', es: 'Diego Ramírez' },
  portraitHint: {
    en: 'move your cursor across the portrait',
    es: 'pasá el cursor sobre el retrato',
  },
  stackLabel: { en: 'Stack', es: 'Stack' },
  langSwitch: { en: 'Español', es: 'English' },
  langSwitchLabel: { en: 'Cambiar a español', es: 'Switch to English' },
  present: { en: 'Present', es: 'Actualidad' },

  /* ── Profile chrome ─────────────────────────────────────────────── */
  followLabel: { en: 'Hire me', es: 'Contrátame' },
  messageLabel: { en: 'Message', es: 'Mensaje' },
  verifiedLabel: { en: 'Verified', es: 'Verificado' },
  themeToDark: { en: 'Switch to dark mode', es: 'Cambiar a modo oscuro' },
  themeToLight: { en: 'Switch to light mode', es: 'Cambiar a modo claro' },
  tabProjects: { en: 'Projects', es: 'Proyectos' },
  tabExperience: { en: 'Experience', es: 'Experiencia' },
  tabAbout: { en: 'About', es: 'Sobre mí' },
  highlightsLabel: { en: 'Highlights', es: 'Destacadas' },
  closeLabel: { en: 'Close', es: 'Cerrar' },
  openProject: { en: 'Open project', es: 'Abrir proyecto' },
  metricsLabel: { en: 'Key numbers', es: 'Cifras clave' },
  awardLabel: { en: 'Award', es: 'Premio' },
} as const;

/** The story highlights: each circle opens a panel of existing content. */
export type HighlightId = 'stack' | 'approach' | 'experience' | 'awards' | 'cv';

export const highlights: readonly {
  readonly id: HighlightId;
  readonly label: I18n;
}[] = [
  { id: 'stack', label: { en: 'Stack', es: 'Stack' } },
  { id: 'approach', label: { en: 'Approach', es: 'Método' } },
  { id: 'experience', label: { en: 'Work', es: 'Trabajo' } },
  { id: 'awards', label: { en: 'Awards', es: 'Premios' } },
  { id: 'cv', label: { en: 'CV', es: 'CV' } },
];

/** The personal section: Diego, not the CV. */
export const about = {
  heading: { en: 'Hey, I am Diego', es: 'Hola, soy Diego' },
  lead: {
    en: 'I am a software engineer in Medellín, Colombia. I like problems where being almost right is not good enough: money that has to balance, permissions that have to hold, an order that has to reach the right kitchen.',
    es: 'Soy ingeniero de software en Medellín, Colombia. Me gustan los problemas donde estar casi bien no alcanza: plata que tiene que cuadrar, permisos que tienen que aguantar, un pedido que tiene que llegar a la cocina correcta.',
  },
  blocks: [
    {
      icon: 'mountain',
      title: {
        en: 'I walk 45 kilometres to log off',
        es: 'Camino 45 kilómetros para desconectarme',
      },
      body: {
        en: 'Long-distance hiking is my way out of the network. Full-day routes, no signal, nothing to refresh. It is the only place where a problem cannot be solved by typing faster, and most of what I have figured out about a stuck system, I figured out somewhere around kilometre thirty.',
        es: 'El senderismo de larga distancia es mi salida de la red. Rutas de día entero, sin señal, nada que refrescar. Es el único lugar donde un problema no se resuelve escribiendo más rápido, y la mayoría de lo que he entendido sobre un sistema atascado, lo entendí por ahí en el kilómetro treinta.',
      },
    },
    {
      icon: 'approach',
      title: { en: 'The trail taught me how I work', es: 'La montaña me enseñó cómo trabajo' },
      body: {
        en: 'A long route is not about speed, it is about pace you can hold and knowing the way back. I build the same way: write down the decision and what it costs, make the tests able to fail, and never ship something I could not operate at two in the morning. Nothing I have put in production has been a sprint.',
        es: 'Una ruta larga no se trata de velocidad, se trata de un ritmo que puedas sostener y de saber volver. Construyo igual: dejo escrita la decisión y lo que cuesta, hago que las pruebas puedan fallar, y no despliego algo que no pueda operar a las dos de la mañana. Nada de lo que he puesto en producción ha sido un sprint.',
      },
    },
    {
      icon: 'stack',
      title: {
        en: 'I build the tools I work with',
        es: 'Construyo las herramientas con las que trabajo',
      },
      body: {
        en: 'One engineer maintaining two products in production only works if the tooling carries part of the weight. So I built mine: a custom MCP server over my own codebase, subagents and hooks that handle generation, review and documentation. I direct them and review their output like a colleague pull request.',
        es: 'Un solo ingeniero manteniendo dos productos en producción solo funciona si las herramientas cargan parte del peso. Así que construí las mías: un servidor MCP propio sobre mi código, subagentes y hooks que se encargan de generación, revisión y documentación. Los dirijo y reviso su salida como un pull request de un compañero.',
      },
    },
    {
      icon: 'person',
      title: { en: 'Where I am going', es: 'Para dónde voy' },
      body: {
        en: 'I am learning English every day and preparing the AWS Solutions Architect certification, because I want to work with teams beyond Colombia and grow toward architecture. I am looking for a team that ships to real users and cares whether the thing still works on Monday.',
        es: 'Estudio inglés todos los días y preparo la certificación AWS Solutions Architect, porque quiero trabajar con equipos fuera de Colombia y crecer hacia arquitectura. Busco un equipo que le entregue a usuarios reales y al que le importe si la cosa sigue funcionando el lunes.',
      },
    },
  ],
} as const;

/** The stack, grouped the way the highlight panel shows it. */
export const stackGroups: readonly {
  readonly title: I18n;
  readonly items: readonly string[];
}[] = [
  {
    title: { en: 'Languages', es: 'Lenguajes' },
    items: ['TypeScript', 'JavaScript', 'Java', 'C#', 'Python', 'SQL'],
  },
  {
    title: { en: 'Backend', es: 'Backend' },
    items: ['Node.js', 'NestJS', 'Express', 'Spring Boot', '.NET', 'REST', 'OAuth 2.0'],
  },
  {
    title: { en: 'Frontend', es: 'Frontend' },
    items: ['React', 'Next.js', 'Vite', 'Tailwind CSS'],
  },
  {
    title: { en: 'Data', es: 'Datos' },
    items: ['PostgreSQL', 'pgvector', 'MySQL', 'DB2/AS400', 'Redis', 'Drizzle'],
  },
  {
    title: { en: 'AI in the product', es: 'IA en el producto' },
    items: ['OpenAI API', 'Anthropic API', 'RAG', 'pgvector', 'Schema validation'],
  },
  {
    title: { en: 'AI in how I build', es: 'IA en cómo construyo' },
    items: ['Claude Code', 'Codex CLI', 'Custom MCP servers', 'Subagents', 'Hooks'],
  },
  {
    title: { en: 'Infrastructure', es: 'Infraestructura' },
    items: ['Docker', 'Traefik', 'GitHub Actions', 'Vault', 'Prometheus', 'Grafana'],
  },
  {
    title: { en: 'Quality', es: 'Calidad' },
    items: ['Playwright', 'Jest', 'Vitest', 'fast-check', 'Selenium', 'SonarQube', 'k6'],
  },
];

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
  /** The project's own colour, used to tint its tile in the grid. */
  readonly tint: string;
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
    tint: '#f97316',
    kind: {
      en: 'Multi-tenant restaurant SaaS',
      es: 'SaaS multi-tenant para restaurantes',
    },
    tagline: {
      en: 'A WhatsApp agent that takes the order, and the operation that fulfils it.',
      es: 'Un agente de WhatsApp que toma el pedido, y la operación que lo cumple.',
    },
    summary: {
      en: 'One core serving several restaurants: orders, kitchen, tables, deliveries, billing. A conversational agent reads the message, queries the real menu over pgvector, and returns a structured order the backend validates. I designed, built, deployed and operate all of it.',
      es: 'Un core único atendiendo varios restaurantes: pedidos, cocina, mesas, domicilios, cobro. Un agente conversacional lee el mensaje, consulta el menú real sobre pgvector y devuelve un pedido estructurado que el backend valida. Lo diseñé, construí, desplegué y lo opero.',
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
    id: 'ldm-campanas',
    name: 'LDM Campañas',
    tint: '#ec4899',
    kind: {
      en: 'Multi-network advertising SaaS',
      es: 'SaaS de publicidad multi-red',
    },
    tagline: {
      en: 'One message in, live campaigns across Meta, Google Ads and TikTok out.',
      es: 'Entra un mensaje, salen campañas en Meta, Google Ads y TikTok.',
    },
    summary: {
      en: 'The person describes what they want to sell in a chat. The platform designs audiences, copy and images for each network, creates everything paused and ready to launch, then syncs metrics and recommends what to do next. In production as v2.83.0. I was the technical owner end to end.',
      es: 'La persona cuenta en un chat lo que quiere vender. La plataforma diseña públicos, textos e imágenes para cada red, crea todo en pausa listo para activar, y luego sincroniza métricas y recomienda qué hacer. En producción como v2.83.0. Fui el responsable técnico de punta a punta.',
    },
    highlights: {
      en: [
        'Three very different ad APIs behind one contract — campaign, set, ad — so adding a network means implementing that contract, not rewriting the product. Every quirk of each network is pinned by a test against the real API.',
        'Safe by design: everything is created paused, nothing is ever deleted on the network, tokens are encrypted with AES-256-GCM, and every action is audited.',
        'Location resolves exactly: a city never falls back to the whole country or to a namesake in another department, and it is rechecked before launch.',
        'The chat picked the correct campaign objective on 126 of 128 distinct phrasings in testing.',
      ],
      es: [
        'Tres APIs de anuncios muy distintas bajo un mismo contrato — campaña, conjunto, anuncio — así que agregar una red es implementar ese contrato, no reescribir el producto. Cada regla rara de cada red queda fijada por una prueba contra la API real.',
        'Seguro por diseño: todo se crea en pausa, nunca se borra nada en la red, los tokens van cifrados con AES-256-GCM y cada acción queda auditada.',
        'La ubicación se resuelve exacta: una ciudad nunca cae al país entero ni a un homónimo de otro departamento, y se vuelve a comprobar antes de lanzar.',
        'En pruebas, el chat eligió el objetivo correcto en 126 de 128 frases distintas.',
      ],
    },
    metrics: [
      { value: '3', label: { en: 'ad networks, one contract', es: 'redes, un contrato' } },
      {
        value: '126/128',
        label: { en: 'objectives chosen correctly', es: 'objetivos elegidos bien' },
      },
      { value: 'v2.83', label: { en: 'shipped to production', es: 'en producción' } },
    ],
    stack: [
      'Node.js',
      'Express',
      'React',
      'Vite',
      'PostgreSQL',
      'Zod',
      'Anthropic API',
      'Meta Marketing API',
      'Google Ads API',
      'TikTok Business API',
      'Playwright',
      'Docker',
    ],
    links: [],
    note: {
      en: 'The code belongs to the company. Screens use a demo account with invented data.',
      es: 'El código es de la empresa. Las pantallas usan una cuenta de demostración con datos inventados.',
    },
    shots: [
      {
        src: '/media/ldm/01-home.jpg',
        alt: {
          en: 'Home screen with what the agent recommends today',
          es: 'Pantalla de inicio con lo que el agente recomienda hoy',
        },
      },
      {
        src: '/media/ldm/02-ai-create.jpg',
        alt: {
          en: 'Creating a campaign by describing it in a chat',
          es: 'Creando una campaña describiéndola en un chat',
        },
      },
      {
        src: '/media/ldm/03-campaigns.jpg',
        alt: {
          en: 'Campaign list across the three networks',
          es: 'Lista de campañas en las tres redes',
        },
      },
      {
        src: '/media/ldm/04-detail.jpg',
        alt: {
          en: 'Campaign detail with sets and ads',
          es: 'Detalle de campaña con conjuntos y anuncios',
        },
      },
      {
        src: '/media/ldm/05-results.jpg',
        alt: { en: 'Results and synced metrics', es: 'Resultados y métricas sincronizadas' },
      },
      {
        src: '/media/ldm/06-brands.jpg',
        alt: {
          en: 'Client brands, each with its own memory and gallery',
          es: 'Marcas de clientes, cada una con su memoria y galería',
        },
      },
      {
        src: '/media/ldm/07-mobile.jpg',
        alt: { en: 'The same platform on a phone', es: 'La misma plataforma en un celular' },
      },
    ],
  },
  {
    id: 'accesscore',
    name: 'AccessCore',
    tint: '#6366f1',
    kind: {
      en: 'Identity & authorization platform',
      es: 'Plataforma de identidad y autorización',
    },
    tagline: {
      en: 'A hybrid ReBAC + RBAC + ABAC policy engine with Zanzibar-style consistency.',
      es: 'Un motor de políticas híbrido ReBAC + RBAC + ABAC con consistencia estilo Zanzibar.',
    },
    summary: {
      en: 'Relationships, IAM-style deny-override and Cedar-like conditions resolved in one call: deterministic, explainable, consistent under concurrent writes.',
      es: 'Relaciones, deny-override estilo IAM y condiciones tipo Cedar resueltas en una llamada: determinista, explicable, consistente bajo escrituras concurrentes.',
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
    tint: '#0ea5e9',
    kind: { en: 'Double-entry ledger API', es: 'API de contabilidad por partida doble' },
    tagline: {
      en: 'Money that is conserved, idempotent, and safe under concurrency.',
      es: 'Dinero que se conserva, idempotente y seguro bajo concurrencia.',
    },
    summary: {
      en: 'Balanced entries between accounts, retries that never double-spend, every posting hash-chained. The first consumer of AccessCore.',
      es: 'Asientos balanceados entre cuentas, reintentos que nunca duplican el gasto, cada asiento encadenado por hash. El primer consumidor de AccessCore.',
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
    tint: '#22c55e',
    kind: {
      en: 'Tokenized recycling with blockchain and IoT',
      es: 'Reciclaje tokenizado con blockchain e IoT',
    },
    tagline: {
      en: 'Recycling that pays the resident, routed by the city it runs on.',
      es: 'Reciclaje que le paga al residente, enrutado por la ciudad donde corre.',
    },
    summary: {
      en: 'Residents earn tokens for material they separate; collectors get routes optimized over a real map of Medellín. Three dashboards, one domain, working by the end of the event.',
      es: 'Los residentes ganan tokens por el material que separan; los recolectores reciben rutas optimizadas sobre un mapa real de Medellín. Tres paneles, un dominio, funcionando al cierre del evento.',
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
      {
        value: '2',
        label: { en: 'additional technical awards', es: 'reconocimientos técnicos extra' },
      },
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
    stack: [
      'TypeScript',
      'Node.js',
      'React',
      'Next.js',
      'PostgreSQL',
      'OAuth 2.0',
      'Anthropic API',
    ],
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
