// Start the repository's local HTTP server on port 8769, then run through playwright-cli.
async page => {
  await page.setViewportSize({ width: 1600, height: 600 });
  for (const lang of ['zh', 'en']) for (const theme of ['light', 'dark']) {
    await page.goto(`http://127.0.0.1:8769/scripts/hero.html?lang=${lang}&theme=${theme}`);
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.hero').screenshot({omitBackground: true, path: `/tmp/hero-${lang}-${theme}.png` });
  }
  return 'Rendered titles in /tmp';
}
