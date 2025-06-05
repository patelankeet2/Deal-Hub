# Changelog
 
All notable changes to this project will be documented in this file.
 
## [1.0.0] – 2025-05-27
### Added
- User authentication for customers, merchants, and admins using Firebase Authentication
- Merchant dashboard with deal creation form and deal management
- Admin dashboard with user and deal approval features
- Customer browsing and landing page UI
- Firebase integration for config and setup
- Role-based routing using `react-router-dom`
- Component-level styling using CSS files
- Public folder with manifest and index.html
- Page Not Found (`NotFound.js`) handling for invalid routes
 
### Changed
- Updated `App.js` to handle role-based routes and remove merge conflicts
- Organized components into dedicated folders by user role
 
### Fixed
- Firebase configuration and build errors during initial setup
 
### Notes
- Firestore database operations to be implemented in the next release
- Testing and mobile responsiveness will be addressed in v1.1.0

## [2.0.0] – 2025-06-03

### Added
- Full cart system with quantity control (+/-), subtotal, and total calculation
- "Add More Deals" button linking back to Deals page from Cart
- Professional, responsive UI for `CartPage`, `DealsPage`, `DealDetailsPage`, and landing section
- Back-to-deals navigation in `DealDetailsPage`
- Shipping and payment form in `PaymentPage` with Firestore order saving
- `OrderTrackingPage` showing customer's past orders with itemized list and timestamp
- `MerchantCustomersPage` displaying customers who purchased from specific merchant
- Form enhancements to capture and show customer name on registration
- Integrated QR code feedback prompt after successful payment

### Changed
- Refactored cart localStorage logic to persist quantity data
- Upgraded all CSS files with modern responsive layout and consistent UI polish
- Organized all deals and cart logic to work seamlessly with navigation and Firestore

### Fixed
- `date-fns` error in `OrderTrackingPage.js` by ensuring proper date formatting with timestamp check
- Rendering issues on mobile views of deals and cart

### Notes
- Admin deal approval flow to be refined in next version
- Analytics dashboard and merchant earnings summary coming in v2.1.0
- Prepare for possible Stripe integration in v2.2.0

## [3.0.0] – 2025-06-05
 
### Added
- Quantity control with increment/decrement buttons in the cart (`+` / `-`)
- Editable cart items with inline price updates based on quantity
- Deal tracking per merchant: customer orders now include `merchantId`
- "Edit" button added to cart for improved UX
- Enhanced professional CSS for:
  - Landing page (hero, trending, footer)
  - Deals listing with category and search filters
  - Deal details with back navigation
  - Cart, Payment, and OrderTracking pages
- Responsive UI across all pages including mobile and tablet support
- All deal and order Firestore writes now include accurate user/merchant identifiers
 
### Changed
- Refactored Cart logic to persist quantity and dynamically update total
- Updated `CartPage.js` and `CartPage.css` for professional layout and quantity logic
- Improved `DealDetailsPage` with back-to-deals button
- Revised `PaymentPage` to clearly separate shipping and payment sections
- Added better loading and empty states to `OrderTrackingPage.js` and `MerchantCustomersPage.js`
 
### Fixed
- Fixed merchant deal ownership tracking by saving `merchantId` during order
- Resolved cart quantity mismatch across refreshes and local storage
- Eliminated layout overflow on smaller screens
 
### Notes
- Next release (v4.0.0) will include:
  - Deal editing for merchants
  - Deal approval system for admins
  - Full earnings analytics with charts per merchant