# Lalah Hathaway: Made in Chicago

Interactive artist website built around the supplied music-room photograph.

The fixed homepage links to Contact, Socials, Bio, Music, Videos, Tour, and Merch. Desktop hover and keyboard focus highlight the original objects. Touch devices show steady glows and open destinations with one tap.

## Local development

Use Node.js 22.13 or newer.

```sh
npm ci
npm run dev:local
```

## Netlify

Import this repository into Netlify and select the `main` branch. The included `netlify.toml` defines:

- Build command: `npm run build:netlify`
- Publish directory: `dist/client`
- Node version: `22`

The export generates the homepage, seven destination pages, a branded 404 page, and the required artwork and font. The build script verifies these files before completing.

## Content awaiting completion

- Bio copy
- Contact inbox and form delivery
- Newsletter provider and signup connection
- Confirmation of the campaign merch destination

Contact and newsletter forms are labeled previews. They validate input but do not send or store submissions. Tour listings use Lalah's official Bandsintown profile. Music and video destinations use verified artist links.

## Design and source

The site uses the supplied Magic Vintage font and optimized WebP copies of the original TIFF artwork. Brown destination pages use `#80542F`.

See `START-HERE.md` for Desktop setup, `DESIGN-REVIEW.md` for pending review items, and `reference/media-assets.json` for media sources. The original TIFF files are excluded from the source repository.

The original private ChatGPT draft uses the separate `npm run build` command. Netlify and local development use the portable commands above.
