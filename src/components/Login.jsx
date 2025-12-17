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

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Login with Firebase
    logIn(email, password)
      .then((result) => {
        const user = result.user;
        
        // Fetch user role from database
        fetch('http://localhost:5000/api/auth/current-user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUser({ ...user, role: data.user.role });
            
            // Route based on role
            if (data.user.role === 'Admin') {
              navigate('/admin-dashboard/users');
            } else if (data.user.role === 'Tutor') {
              navigate('/tutor-dashboard/my-applications');
            } else {
              navigate('/student-dashboard/my-tuitions');
            }
          })
          .catch((error) => {
            console.error('Error fetching user role:', error);
            navigate(location.state ? location.state : "/");
          });
      })
      .catch((error) => {
        alert(`${error.code}: ${error.message}`);
      });
  };

  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then((result) => {
        const user = result.user;
        
        // Save/verify Google user and get role
        fetch('http://localhost:5000/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            profileImage: user.photoURL,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem('token', data.token);
            setUser({ ...user, role: 'Student' });
            alert('Logged in as Student with Google!');
            // Google users default to Student role
            navigate('/student-dashboard/my-tuitions');
          })
          .catch((error) => {
            console.error('Google login error:', error);
            alert('Error logging in with Google');
          });
      })
      .catch((error) => {
        alert(`${error.code}: ${error.message}`);
      });
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
