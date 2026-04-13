# SHOT.IS

Vite + React landing page prepared for Firebase Hosting.

## Runtime

Recommended Node version for this project and `firebase-tools`:

```bash
v22
```

## Local

```bash
npm install
npm run dev
```

If you need to regenerate the local hero media:

```bash
npm run generate:hero
```

## Firebase Hosting setup

1. Install dependencies:

```bash
npm install
```

2. Create your Firebase project in the Firebase console.

3. Copy the Firebase project example file:

```bash
cp .firebaserc.example .firebaserc
```

4. Replace `your-firebase-project-id` in `.firebaserc` with the real project id.

5. Authenticate the CLI:

```bash
npx firebase login
```

If you use `nvm`:

```bash
nvm use
```

## Deploy

Production hosting deploy:

```bash
npm run deploy:hosting
```

Preview channel deploy:

```bash
npm run deploy:preview
```

## Notes

- `firebase.json` is configured for a Vite SPA and rewrites all routes to `index.html`.
- Built asset files under `/assets/**` get long-term immutable caching headers.
- `index.html` is served with `no-cache` so new deployments are picked up immediately.
- `firebase-tools` is installed locally, so deploy commands work through project scripts.
