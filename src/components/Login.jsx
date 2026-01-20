import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
  useEffect(() => {
    document.title = 'eTuitionBD - Login';
  }, []);

  const { logIn, logInWithGoogle, setUser } = useContext(AuthContext);
  const [emailValue, setEmailValue] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Demo credentials
  const demoAccounts = {
    student: { email: 'student@etuitionbd.com', password: 'Student@123' },
    tutor: { email: 'tutor@etuitionbd.com', password: 'Tutor@123' },
    admin: { email: 'admin@etuitionbd.com', password: 'Admin@123' }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    await performLogin(email, password);
  };

  const performLogin = async (email, password) => {
    setLoading(true);
    try {
      // Login with Firebase
      const result = await logIn(email, password);
      const user = result.user;
      
      // Call backend to get JWT token and user role
      const response = await fetch('https://etuitionbd.vercel.app/api/auth/firebase-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: user.displayName || email.split('@')[0],
          profileImage: user.photoURL || '',
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error fetching user role');
      }
      
      const data = await response.json();
      
      // Store JWT token and role from server
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      
      setUser({ ...user, role: data.user.role });
      
      // Get the page user was trying to access before login
      const from = location.state?.from?.pathname || null;
      
      // Route based on role, but prefer redirecting to the original page if available
      if (from && from !== '/login' && from !== '/register') {
        navigate(from);
      } else if (data.user.role === 'Admin') {
        navigate('/admin-dashboard/users');
      } else if (data.user.role === 'Tutor') {
        navigate('/tutor-dashboard/my-applications');
      } else {
        navigate('/student-dashboard/my-tuitions');
      }
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (accountType) => {
    const credentials = demoAccounts[accountType];
    setEmailValue(credentials.email);
    const form = document.querySelector('form');
    if (form) {
      form.email.value = credentials.email;
      form.password.value = credentials.password;
    }
    // Auto-submit after a short delay to allow state update
    setTimeout(() => {
      performLogin(credentials.email, credentials.password);
    }, 100);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await logInWithGoogle();
      const user = result.user;
      
      // Call backend to get JWT token
      const response = await fetch('https://etuitionbd.vercel.app/api/auth/firebase-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName || 'Google User',
          profileImage: user.photoURL || '',
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error with Google login');
      }
      
      const data = await response.json();
      
      // Store JWT token and role from server
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      
      setUser({ ...user, role: data.user.role });
      
      // Get the page user was trying to access before login
      const from = location.state?.from?.pathname || null;
      
      // Navigate based on role, but prefer redirecting to the original page if available
      if (from && from !== '/login' && from !== '/register') {
        navigate(from);
      } else if (data.user.role === 'Admin') {
        navigate('/admin-dashboard/users');
      } else if (data.user.role === 'Tutor') {
        navigate('/tutor-dashboard/my-applications');
      } else {
        navigate('/student-dashboard/my-tuitions');
      }
      toast.success('Google login successful!');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error(`Google login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center my-30'>
      <div className="card bg-base-100 dark:bg-gray-900 w-full max-w-sm shadow-2xl py-5">
        <h2 className='font-semibold text-2xl text-center'>Login Your Account</h2>
        <form onSubmit={handleLogIn} className="card-body">
          <fieldset className="fieldset">

            {/* Email */}
            <label className="label">Email</label>
            <input
              name='email'
              type="email"
              className="input dark:bg-gray-800 dark:border-gray-700"
              placeholder="Email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              required
            />

            {/* Password */}
            <label className="label">Password</label>
            <input
              name='password'
              type="password"
              className="input dark:bg-gray-800 dark:border-gray-700"
              placeholder="Password"
              required
            />

            <div>
              <NavLink
                to={`/forgot-password?email=${encodeURIComponent(emailValue)}`}
                className="link link-hover text-blue-500"
              >
                Forgot password?
              </NavLink>
            </div>

            <button 
              className="btn btn-neutral mt-4" 
              type='submit'
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <h2 className='font-semibold text-center mt-4'>Demo Accounts</h2>
            <p className='text-sm text-gray-600 dark:text-gray-400 text-center mb-2'>Click to auto-fill credentials</p>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                type='button'
                onClick={() => handleDemoLogin('student')}
                className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                disabled={loading}
              >
                Student
              </button>
              <button
                type='button'
                onClick={() => handleDemoLogin('tutor')}
                className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                Tutor
              </button>
              <button
                type='button'
                onClick={() => handleDemoLogin('admin')}
                className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                disabled={loading}
              >
                Admin
              </button>
            </div>

            <h2 className='font-semibold text-center'>-------- Or --------</h2>

            <button
              type='button'
              onClick={handleGoogleLogin}
              className="btn mt-3 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
              disabled={loading}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google (Student)
            </button>

            <p className='font-semibold text-center mt-3'>
              Don't Have An Account?
              <NavLink className="text-secondary link link-hover ml-1" to='/register'>Register</NavLink>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
