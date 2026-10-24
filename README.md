# Ribu Web Studio

A zero-dependency, static portfolio site. Project content, service descriptions, links, contact details, and technology list are centralized in `src/config.js`.

## Run locally

Install Node.js 20 or newer, then run:

```sh
npm run dev
```

Open the local URL printed by the server (port 4173). The server serves the source site without a bundler.

## Production build

```sh
npm run build
npm run preview
```

The production files are written to `dist/`.

## Deploy with Vercel

1. Create a GitHub repository and push this project.
2. In Vercel, import that repository.
3. Keep the configured build command `npm run build` and output directory `dist`.
4. Deploy. The site is static and does not require environment variables.
5. For future edits, commit and push changes; Vercel will build and deploy the updated site.
6. To use a custom domain, add it in Vercel project settings, then replace `your-domain.example` in `index.html` and `public/sitemap.xml` with the production domain.

No public deployment has been performed.

## Before publishing

- Replace `your-domain.example` in canonical, Open Graph, and sitemap metadata.
- Update or confirm the technologies in `src/config.js`.
- Instagram and LinkedIn profile links are configured in `src/config.js`; add a GitHub or verified portfolio URL there when available. Empty links stay hidden.
- The supplied RW logo is stored at `public/ribu-web-studio-logo.jpg` and used in the navigation, footer, and favicon.
- The supplied existing portfolio URL could not be independently opened during this build, so it is not currently shown in the footer.
- Project previews are original CSS compositions for presentation. The case studies avoid claiming unverified features or technologies.
- Contact form details are composed into a WhatsApp link in the browser. No form data is stored or sent to a backend.
