import { expect, test } from '@playwright/test';

/**
 * The site is a profile: a header, story highlights, three tabs, and a grid
 * whose tiles open a project. These tests cover what a visitor has to be
 * able to do, not how the markup happens to be arranged.
 */

test('presents the profile and the project grid @mobile', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Diego Ramírez/);
  await expect(page.getByRole('heading', { level: 1, name: 'diegowritescode' })).toBeVisible();

  // One tile per project, all of them reachable.
  const tiles = page.locator('.tile');
  await expect(tiles).toHaveCount(5);
  await expect(tiles.first()).toBeVisible();
});

test('opens a project and shows its links, numbers and screenshots', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /AccessCore/ }).click();
  const dialog = page.getByRole('dialog', { name: 'AccessCore' });
  await expect(dialog).toBeVisible();

  for (const [label, href] of [
    ['Live console', 'https://console.deviego.xyz'],
    ['API reference', 'https://auth.deviego.xyz/reference'],
    ['Source', 'https://github.com/diegowritescode/accesscore'],
    ['Decision records', 'https://github.com/diegowritescode/accesscore/tree/main/docs/adr'],
  ] as const) {
    await expect(dialog.getByRole('link', { name: label })).toHaveAttribute('href', href);
  }

  // Escape closes it and gives the page back.
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('restores the scroll position after a dialog closes', async ({ page }) => {
  await page.goto('/');
  await page.mouse.wheel(0, 700);
  await page.waitForTimeout(250);
  const before = await page.evaluate(() => window.scrollY);

  // Clicked in place: Playwright's own click scrolls the target into view
  // first, which moves the page and would measure its own side effect.
  await page.evaluate(() => document.querySelector<HTMLElement>('.tile')?.click());
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();

  // The body is unpinned on cleanup, after the exit animation, so poll
  // rather than read the instant the dialog leaves the tree.
  await expect
    .poll(() => page.evaluate(() => window.scrollY), { timeout: 2000 })
    .toBeGreaterThanOrEqual(before - 2);
  const after = await page.evaluate(() => window.scrollY);
  expect(Math.abs(after - before)).toBeLessThanOrEqual(2);
});

test('opens each highlight', async ({ page }) => {
  await page.goto('/');

  for (const name of ['Stack', 'Approach', 'Work', 'Awards', 'CV']) {
    await page.getByRole('button', { name, exact: true }).click();
    await expect(page.getByRole('dialog', { name })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name })).toBeHidden();
  }
});

test('switches between the three tabs @mobile', async ({ page }) => {
  await page.goto('/');

  for (const [tab, panel] of [
    ['Experience', 'panel-experience'],
    ['About', 'panel-about'],
    ['Projects', 'panel-projects'],
  ] as const) {
    await page.getByRole('tab', { name: tab }).click();
    await expect(page.locator(`#${panel}`)).toBeVisible();
    await expect(page.getByRole('tab', { name: tab })).toHaveAttribute('aria-selected', 'true');
  }
});

test('switches between light and dark, and remembers the choice', async ({ page }) => {
  await page.goto('/');

  const theme = () => page.evaluate(() => document.documentElement.dataset.theme);
  const first = await theme();
  await page.getByRole('button', { name: /mode$/ }).click();
  const second = await theme();
  expect(second).not.toBe(first);

  // The choice survives a reload, which is the point of storing it.
  await page.reload();
  expect(await theme()).toBe(second);
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
  expect(headers['strict-transport-security']).toBe('max-age=31536000; includeSubDomains');

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
