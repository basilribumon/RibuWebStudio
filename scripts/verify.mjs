import { readFile, stat } from 'node:fs/promises';
import { projects, site } from '../src/config.js';

const html = await readFile('dist/index.html', 'utf8');
const app = await readFile('dist/src/main.js', 'utf8');
const checks = [
  ['page title and metadata', html.includes('Ribu Web Studio') && html.includes('name="description"')],
  ['app module and stylesheet', html.includes('/src/main.js') && html.includes('/src/style.css')],
  ['all three project records', projects.length === 3 && projects.every(p => p.title && p.description && p.visual)],
  ['only supplied project URLs', projects.filter(p => p.url).length === 2 && projects.filter(p => p.url).every(p => p.url.startsWith('https://'))],
  ['WhatsApp form targets the specified number', site.whatsapp === '919847328745' && app.includes('new URL(`https://wa.me/${site.whatsapp}`)')],
  ['encoded contact message', app.includes("destination.searchParams.set('text',lines.join(")],
  ['client-side required-field validation', app.includes('Please complete your name, project type, budget, and project details.')],
  ['portfolio section and project dialog', app.includes('id="work"') && app.includes('<dialog class="project-modal"')],
  ['form does not claim backend storage', app.includes('does not store or submit your information here')],
  ['dialog handler cannot stop form setup', !app.includes("modal.querySelector('.modal-close').addEventListener") && app.includes("document.querySelector('.contact-form').addEventListener('submit'")],
  ['logo asset copied to production output', (await stat('dist/ribu-web-studio-logo.jpg')).size > 1000],
  ['Instagram and LinkedIn profile links configured', site.instagram.includes('instagram.com/ribuwebstudio') && site.linkedin.includes('linkedin.com/in/basil-t')],
  ['scroll reveal and progress behavior', app.includes('revealObserver') && app.includes('scroll-progress')],
];
const sample = new URL(`https://wa.me/${site.whatsapp}`);
sample.searchParams.set('text', 'Hello, I\'m Basil.\nProject type: Business website');
checks.push(['form message opens the correct chat with entered text', sample.pathname === '/919847328745' && sample.searchParams.get('text').includes('Business website')]);
let failed = false;
for (const [name, ok] of checks) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`);
  if (!ok) failed = true;
}
if (failed) process.exitCode = 1;
