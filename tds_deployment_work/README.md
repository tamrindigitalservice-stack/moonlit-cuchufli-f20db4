# Tamrin Digital Service (TDS) - Digital Portal & Admin Management System

A production-ready, full-featured web portal and administrative control system built for **Tamrin Digital Service** in Ramnagar, Paschim Medinipur, West Bengal.

---

## 🌟 Key Features

### 🌐 Public Website
- **Bengali & English Support**: Clear Bengali typography (`Hind Siliguri` and `Noto Sans Bengali`) tailored for West Bengal citizens.
- **Service Categories**:
  - **Central Govt Services**: Aadhaar Card, PAN Card, Passport, Income Tax / ITR, Voter Card, PM-Kisan, Ayushman Bharat, Digital Signature.
  - **West Bengal Govt Services**: Banglarbhumi (Khatian/Porcha), Ration Card Digital, Lakshmir Bhandar, Caste & Income Certificate, Swasthya Sathi, Student Credit Card, Kanyashree, Birth/Death Certificate.
- **Smart WhatsApp Enquiry Assistant**: 1-click customer request submission sending formatted WhatsApp messages directly to `+91 9635191520`.
- **Document Helper Tool**: Instant required-document checklist viewer for all major services.
- **Interactive Business Schedule**: Shows real-time Open/Closed status based on business hours.
- **Dynamic Announcements**: Real-time ticker bar for urgent notices and offers.
- **Privacy First & Disclaimer**: Clear non-government disclaimer and privacy notice protecting customer PINs and passwords.

### 🛡️ Secure Admin Dashboard
- **Protected Routes**: Secure login at `/admin/login` or via `#admin` route.
- **Real-Time Customer Requests**: Filter, search, and manage request statuses (*New*, *In Progress*, *Completed*, *Cancelled*) with custom admin notes.
- **Service Management**: Add, edit, or toggle availability of central and state services.
- **Notice Board Management**: Create and manage active announcements.
- **Center Settings**: Update phone, WhatsApp number, address, and business hours.
- **Analytics & Reports**: Visual request statistics, conversion rates, and popular service rankings.

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Installation
```bash
# Clone repository
git clone https://github.com/your-repo/tamrin-digital-service.git
cd tamrin-digital-service

# Install dependencies
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env` and fill in your Firebase credentials:
```bash
cp .env.example .env
```

Fill in the following variables:
```env
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
```

### 4. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🔥 Firebase Setup Guide

To enable real-time cloud data storage and multi-device admin synchronization:

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Click **Add Project** and name it `Tamrin Digital Service`.

2. **Enable Firebase Authentication**:
   - Navigate to **Authentication** > **Get Started**.
   - Enable **Email/Password** sign-in method.

3. **Create Firestore Database**:
   - Navigate to **Firestore Database** > **Create Database**.
   - Start in **Production Mode** and select your closest location (`asia-south1` for Mumbai).

4. **Deploy Firestore Security Rules**:
   Copy contents of `firestore.rules` into Firebase Console > Firestore > Rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       function isAdmin() {
         return request.auth != null && 
           exists(/databases/$(database)/documents/admins/$(request.auth.uid));
       }

       match /service_requests/{requestId} {
         allow create: if true;
         allow read, update, delete: if isAdmin();
       }

       match /services/{serviceId} {
         allow read: if true;
         allow write, delete: if isAdmin();
       }

       match /announcements/{announcementId} {
         allow read: if true;
         allow write, delete: if isAdmin();
       }

       match /settings/{settingId} {
         allow read: if true;
         allow write, delete: if isAdmin();
       }

       match /admins/{userId} {
         allow read: if request.auth != null && request.auth.uid == userId;
         allow write: if false;
       }
     }
   }
   ```

5. **Create First Admin Account**:
   - Go to Firebase Console > **Authentication** > **Users** > **Add User**.
   - Enter email (e.g., `admin@tamrindigital.com`) and a strong password.
   - Copy the generated **UID**.
   - Go to **Firestore Database** > **Add Collection**:
     - Collection ID: `admins`
     - Document ID: `<Pasted Admin UID>`
     - Field: `email` (string) = `admin@tamrindigital.com`
     - Field: `role` (string) = `superadmin`

---

## 🌐 Custom Domain Setup

1. **Purchasing & DNS**:
   - Map your custom domain (e.g., `tamrindigital.com`) in your hosting provider (Firebase Hosting, Vercel, Netlify, or Cloud Run).
2. **Add DNS Records**:
   - `A` Record: `@` -> Hosting IP
   - `CNAME` Record: `www` -> Host domain
3. **SSL/HTTPS Certificate**:
   - Hosting providers automatically issue free Let's Encrypt SSL certificates for custom domains.

---

## 🛠️ Production Build & Deployment

```bash
# Verify TypeScript & Linter
npm run lint

# Build for Production
npm run build

# Preview Production Build locally
npm run preview
```

### Deploy to Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 📞 Business Contact Details

- **Business Name**: Tamrin Digital Service
- **Address**: Natun Bazar, Ramnagar, Paschim Medinipur, West Bengal, 721305
- **Phone**: +91 9635191520
- **WhatsApp**: +91 9635191520
- **Disclaimer**: Tamrin Digital Service is an independent digital service assistance center and is NOT affiliated with any government agency.
