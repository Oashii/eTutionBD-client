## 📋 Project Overview

**eTuitionBD** is a digital marketplace connecting students with qualified tutors. Features role-based dashboards, tuition posting, tutor applications, payment processing, and admin controls.

### Core Features

✅ Firebase & Google OAuth | ✅ Tuition CRUD | ✅ Applications | ✅ Stripe Payments | ✅ Search & Filters | ✅ Role-based Dashboards | ✅ Admin Analytics

### Live URL

- https://e-tuition-b-d.netlify.app/

## 🚀 Installation Guide

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **Firebase Project** (for authentication)
- **Stripe Account** (for payments)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd client
```

### Step 2: Install Dependencies

```bash
npm install
```

Or if you're using yarn:

```bash
yarn install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory and add your configuration:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_API_URL=your_backend_api_url
```

### Step 4: Run the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173/` (or the next available port).

### Step 5: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Step 6: Preview Production Build (Optional)

```bash
npm run preview
```

### Key Features

- **Sticky Navbar** - Always-visible navigation
- **Modal Forms** - Apply, edit tuition forms
- **Loading Spinners** - Full-screen loaders
- **Confirmation Dialogs** - For destructive actions
- **Status Badges** - Color-coded status display
- **Pagination** - 12 items per page
- **Search & Filter** - Subject, location, class filters
- **Sorting** - By budget, date

## 🔐 Authentication & Security

### Firebase Authentication

- Email/password registration & login
- Google OAuth integration
- Secure password storage
- User profile management

### JWT Token Management

- Token stored in localStorage
- Token included in API headers
- Token verification on protected routes
- Automatic logout on token expiration

## 📊 Dashboard Features

### Student Dashboard

- **My Tuitions** - CRUD operations (Create, Read, Edit, Delete)
- **Post Tuition** - Form with subject, class, budget, schedule
- **Applied Tutors** - Review applications, approve/reject, redirect to payment
- **Payments** - Transaction history with amounts & dates
- **Settings** - Update name, email, profile image

### Tutor Dashboard

- **My Applications** - Track status, delete pending applications
- **Ongoing Tuitions** - View approved & active tuitions
- **Revenue** - Earnings summary & transaction history

### Admin Dashboard

- **User Management** - List users, update info, change roles, delete accounts
- **Tuition Management** - Approve/reject pending tuition posts
- **Analytics** - Total earnings, user count, transaction stats

## 🔄 User Workflows

### Student Workflow

```
Register → Post Tuition → Wait for Applications
→ Review Tutors → Approve Tutor
→ Payment Checkout → Confirm Payment
→ Track Ongoing Tuition
```

### Tutor Workflow

```
Register → Browse Tuitions → Apply with Details
→ Wait for Approval → View Approved Tuition
→ Track Revenue
```

### Admin Workflow

```
Login as Admin → Review Tuitions → Approve/Reject
→ Manage Users → View Analytics
→ Monitor Platform
```

**Version:** 1.0.0  
**Last Updated:** December 17, 2025  
**Status:** Production Ready
