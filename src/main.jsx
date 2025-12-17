import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthProvider from './provider/AuthProvider.jsx'
import Profile from './components/Profile.jsx'
import UpdateProfile from './components/UpdateProfile.jsx'
import TuitionsList from './components/TuitionsList.jsx'
import TuitionDetail from './components/TuitionDetail.jsx'
import TutorsList from './components/TutorsList.jsx'
import TutorProfile from './components/TutorProfile.jsx'
import Contact from './components/Contact.jsx'
import About from './components/About.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import StudentDashboard from './components/Dashboard/StudentDashboard.jsx'
import MyTuitions from './components/Dashboard/MyTuitions.jsx'
import PostTuition from './components/Dashboard/PostTuition.jsx'
import AppliedTutors from './components/Dashboard/AppliedTutors.jsx'
import StudentPayments from './components/Dashboard/StudentPayments.jsx'
import StudentSettings from './components/Dashboard/StudentSettings.jsx'
import TutorDashboard from './components/Dashboard/TutorDashboard.jsx'
import MyApplications from './components/Dashboard/MyApplications.jsx'
import OngoingTuitions from './components/Dashboard/OngoingTuitions.jsx'
import TutorRevenue from './components/Dashboard/TutorRevenue.jsx'
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx'
import UserManagement from './components/Dashboard/UserManagement.jsx'
import TuitionManagement from './components/Dashboard/TuitionManagement.jsx'
import AdminAnalytics from './components/Dashboard/AdminAnalytics.jsx'
import PrivateRoute from './provider/PrivateRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: '/profile',
        element: <PrivateRoute><Profile /></PrivateRoute>,
      },
      {
        path: '/update-profile',
        element: <PrivateRoute><UpdateProfile /></PrivateRoute>,
      },
      {
        path: '/tuitions',
        element: <TuitionsList />,
      },
      {
        path: '/tuition/:id',
        element: <TuitionDetail />,
      },
      {
        path: '/tutors',
        element: <TutorsList />,
      },
      {
        path: '/tutor/:id',
        element: <TutorProfile />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/about',
        element: <About />,
      },
      // Student Dashboard Routes
      {
        path: '/student-dashboard',
        element: <PrivateRoute><StudentDashboard /></PrivateRoute>,
        children: [
          {
            path: '/student-dashboard/my-tuitions',
            element: <MyTuitions />,
          },
          {
            path: '/student-dashboard/post-tuition',
            element: <PostTuition />,
          },
          {
            path: '/student-dashboard/applied-tutors',
            element: <AppliedTutors />,
          },
          {
            path: '/student-dashboard/payments',
            element: <StudentPayments />,
          },
          {
            path: '/student-dashboard/settings',
            element: <StudentSettings />,
          },
        ],
      },
      // Tutor Dashboard Routes
      {
        path: '/tutor-dashboard',
        element: <PrivateRoute><TutorDashboard /></PrivateRoute>,
        children: [
          {
            path: '/tutor-dashboard/my-applications',
            element: <MyApplications />,
          },
          {
            path: '/tutor-dashboard/ongoing-tuitions',
            element: <OngoingTuitions />,
          },
          {
            path: '/tutor-dashboard/revenue',
            element: <TutorRevenue />,
          },
        ],
      },
      // Admin Dashboard Routes
      {
        path: '/admin-dashboard',
        element: <PrivateRoute><AdminDashboard /></PrivateRoute>,
        children: [
          {
            path: '/admin-dashboard/users',
            element: <UserManagement />,
          },
          {
            path: '/admin-dashboard/tuitions',
            element: <TuitionManagement />,
          },
          {
            path: '/admin-dashboard/analytics',
            element: <AdminAnalytics />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
