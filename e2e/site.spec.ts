import { expect, test } from '@playwright/test';

const projects = [
  {
    name: 'AccessCore',
    links: {
      'Live console': 'https://console.deviego.xyz',
      'API reference': 'https://auth.deviego.xyz/reference',
      Source: 'https://github.com/diegowritescode/accesscore',
      'Decision records': 'https://github.com/diegowritescode/accesscore/tree/main/docs/adr',
    },
  },
  {
    name: 'MiniLedger',
    links: {
      'Live dashboard': 'https://app.ledger.deviego.xyz',
      'API docs': 'https://ledger.deviego.xyz/docs',
      Source: 'https://github.com/diegowritescode/miniledger',
      'Decision records': 'https://github.com/diegowritescode/miniledger/tree/main/docs/adr',
    },
  },
];

test('presents the engineer and both live systems @mobile', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Backend engineer/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  for (const project of projects) {
    const card = page.getByRole('article', { name: project.name });
    await expect(card).toBeVisible();
    await expect(card.getByText('Live', { exact: true })).toBeVisible();
  }
});

test('links every project to its live system, source and decision records', async ({ page }) => {
  await page.goto('/');

  for (const project of projects) {
    const card = page.getByRole('article', { name: project.name });
    for (const [label, href] of Object.entries(project.links)) {
      await expect(card.getByRole('link', { name: label })).toHaveAttribute('href', href);
    }
  }
});

test('opens every external link in a new tab without exposing the opener', async ({ page }) => {
  await page.goto('/');

  const external = page.locator('a[target="_blank"]');
  expect(await external.count()).toBeGreaterThan(0);
  for (const rel of await external.evaluateAll((links) =>
    links.map((link) => (link as HTMLAnchorElement).rel),
  )) {
    expect(rel).toContain('noopener');
  }
});

test('reaches each section from the header', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Sections' });

  for (const [label, heading] of [
    ['Work', 'Two systems, both running in production'],
    ['Approach', 'How these are built'],
    ['Roadmap', 'What comes next'],
  ] as const) {
    await nav.getByRole('link', { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`#${label.toLowerCase()}$`));
    await expect(page.getByRole('heading', { level: 2, name: heading })).toBeInViewport();
  }
});

test('loads without console errors or content-security violations @mobile', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  expect(errors).toEqual([]);
});

test('fits the viewport without horizontal scrolling @mobile', async ({ page }) => {
  await page.goto('/');

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test('serves security headers and a cache policy per asset type', async ({ page, request }) => {
  const response = await request.get('/');
  const headers = response.headers();
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(headers['cache-control']).toBe('no-cache');

  await page.goto('/');
  const script = await page.locator('script[src*="/_next/static/"]').first().getAttribute('src');
  const asset = await request.get(script ?? '');
  expect(asset.headers()['cache-control']).toContain('immutable');
});

test('answers an unknown path with the 404 page', async ({ page }) => {
  const response = await page.goto('/no-such-page');

  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'This page does not exist.' })).toBeVisible();
  await page.getByRole('link', { name: /Back to/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
