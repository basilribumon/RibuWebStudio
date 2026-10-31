# LYROX STUDIO

A zero-dependency, static portfolio site. Brand identity, project content, services, social links, and contact details are centralized in `src/config.js`.

## Update the brand

Edit the `site` object in `src/config.js`: `name`, `tagline`, `brandMark`, `logo`, `description`, `heroDescription`, `accentColor`, `secondaryAccent`, `primaryBackground`, `secondaryBackground`, `primaryText`, `secondaryText`, and `url`. Put the replacement logo in `public/` and set `logo` to its path, such as `/brand-logo.png`. The header, footer, favicon, accent color, page title, social metadata, and production HTML read these settings automatically. Then run `npm run build` and commit/push the changes.

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
6. To use a custom domain, add it in Vercel project settings, then update the `url` field in `src/config.js` and the sitemap/robots URLs to the production domain.

## Before publishing

- Confirm the `url` field in `src/config.js` and sitemap/robots URLs match the live domain.
- Update or confirm the technologies in `src/config.js`.
- LinkedIn, WhatsApp, and email contact details are configured in `src/config.js`; add social profiles only when the current links are confirmed. Empty links stay hidden.
- The official LYROX logo is stored at `public/lyrox-studio-logo.jpg` and used without cropping in the navigation, footer, and favicon.
- Project previews are original CSS compositions for presentation. The case studies avoid claiming unverified features or technologies.
- Contact form details are composed into a WhatsApp link in the browser. No form data is stored or sent to a backend.
