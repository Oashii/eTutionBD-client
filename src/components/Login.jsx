import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const Login = () => {
  useEffect(() => {
    document.title = 'eTuitionBD - Login';
  }, []);

  const { logIn, logInWithGoogle, setUser } = useContext(AuthContext);
  const [emailValue, setEmailValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // Login with Firebase
      const result = await logIn(email, password);
      const user = result.user;
      
      // Call backend to get JWT token and user role
      const response = await fetch('http://localhost:5000/api/auth/firebase-login', {
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
        throw new Error('Error fetching user role');
      }
      
      const data = await response.json();
      
      // Store JWT token from server
      localStorage.setItem('token', data.token);
      
      setUser({ ...user, role: data.user.role });
      
      // Route based on role
      if (data.user.role === 'Admin') {
        navigate('/admin-dashboard/users');
      } else if (data.user.role === 'Tutor') {
        navigate('/tutor-dashboard/my-applications');
      } else {
        navigate('/student-dashboard/my-tuitions');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await logInWithGoogle();
      const user = result.user;
      
      // Call backend to get JWT token
      const response = await fetch('http://localhost:5000/api/auth/firebase-login', {
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
        throw new Error('Error with Google login');
      }
      
      const data = await response.json();
      
      // Store JWT token from server
      localStorage.setItem('token', data.token);
      
      setUser({ ...user, role: data.user.role });
      
      // Google login defaults to Student role
      navigate('/student-dashboard/my-tuitions');
    } catch (error) {
      console.error('Google login error:', error);
      alert(`Google login failed: ${error.message}`);
    }
  };

  return (
    <div className='flex justify-center my-30'>
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className='font-semibold text-2xl text-center'>Login Your Account</h2>
        <form onSubmit={handleLogIn} className="card-body">
          <fieldset className="fieldset">

            {/* Email */}
            <label className="label">Email</label>
            <input
              name='email'
              type="email"
              className="input"
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
              className="input"
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

            <button className="btn btn-neutral mt-4" type='submit'>
              Login
            </button>

            <h2 className='font-semibold text-center mt-2'>-------- Or --------</h2>

            <button
              type='button'
              onClick={handleGoogleLogin}
              className="btn mt-3 bg-white text-black border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2"
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
