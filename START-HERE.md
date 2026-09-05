# Lalah Hathaway: Made in Chicago

The download contains the complete source project, optimized images, supplied Magic Vintage font, and local Git history. No credentials, installed packages, or private customer data are included.

## Desktop

Unzip the archive and move the `lalah-made-in-chicago` folder to your Desktop. Open this folder in your preferred code editor, Claude Code, or Codex.

Use Node.js 22 or newer. From this folder:

```sh
npm ci
npm run dev:local
```

Open the local address printed by the development command.

## GitHub

This folder is already a Git repository. Add the destination repository as a remote, then push the main branch. Replace the example address with your actual repository address.

```sh
git remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git
git push -u origin main
```

The download's Git configuration has no remote or authentication token. Use your own GitHub login. A private repository is appropriate while reviewing the unreleased campaign.

## Netlify

Import the GitHub repository into Netlify. The included `netlify.toml` supplies:

- Build command: `npm run build:netlify`
- Publish directory: `dist/client`
- Node version: `22`

The build generates static pages for the homepage and all seven destinations. No Cloudflare Worker is required for the Netlify export. Keep deployment access appropriate for a private design review.

## Pending content and connections

Contact and newsletter forms are clearly labeled previews. They validate entries but do not send or store personal data. Supply the contact inbox and newsletter provider before activation. Bio copy is pending. The merch destination currently points to Lalah's existing official shop. Bandsintown and YouTube load from their official services, with link fallbacks.

The original TIFFs and OTF are not in this source package because the site uses optimized WebP images and the supplied TTF. Keep your original uploads separately.

## References

- https://docs.netlify.com/build/configure-builds/overview/
- https://github.com/cloudflare/vinext
- See DESIGN-REVIEW.md and reference/media-assets.json for the design notes and media provenance.
