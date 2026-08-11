# Tamrin Digital Service — Deployment

## Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback is configured in `netlify.toml` and `public/_redirects`.

## Environment variables
Set the Firebase `VITE_FIREBASE_*` variables in the hosting provider's Environment Variables.
Do not upload a real `.env` file.

## Important
If Firebase/Firestore is used in production, verify Firebase Authentication, Firestore rules,
and the authorized admin UID(s) in the Firebase Console before going live.

The uploaded source ZIP was prepared without local `.env` secret files.
