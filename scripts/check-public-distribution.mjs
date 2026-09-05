import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const required = [
  'public/robots.txt',
  'public/sitemap.xml',
  'public/.well-known/gapwise.json',
  'public/schemas/dataset-manifest.schema.json',
  'scripts/publish-datasets.mjs',
];
for (const path of required) await access(resolve(root, path));

const robots = await readFile(resolve(root, 'public/robots.txt'), 'utf8');
if (!robots.includes('Sitemap: https://data.gapwise.ca/sitemap.xml')) {
  throw new Error('robots.txt must advertise the canonical Data sitemap');
}
console.log('Public Gapwise Data distribution contract is present.');
