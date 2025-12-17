# eTuitionBD Client - Frontend Application

React 19 frontend for the eTuitionBD tuition management platform. Features role-based dashboards, advanced search/filtering, and responsive design.

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn
- Backend server running on `http://localhost:5000`

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the client directory:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

**Note:** Get your ImgBB API key from [imgbb.com](https://imgbb.com/api) - it's free!

### Running Development Server

```bash
npm run dev
# Client runs on http://localhost:5173
```

### Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Home.jsx                      # Landing page with hero & sections
│   ├── Login.jsx                     # Email/password & Google login
│   ├── Register.jsx                  # Student/Tutor registration
│   ├── Navbar.jsx                    # Sticky navigation bar
│   ├── Footer.jsx                    # Footer with links & social
│   ├── Profile.jsx                   # User profile display
│   ├── UpdateProfile.jsx             # Update user information
│   ├── TuitionsList.jsx              # Browse tuitions with filters
│   ├── TuitionDetail.jsx             # Single tuition view & apply
│   ├── TutorsList.jsx                # Browse tutors list
│   ├── TutorProfile.jsx              # Individual tutor profile
│   ├── Checkout.jsx                  # Payment checkout page
│   ├── Contact.jsx                   # Contact form & info
│   ├── About.jsx                     # About platform
│   ├── ErrorPage.jsx                 # 404 error page
│   ├── Dashboard/
│   │   ├── StudentDashboard.jsx      # Student dashboard layout
│   │   ├── MyTuitions.jsx            # View student's posted tuitions
│   │   ├── PostTuition.jsx           # Create new tuition
│   │   ├── EditTuition.jsx           # Edit existing tuition
│   │   ├── AppliedTutors.jsx         # Review tutor applications
│   │   ├── StudentPayments.jsx       # Payment history
│   │   ├── StudentSettings.jsx       # Profile settings
│   │   ├── TutorDashboard.jsx        # Tutor dashboard layout
│   │   ├── MyApplications.jsx        # Track tutor applications
│   │   ├── OngoingTuitions.jsx       # Active tuitions
│   │   ├── TutorRevenue.jsx          # Earnings history
│   │   ├── AdminDashboard.jsx        # Admin dashboard layout
│   │   ├── UserManagement.jsx        # Manage users & roles
│   │   ├── TuitionManagement.jsx     # Approve/reject tuitions
│   │   └── AdminAnalytics.jsx        # Platform analytics
│   └── firebase/
│       └── firebase.config.js        # Firebase configuration
├── provider/
│   ├── AuthProvider.jsx              # Authentication context
│   └── PrivateRoute.jsx              # Protected route wrapper
├── main.jsx                          # App entry with routing
├── App.jsx                           # Root component
├── App.css                           # Global styles
└── index.css                         # Tailwind configuration
```

## 🎯 Pages & Routes

### Public Pages

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/tuitions` - Tuitions listing
- `/tuition/:id` - Tuition details
- `/tutors` - Tutors listing
- `/tutor/:id` - Tutor profile
- `/about` - About page
- `/contact` - Contact page
- `/checkout/:appId/:tuitionId/:tutorId` - Payment page

### Protected Pages (Authentication Required)

- `/profile` - User profile
- `/update-profile` - Update profile
- `/edit-tuition/:id` - Edit tuition (Student)

### Student Dashboard Routes

- `/student-dashboard/my-tuitions` - View posted tuitions
- `/student-dashboard/post-tuition` - Create tuition
- `/student-dashboard/applied-tutors` - Review applications
- `/student-dashboard/payments` - Payment history
- `/student-dashboard/settings` - Account settings

### Tutor Dashboard Routes

- `/tutor-dashboard/my-applications` - Track applications
- `/tutor-dashboard/ongoing-tuitions` - Active tuitions
- `/tutor-dashboard/revenue` - Earnings

### Admin Dashboard Routes

- `/admin-dashboard/users` - User management
- `/admin-dashboard/tuitions` - Tuition moderation
- `/admin-dashboard/analytics` - Platform analytics

## 🎨 UI Components & Libraries

### Styling

- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **DaisyUI 5.5.8** - Tailwind component library
- **Responsive Grid/Flex** - Mobile-first responsive design

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

### Protected Routes

```javascript
<PrivateRoute>
  <StudentDashboard />
</PrivateRoute>
```

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

## 🔍 Search & Filter Features

### Tuitions Listing Page

- **Search** - By subject or location
- **Filter** - By class, subject, location
- **Sort** - By budget (ascending/descending) or date (newest/oldest)
- **Pagination** - 12 tuitions per page with navigation

## 📱 Responsive Design

- **Mobile** - Single column layout, hamburger menu
- **Tablet** - Two column grid, optimized spacing
- **Desktop** - Full multi-column grid, expanded navigation
- **Sidebar Dashboards** - Collapsible on mobile

## 🧩 Component Patterns

### Form Pattern

```javascript
const [formData, setFormData] = useState({});
const handleChange = (e) => setFormData({...});
const handleSubmit = async () => { /* API call */ };
```

### Data Fetching Pattern

```javascript
useEffect(() => {
  const fetch = async () => {
    try {
      const response = await axios.get(url, { headers });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetch();
}, []);
```

### Protected Route Pattern

```javascript
<Route
  path="/protected"
  element={
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  }
/>
```

## 🎯 Features Implemented

- [x] User registration (Student/Tutor roles)
- [x] Email & password login
- [x] Google OAuth login
- [x] Role-based dashboards
- [x] Tuition CRUD (Create, Read, Update, Delete)
- [x] Tuition application workflow
- [x] Payment checkout system
- [x] Payment history tracking
- [x] Search & filter tuitions
- [x] Pagination on listings
- [x] Admin user management
- [x] Tuition moderation
- [x] Platform analytics
- [x] Profile management
- [x] Responsive design
- [x] Loading states
- [x] Error handling
- [x] Form validation
- [ ] Framer Motion animations (ready to implement)

## 🚀 Performance Optimizations

- **Code Splitting** - Lazy load heavy components
- **Image Optimization** - Use appropriate sizes
- **Debounced Search** - Reduce API calls
- **Pagination** - Limit data per request
- **Memoization** - Prevent unnecessary re-renders
- **Vite** - Fast module bundling

## 🐛 Common Issues & Solutions

### CORS Error

```
Error: Access to XMLHttpRequest blocked by CORS policy
Solution: Ensure backend server is running on localhost:5000
```

### Authentication Token Invalid

```
Solution: Re-login to get new token, clear localStorage
```

### Form Data Not Submitting

```
Solution: Check network tab, verify API endpoint, check headers
```

### Images Not Loading

```
Solution: Verify image URLs, check Firebase storage access
```

## 📦 Dependencies

```json
{
  "react": "^19.2.0",
  "react-router-dom": "^7.10.1",
  "axios": "^1.6.0",
  "firebase": "^10.0.0",
  "tailwindcss": "^4.1.17",
  "daisyui": "^5.5.8",
  "framer-motion": "^11.0.0"
}
```

## 🔗 API Integration

### Base URL

```javascript
const API_URL = "http://localhost:5000/api";
```

### Request Headers

```javascript
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};
```

## 🎬 Running Examples

### Login

1. Click "Login" in navbar
2. Enter email & password or use Google
3. Redirected to appropriate dashboard

### Post Tuition (Student)

1. Go to Student Dashboard → Post Tuition
2. Fill form (Subject, Class, Budget, Schedule)
3. Click "Post Tuition"
4. Status shows "Pending" until admin approval

### Apply to Tuition (Tutor)

1. Browse Tuitions list
2. Click "View Details"
3. Click "Apply" button
4. Fill modal form (Qualifications, Experience, Salary)
5. Click "Submit"

### Approve Tutor (Student)

1. Go to Student Dashboard → Applied Tutors
2. View tutor details
3. Click "Approve" button
4. Redirected to Checkout page
5. Click "Pay" to confirm payment
6. Application status updates to "Approved"

## 🚀 Deployment

### Build for Production

```bash
npm run build
# Creates /dist folder with optimized bundle
```

### Deploy to Vercel/Netlify

```bash
# Vercel
npm install -g vercel
vercel

# Netlify
npm run build
# Upload dist folder to Netlify
```

### Environment Variables for Production

- Update `.env.local` with production Firebase keys
- Update API endpoint to production server URL

## 📞 Support

For issues:

1. Check browser console for errors
2. Verify backend server is running
3. Check network tab for API responses
4. Review Firebase configuration
5. Clear browser cache and localStorage

---

**Version:** 1.0.0  
**Last Updated:** December 17, 2025  
**Status:** Production Ready (95% Complete - Ready for Framer Motion animations)
