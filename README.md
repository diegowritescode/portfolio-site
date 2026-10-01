# deviego.xyz

The portfolio site at **[deviego.xyz](https://deviego.xyz)**: one page that presents the live
systems ([AccessCore](https://github.com/diegowritescode/accesscore) and
[MiniLedger](https://github.com/diegowritescode/miniledger)), how they are built, and what comes
next.

[![CI](https://github.com/diegowritescode/portfolio-site/actions/workflows/ci.yml/badge.svg)](https://github.com/diegowritescode/portfolio-site/actions/workflows/ci.yml)
[![Release](https://github.com/diegowritescode/portfolio-site/actions/workflows/release.yml/badge.svg)](https://github.com/diegowritescode/portfolio-site/actions/workflows/release.yml)
[![Production smoke](https://github.com/diegowritescode/portfolio-site/actions/workflows/smoke.yml/badge.svg)](https://github.com/diegowritescode/portfolio-site/actions/workflows/smoke.yml)

## Design decisions

- **Static export, not a Node server.** The page has no per-request data, so Next.js exports it to
  plain files at build time (`output: 'export'`). Nothing runs on the server but nginx, which
  removes a runtime, its memory, and its attack surface.
- **nginx, unprivileged and read-only.** The image is `nginx-unprivileged` (port 8080, non-root).
  Compose runs it with a read-only filesystem, a `/tmp` tmpfs, every Linux capability dropped and
  a 64 MB memory limit. It uses about 8 MB.
- **Headers set by the origin.** nginx sends a Content-Security-Policy that allows only same-origin
  resources (no third-party scripts, fonts or images), `nosniff`, a strict referrer policy and
  `frame-ancestors 'none'`, plus HSTS for the apex and its subdomains (every `deviego.xyz` host is
  served over TLS by Traefik). Hashed build assets under `/_next/static/` are cached for a year as
  `immutable`; HTML is `no-cache`, so a deploy is visible at once.
- **Content is data.** Every claim on the page lives in [`src/content.ts`](src/content.ts), typed,
  and each number is taken from the linked repository's README.
- **Same delivery as the systems it presents.** The image is built once in CI, pushed to GHCR under
  the commit SHA, and run by [`deploy/compose.yml`](deploy/compose.yml) behind the host's shared
  Traefik, which terminates TLS and redirects `www` to the apex.

## Tests

Playwright runs against the **production image**, not the dev server, so the nginx configuration
is under test too:

- both projects are shown, and every link points at the live system, the source or the decision
  records;
- every external link opens in a new tab with `noopener`;
- the header reaches each section;
- the page loads with no console errors or CSP violations, and fits a phone without horizontal
  scrolling;
- the security headers and the per-asset cache policy are present;
- an unknown path returns the 404 page.

The same suite runs **hourly against https://deviego.xyz** (`Production smoke`), after checking
that `www` redirects to the apex.

## Run it

```bash
npm ci
npm run dev                      # http://localhost:3010
npm run build                    # static export in out/

docker build -t portfolio-site . && docker run --rm -p 8080:8080 portfolio-site
npm run test:e2e                 # against http://localhost:8080 (E2E_BASE_URL to override)
```

## Deploy

On the host (Traefik attached to the external `edge` network, DNS for the apex and `www`):

```bash
git clone https://github.com/diegowritescode/portfolio-site.git /opt/portfolio/portfolio-site
cd /opt/portfolio/portfolio-site/deploy
cp .env.example .env             # SITE_IMAGE_TAG = the release commit SHA
docker compose pull && docker compose up -d
```

Rollback is the previous SHA in `SITE_IMAGE_TAG`.

## License

[Apache-2.0](LICENSE).
