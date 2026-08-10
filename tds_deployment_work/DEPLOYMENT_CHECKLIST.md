# 📋 Tamrin Digital Service - Production Deployment Checklist

Use this checklist prior to launching the website to live production.

---

## 🔒 1. Environment & Secrets
- [ ] `.env` file populated with production Firebase configuration (`VITE_FIREBASE_*`).
- [ ] Secrets securely stored in hosting provider settings (Vercel, Netlify, Cloud Run, or Firebase).
- [ ] No private keys or passwords committed to source control.

## 🔥 2. Firebase Infrastructure
- [ ] Firebase project created in Google Cloud / Firebase Console.
- [ ] Firebase Authentication enabled with Email/Password sign-in provider.
- [ ] Firestore Database provisioned in production mode (`asia-south1`).
- [ ] `firestore.rules` deployed to protect customer data and restrict admin access.
- [ ] Admin user created in Firebase Authentication.
- [ ] Admin UID entry added to `admins/{uid}` document collection in Firestore.

## 🌐 3. Website & Domain Setup
- [ ] Production build succeeds without errors (`npm run build`).
- [ ] Custom domain (`tamrindigital.com`) connected via DNS records (A / CNAME).
- [ ] HTTPS / SSL certificate active and forcing HTTP -> HTTPS redirection.
- [ ] Single Page Application (SPA) fallback configured (`index.html` rewrites).

## 📲 4. Communication & Business Details
- [ ] WhatsApp button tested on mobile and desktop (+91 9635191520).
- [ ] Pre-filled WhatsApp message verified in Bengali.
- [ ] Direct call phone button tested (`tel:+919635191520`).
- [ ] Business address verified: *Natun Bazar, Ramnagar, Paschim Medinipur, West Bengal 721305*.
- [ ] Non-government disclaimer displayed in footer and forms.

## 🛡️ 5. Admin Security & Functional QA
- [ ] Unauthenticated access to `/admin` redirects cleanly to `/admin/login`.
- [ ] Admin login verified using Firebase Auth.
- [ ] Customer service requests submission tested from public website.
- [ ] Service request status updates (*New* -> *Completed*) verified in Admin Dashboard.
- [ ] Real-time updates verified across public and admin views.
- [ ] Service toggle and announcement edits working as expected.

## 📱 6. Mobile Responsiveness & Accessibility
- [ ] Mobile navigation drawer tested on 360px, 375px, 390px screens.
- [ ] Bottom sticky contact bar verified on mobile browsers.
- [ ] No horizontal scrolling or overlapping text on small displays.
- [ ] Touch target sizes >= 44px for buttons and form fields.

## 🔍 7. SEO & Search Engine Indexing
- [ ] `robots.txt` deployed blocking `/admin` paths.
- [ ] `sitemap.xml` deployed and verified.
- [ ] Google Search Console property verified (`google-site-verification`).
- [ ] Open Graph social card tags verified for social media shares.
- [ ] LocalBusiness JSON-LD schema validated.
