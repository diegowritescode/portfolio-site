export const SITE_URL = 'https://deviego.xyz';
export const GITHUB = 'https://github.com/diegowritescode';

export const profile = {
  name: 'Diego Ramírez',
  role: 'Backend engineer',
  location: 'Medellín, Colombia',
  headline: 'I build backend systems that stay correct under load, and I write down why.',
  summary:
    'Node.js, NestJS and TypeScript on PostgreSQL. Each system below is live, tested down to its invariants, deployed from immutable images, and explained in architecture decision records.',
};

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
}

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly kind: string;
  readonly tagline: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly metrics: readonly { readonly value: string; readonly label: string }[];
  readonly stack: readonly string[];
  readonly links: readonly ProjectLink[];
  readonly note: string;
}

export const projects: readonly Project[] = [
  {
    id: 'accesscore',
    name: 'AccessCore',
    kind: 'Identity & authorization platform',
    tagline: 'A hybrid ReBAC + RBAC + ABAC policy engine with Zanzibar-style consistency.',
    summary:
      'Relationships, IAM-style deny-override and Cedar-like conditions are resolved in one call that is deterministic, explainable, and consistent under concurrent writes. Other services authorize through its published SDK.',
    highlights: [
      'Consistency tokens and revision-keyed caching: a cached permit can never outlive a write or skip a step-up to MFA.',
      'Zanzibar-scale work: a decision cache, a batched decision log, a Watch API over SSE, and a Leopard-style flattened membership index gated per tenant.',
      'Security as the product: EdDSA tokens signed by non-exportable Vault Transit keys, refresh-token reuse detection, lockout, and a tamper-evident audit chain.',
      'An admin console behind a backend-for-frontend: the browser never holds a token.',
    ],
    metrics: [
      { value: '1.3 ms', label: 'p50 check with the decision cache (k6)' },
      { value: '~96%', label: 'merged line coverage' },
      { value: '27', label: 'architecture decision records' },
    ],
    stack: ['NestJS', 'PostgreSQL', 'Redis', 'Vault Transit', 'Drizzle', 'Next.js', 'Playwright'],
    links: [
      { label: 'Live console', href: 'https://console.deviego.xyz' },
      { label: 'API reference', href: 'https://auth.deviego.xyz/reference' },
      { label: 'Source', href: `${GITHUB}/accesscore` },
      { label: 'Decision records', href: `${GITHUB}/accesscore/tree/main/docs/adr` },
    ],
    note: 'The demo account is prefilled on the sign-in page. Its data resets every night.',
  },
  {
    id: 'miniledger',
    name: 'MiniLedger',
    kind: 'Double-entry ledger API',
    tagline: 'Money that is conserved, idempotent, and safe under concurrency.',
    summary:
      'Transfers post balanced entries between accounts, retries never double-spend, and every posting is hash-chained. It is the first consumer of AccessCore: every write is authorized through its SDK.',
    highlights: [
      'Balance enforced twice: by the domain model and by a deferred sum-zero trigger in PostgreSQL that rejects an unbalanced transaction at commit.',
      'Idempotency keys and ordered row locks: no double-spend on retry, and no lost update, write skew or deadlock under concurrent transfers.',
      'A per-account hash chain and a conservation proof that anyone can re-run from the dashboard.',
      'Browser tests run against the released AccessCore image, so a breaking change upstream turns this build red.',
    ],
    metrics: [
      { value: '~99%', label: 'merged line coverage' },
      { value: '100%', label: 'mutation score on the ledger domain' },
      { value: '14', label: 'architecture decision records' },
    ],
    stack: ['NestJS', 'PostgreSQL', 'Drizzle', 'fast-check', 'Next.js', 'Playwright'],
    links: [
      { label: 'Live dashboard', href: 'https://app.ledger.deviego.xyz' },
      { label: 'API docs', href: 'https://ledger.deviego.xyz/docs' },
      { label: 'Source', href: `${GITHUB}/miniledger` },
      { label: 'Decision records', href: `${GITHUB}/miniledger/tree/main/docs/adr` },
    ],
    note: 'Signs in through AccessCore with the same shared demo account.',
  },
];

export const practices: readonly { readonly title: string; readonly body: string }[] = [
  {
    title: 'Decisions are written down',
    body: 'Every significant choice has a decision record with its context, the alternatives, and the cost accepted. Each project ships architecture, data model, security, testing, deployment and trade-off documents.',
  },
  {
    title: 'Tests prove properties',
    body: 'Property-based tests state the invariants, mutation testing checks that the tests can fail, concurrency runs against real PostgreSQL, and Playwright drives the UIs. Read-only journeys run hourly against production.',
  },
  {
    title: 'Shipped like production',
    body: 'Images are built once in CI and deployed by commit SHA behind Traefik with TLS. Services run with least-privilege database roles, private metrics, memory limits and log rotation.',
  },
  {
    title: 'Fail closed, by design',
    body: 'Authorization denies when unsure, tokens are revocable before they expire, and a shared demo cannot be used to lock other visitors out. Each project carries its own threat model.',
  },
];

export type RoadmapStatus = 'Live' | 'Next' | 'Planned';

export const roadmap: readonly {
  readonly name: string;
  readonly status: RoadmapStatus;
  readonly body: string;
}[] = [
  {
    name: 'AccessCore',
    status: 'Live',
    body: 'Identity, sessions and a hybrid authorization engine.',
  },
  {
    name: 'MiniLedger',
    status: 'Live',
    body: 'A double-entry ledger that authorizes through AccessCore.',
  },
  {
    name: 'EventBridge',
    status: 'Next',
    body: 'A transactional outbox relayed to RabbitMQ, idempotent consumers, and dead-letter handling.',
  },
  {
    name: 'CQRS Reporting',
    status: 'Planned',
    body: 'Read models and projections fed by those events, with eventual consistency made explicit.',
  },
  {
    name: 'LegacyBridge',
    status: 'Planned',
    body: 'An anti-corruption layer over flat files and legacy interfaces.',
  },
  {
    name: 'Enterprise Ops Platform',
    status: 'Planned',
    body: 'The pieces above composed into one operable platform.',
  },
];
