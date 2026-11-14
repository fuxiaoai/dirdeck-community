// Usage: node scripts/build-assets.mjs /path/to/dirdeck-web /path/to/rendered-heroes
import { writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
const [website, heroes] = process.argv.slice(2).map(p => resolve(p));
if (!website || !heroes) throw new Error('Provide the website checkout and rendered title PNG directory');
const sharp = createRequire(`${website}/package.json`)('sharp');
// Resolve the abbreviated, reviewed commit; never silently follow a moving branch.
const commit = '9d8faa17ac5c7d86dbd2c5db147d699112d35f45';
const hash = b => createHash('sha256').update(b).digest('hex');
const ids = ['workspaces', 'nested-bookmarks', 'side-folder', 'archive-browser', 'dd-search', 'image-tools', 'pdf-tools', 'batch-rename', 'desktop-organizer', 'floating-window'];
const screenshots = [];
for (const id of ids) {
  const source = `assets-orig/screenshots-v2/zh/${id}.png`;
  const original = execFileSync('git', ['show', `${commit}:${source}`], { cwd: website, maxBuffer: 30*1024*1024 });
  const output = `assets/screenshots/${id}.webp`;
  const buffer = await sharp(original).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  writeFileSync(output, buffer);
  screenshots.push({ id, source, sourceSha256: hash(original), output, outputSha256: hash(buffer) });
}
mkdirSync('assets/brand', { recursive: true });
const titles = [];
for (const locale of ['zh', 'en']) for (const theme of ['light', 'dark']) for (const size of ['', '-mobile']) {
  const output = `assets/brand/hero-${locale}-${theme}${size}.webp`;
  const buffer = await sharp(`${heroes}/hero-${locale}-${theme}${size}.png`).webp({ quality: 90 }).toBuffer();
  writeFileSync(output, buffer);
  titles.push({ output, outputSha256: hash(buffer) });
}
writeFileSync('assets/sources.json', JSON.stringify({ sourceRepository: 'https://github.com/fuxiaoai/dirdeck-web', sourceCommit: commit, screenshots, conversion: { maxWidth: 1800, format: 'webp', quality: 82, crop: false }, titles }, null, 2)+'\n');
console.log(`Built ${screenshots.length} screenshots and ${titles.length} titles from ${commit}`);
