Redux integration notes

1) Install required packages (not included in repo):

# Using npm (PowerShell)
npm install react-redux @reduxjs/toolkit

# If using TypeScript, also install types
npm install -D @types/react-redux

2) CSS imports and fonts may require type declarations for importing CSS files in TypeScript. If you see errors about importing './globals.css', add a global.d.ts with `declare module '*.css';` or configure `tsconfig` to allow CSS modules.

3) How to test the example:
- Start dev server: `npm run dev`
- Open the app and the homepage will render `ContentList`, which dispatches `fetchContents` from the mock API.

4) Middleware & auth guard:
- `middleware.ts` includes a simple server-side guard that checks a cookie named `token`. Replace with real verification in production.
- `src/utils/authGuard.ts` reads the Redux store synchronously and redirects if not admin (client-side).

5) Files added by this integration:
- `src/store/store.ts` - Redux store configuration
- `src/store/hooks.ts` - typed hooks for dispatch/selector
- `src/store/slices/*` - auth, content, users, logs, ui, status slices
- `src/services/api.ts` - simple mock API used by thunks
- `src/components/content/ContentList.tsx` - example component
- `middleware.ts` - Next.js middleware protecting routes
- `src/utils/authGuard.ts` - client-side redirect utility

If you want, I can open a PR with these changes or adjust them to use your real APIs and auth flows.
