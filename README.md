# 🛍️ Deal Hub - Discount Aggregator Platform

**Deal Hub** is a role-based, full-stack web platform built with React and Firebase that allows users to browse and purchase limited-time deals, merchants to create and track offers, and admins to moderate users and deals. The system is designed to be responsive, scalable, and user-friendly across all devices.

---

## 🌐 Live Hosting

🔗 **Access the Live App:** https://dealhub-b48fa.web.app

> Hosted on Firebase with automatic deployment from the production build.

---

## 🚀 CI/CD with GitHub Actions + Firebase Hosting

This project is deployed automatically using **GitHub Actions** and **Firebase Hosting**.

### 🔄 Workflow Overview

#### ✅ PR Preview Deployments
- Every **pull request** (`pull_request`) triggers a workflow (`firebase-deploy-pr.yml`).
- The app is built (`npm ci && npm run build`).
- Firebase Hosting creates a **Preview Channel** and comments a unique preview URL in the PR.
- Reviewers can test changes before merging.

#### 🚀 Production Deployments
- Any **merge to the `main` branch** triggers another workflow (`firebase-deploy-live.yml`).
- The app is built and deployed to the **live site** (`channelId: live`) on Firebase Hosting.

### 🔑 Secrets
- `FIREBASE_SERVICE_ACCOUNT` → JSON service account key with **Firebase Hosting Admin** + **Service Account Token Creator** roles.
- `GITHUB_TOKEN` → Automatically provided by GitHub to post PR comments and trigger deployments.

### ✅ Deployment Steps
1. Create a **feature branch** → push → open a PR.
2. GitHub Actions builds the app and deploys to a **Preview Channel**.
3. Preview URL is shown in the PR.
4. Merge PR into **main**.
5. GitHub Actions builds again and deploys to the **production site**.

### 🛠 Rollback
- All deployments are visible in the **Firebase Console → Hosting**.
- Rollback can be done by selecting a previous deployment version.

---


## 📁 Project Structure

Directory structure:
└── patelankeet2-dealhub2/
    ├── README.md
    ├── firebase.json
    ├── package.json
    ├── TESTING_REFLECTION.md
    ├── .firebaserc
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src/
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── CHANGELOG.md
    │   ├── firebaseConfig.js
    │   ├── index.css
    │   ├── index.js
    │   ├── reportWebVitals.js
    │   ├── setupTests.js
    │   ├── components/
    │   │   ├── AdminDashboard.css
    │   │   ├── AdminDashboard.js
    │   │   ├── AdminEarnings.css
    │   │   ├── AdminEarnings.js
    │   │   ├── AdminManageCategory.css
    │   │   ├── AdminManageCategory.js
    │   │   ├── AdminManageDeals.css
    │   │   ├── AdminManageDeals.js
    │   │   ├── AdminManageUsers.css
    │   │   ├── AdminManageUsers.js
    │   │   ├── AdminProfile.css
    │   │   ├── AdminProfile.js
    │   │   ├── AnalyticsPage.css
    │   │   ├── AnalyticsPage.js
    │   │   ├── CartPage.css
    │   │   ├── CartPage.js
    │   │   ├── CreateDeal.css
    │   │   ├── CreateDeal.js
    │   │   ├── CustomerForgotPassword.js
    │   │   ├── CustomerProfilePage.css
    │   │   ├── CustomerProfilePage.js
    │   │   ├── DealDetailsPage.css
    │   │   ├── DealDetailsPage.js
    │   │   ├── DealsPage.css
    │   │   ├── DealsPage.js
    │   │   ├── EditDealPage.js
    │   │   ├── FeedbackPage.css
    │   │   ├── FeedbackPage.js
    │   │   ├── LandingPage.css
    │   │   ├── LandingPage.js
    │   │   ├── Login.css
    │   │   ├── Login.js
    │   │   ├── MerchantCustomersPage.css
    │   │   ├── MerchantCustomersPage.js
    │   │   ├── MerchantDashboard.css
    │   │   ├── MerchantDashboard.js
    │   │   ├── MerchantDealsPage.css
    │   │   ├── MerchantDealsPage.js
    │   │   ├── MerchantForgotPassword.css
    │   │   ├── MerchantForgotPassword.js
    │   │   ├── MerchantLogin.css
    │   │   ├── MerchantLogin.js
    │   │   ├── MerchantRegister.css
    │   │   ├── MerchantRegister.js
    │   │   ├── Navbar.css
    │   │   ├── Navbar.js
    │   │   ├── Navbar.test.js
    │   │   ├── OrderTrackingPage.css
    │   │   ├── OrderTrackingPage.js
    │   │   ├── PaymentPage.css
    │   │   ├── PaymentPage.js
    │   │   ├── ProtectedRoute.js
    │   │   ├── Register.js
    │   │   ├── Settings.css
    │   │   └── Settings.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   └── pages/
    │       ├── NotFound.css
    │       └── NotFound.js
    ├── .firebase/
    │   └── hosting.YnVpbGQ.cache
    └── .github/
        └── workflows/
            ├── firebase-deploy-live.yml
            ├── firebase-deploy-pr.yml
            ├── owasp-lite.yml
            └── tests.yml


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
| Deployment    | Firebase CLI, GitHub Actions CI/CD |

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

🚀 Local Development
npm start

🔥 Firebase Deployment
firebase login
firebase init hosting
firebase deploy

📈 Contribution Overview

📍 Ankeet Patel: Merchant Dashboard, Deal Management, Analytics, Routing, Navbar, Auth Logic, CI/CD Automation, Owasp Testing, Jest Unit testing & Automated deployment.

📍 Mazhar: Admin dashboard, user moderation, and approvals

📍 Samika: Customer experience, feedback, cart, and checkout flow

All members contributed to App.js and routing logic.

🧪 Testing Strategy

✅ Manual UI and UX testing across roles

✅ Browser compatibility testing (Chrome, Firefox)

✅ Firebase Emulator tests (Auth + Firestore)

✅ Real-time validation & error handling

✅ Code reviewed and merged via pull requests

✅ Automated unit tests via tests.yml

✅ Security checks via OWASP Lite workflow (owasp-lite.yml)

📌 Version History

Check CHANGELOG.md for full release notes and tracked changes.

📄 License

This project is released under the MIT License.

🙌 Acknowledgements

Thanks to Otago Polytechnic and our mentors for guidance throughout Studio 3.

Made with 💻 using React, Firebase, GitHub Actions & Team Collaboration
