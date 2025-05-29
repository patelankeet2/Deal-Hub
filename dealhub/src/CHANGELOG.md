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