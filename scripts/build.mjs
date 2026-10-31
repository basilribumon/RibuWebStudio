import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { site } from '../src/config.js';

await mkdir('dist', { recursive: true });
const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('\"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const pageTitle = `${site.name} — ${site.tagline}`;
const html = (await readFile('index.html', 'utf8'))
  .replaceAll('{{SITE_TITLE}}', escapeHtml(pageTitle))
  .replaceAll('{{SITE_DESCRIPTION}}', escapeHtml(site.description))
  .replaceAll('{{SITE_BACKGROUND}}', escapeHtml(site.primaryBackground))
  .replaceAll('{{SITE_LOGO}}', escapeHtml(site.logo))
  .replaceAll('{{SITE_LOGO_TYPE}}', site.logo.toLowerCase().endsWith('.png') ? 'image/png' : site.logo.toLowerCase().endsWith('.svg') ? 'image/svg+xml' : 'image/jpeg')
  .replaceAll('{{SITE_URL}}', escapeHtml(site.url))
  .replaceAll('{{SITE_SOCIAL_IMAGE}}', escapeHtml(new URL(site.logo, site.url).href));
await writeFile('dist/index.html', html);
await cp('src', 'dist/src', { recursive: true });
await cp('public', 'dist', { recursive: true });
console.log('Static site built in dist/.');
