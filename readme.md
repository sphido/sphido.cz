# [sphido.cz](https://sphido.cz)

Official website and documentation hub for [Sphido](https://github.com/sphido/sphido)—a minimal Node.js static site generator. The site is built with Sphido itself, styled with Tailwind CSS, and deployed to GitHub Pages.

Source code for the website [sphido.cz](https://sphido.cz).

## Build

**Requirements**

- [Node.js](https://nodejs.org/) (the CI workflow uses Node 25; any current LTS or recent release should work)
- [pnpm](https://pnpm.io/) — version is pinned in `packageManager` inside `package.json`. With Node 16.13+, enable it via Corepack: `corepack enable` then `corepack prepare` will pick up the declared version when you run `pnpm` in this repo.

**Install dependencies**

```bash
pnpm install
```

**Production build**

Generates HTML via `index.js` and writes compiled CSS to `public/sphido.css`.

```bash
pnpm run build
```

Equivalent individual steps:

```bash
pnpm run build:html   # static pages into public/
pnpm run build:css    # Tailwind: src/sphido.css → public/sphido.css
```

**Local development**

Rebuild when `content/` or `src/` change, and serve `public/`:

```bash
pnpm run dev
```

Serve an already-built site without watching:

```bash
pnpm run serve
```

**Deploy**

The site is built in CI and deployed to GitHub Pages. For a manual deploy to the `gh-pages` branch (requires git remote setup):

```bash
pnpm run deploy
```
