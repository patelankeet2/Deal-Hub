
# 🛍️ Deal Hub - Discount Aggregator Platform

**Deal Hub** is a role-based, full-stack web platform built with React and Firebase that allows users to browse and purchase limited-time deals, merchants to create and track offers, and admins to moderate users and deals. The system is designed to be responsive, scalable, and user-friendly across all devices.

---

## 🌐 Live Hosting

🔗 **Access the Live App:** https://dealhub-b48fa.web.app

> Hosted on Firebase with automatic deployment from the production build.

---

## 📁 Project Structure

```

patelankeet2-deal-hub/
├── README.md
└── dealhub/
    ├── README.md                      # You are here
    ├── firebase.json                  # Firebase deployment configuration
    ├── .firebaserc                   # Firebase project alias settings
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    ├── CHANGELOG.md                  # Project version history
    ├── public/                       # Static assets
    │   ├── index.html                # App HTML entry point
    │   ├── manifest.json             # Web app manifest
    │   └── robots.txt                # SEO rules for bots
    ├── src/
    │   ├── App.js                    # App entry with routing
    │   ├── App.css                   # Global styles
    │   ├── App.test.js               # Sample test config
    │   ├── firebaseConfig.js         # Firebase project initialization
    │   ├── index.js                  # ReactDOM entry point
    │   ├── index.css                 # Base CSS file
    │   ├── reportWebVitals.js        # Performance metrics (optional)
    │   ├── setupTests.js             # Test environment setup
    │   ├── context/
    │   │   └── AuthContext.js        # Global auth state using React Context API
    │   ├── components/               # All feature-specific components
    │   │   ├── AdminDashboard.{js,css}
    │   │   ├── AdminEarnings.{js,css}
    │   │   ├── AdminManageCategory.{js,css}
    │   │   ├── AdminManageDeals.{js,css}
    │   │   ├── AdminManageUsers.{js,css}
    │   │   ├── AdminProfile.{js,css}
    │   │   ├── AnalyticsPage.{js,css}
    │   │   ├── CartPage.{js,css}
    │   │   ├── CreateDeal.{js,css}
    │   │   ├── CustomerForgotPassword.js
    │   │   ├── CustomerProfilePage.{js,css}
    │   │   ├── DealDetailsPage.{js,css}
    │   │   ├── DealsPage.{js,css}
    │   │   ├── EditDealPage.js
    │   │   ├── FeedbackPage.{js,css}
    │   │   ├── LandingPage.{js,css}
    │   │   ├── Login.{js,css}
    │   │   ├── MerchantCustomersPage.{js,css}
    │   │   ├── MerchantDashboard.{js,css}
    │   │   ├── MerchantDealsPage.{js,css}
    │   │   ├── MerchantForgotPassword.{js,css}
    │   │   ├── MerchantLogin.{js,css}
    │   │   ├── MerchantRegister.{js,css}
    │   │   ├── Navbar.{js,css}
    │   │   ├── OrderTrackingPage.{js,css}
    │   │   ├── PaymentPage.{js,css}
    │   │   ├── ProtectedRoute.js
    │   │   ├── Register.js
    │   │   ├── Settings.{js,css}
    │   └── pages/
    │       ├── NotFound.js
    │       └── NotFound.css
    └── .firebase/
        └── hosting.YnVpbGQ.cache     # Firebase hosting cache


````

---

## 🚀 Features by User Role

### 👥 Customer
- 🔐 Register/Login
- 🔎 Browse, filter, and search deals
- 🛒 Cart & secure checkout
- 📜 Order tracking & purchase history
- 💬 Rate and review deals
- 👤 View and update profile with avatar URL

### 🧑‍💼 Merchant
- 🔐 Login with email and driving license
- 🧾 Create, edit, and delete deals
- 📊 Track deal stats and earnings
- 🔎 Search deals and customer list
- ⚙️ Manage profile & update settings

### 🛡️ Admin
- 🔐 Secure admin login
- ✅ Approve/reject merchant registrations & deals
- 🧑‍💻 Manage all user accounts
- 📊 View global analytics
- 🗂️ Moderate platform content

---

## 🧑‍💻 Tech Stack

| Layer         | Technology                    |
|---------------|-------------------------------|
| Frontend      | React, React Router, Bootstrap |
| Auth/Backend  | Firebase Auth, Firestore DB, Firebase Hosting |
| Styling       | CSS, Bootstrap (custom styling) |
| Storage       | Firebase Storage for images   |
| State Mgmt    | React Context API             |
| Deployment    | Firebase CLI, Live Hosting    |

---

## 📦 Getting Started

### ✅ Prerequisites
- Node.js and npm installed
- Firebase CLI (`npm install -g firebase-tools`)
- Firebase project created and configured

### 🔧 Installation

```bash
git clone https://github.com/patelankeet2/deal-hub
cd dealhub
npm install
````

### 🚀 Local Development

```bash
npm start
```

### 🔥 Firebase Deployment

```bash
firebase login
firebase init hosting
firebase deploy
```

---

## 🗂️ Folder Highlights

* **`components/`**: Divided by feature

  * Admin: `AdminDashboard.js`, `AdminProfile.js`, etc.
  * Merchant: `CreateDeal.js`, `MerchantDashboard.js`, etc.
  * Customer: `CartPage.js`, `LandingPage.js`, `FeedbackPage.js`, etc.
* **`context/`**: Global authentication context
* **`ProtectedRoute.js`**: Auth-based route control
* **`firebaseConfig.js`**: Contains Firebase app configuration

---

## 📈 Contribution Overview

* 📍 **Ankeet Patel**: Merchant Dashboard, Deal Management, Analytics, Routing, Navbar, Auth Logic
* 📍 **Mazhar**: Admin dashboard, user moderation, and approvals
* 📍 **Samika**: Customer experience, feedback, cart, and checkout flow

All members contributed to `App.js` and routing logic.

---

## 🧪 Testing Strategy

* ✅ Manual UI and UX testing across roles
* ✅ Browser compatibility testing (Chrome, Firefox)
* ✅ Firebase Emulator tests (Auth + Firestore)
* ✅ Real-time validation & error handling
* ✅ Code reviewed and merged via pull requests

---

## 📌 Version History

Check `CHANGELOG.md` for full release notes and tracked changes.

---

## 📄 License

This project is released under the **MIT License**.

---

## 🙌 Acknowledgements

Thanks to **Otago Polytechnic** and our mentors for guidance throughout Studio 3.

> Made with 💻 using React, Firebase & Team Collaboration

