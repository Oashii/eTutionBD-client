import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { createUser, setUser, updateUser, logInWithGoogle } = useContext(AuthContext);
  const [role, setRole] = useState('Student');

  useEffect(() => {
    document.title = 'eTuitionBD - Register';
  }, []);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const phone = form.phone.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.");
      return;
    }

    // Register user in Firebase
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(async () => {
            try {
              // Get Firebase token
              const token = await user.getIdToken();
              localStorage.setItem('token', token);
              
              // Save user profile to MongoDB via save-profile endpoint
              const response = await fetch('http://localhost:5000/api/auth/save-profile', {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                  name,
                  email,
                  phone,
                  role: role,
                  profileImage: photo,
                }),
              });
              
              const data = await response.json();
              
              console.log('Save profile response:', { response: response.ok, data, role });
              
              if (!response.ok) {
                throw new Error(data.message || 'Error saving profile');
              }
              
              // Store token and role
              localStorage.setItem('role', role);
              localStorage.setItem('token', token);
              
              setUser({ 
                ...user, 
                displayName: name, 
                photoURL: photo,
                role: role,
                phone,
              });
              alert(`Registered as ${role}! Welcome!`);
              
              // Route based on role
              if (role === 'Tutor') {
                navigate('/tutor-dashboard/my-applications');
              } else {
                navigate('/student-dashboard/my-tuitions');
              }
            } catch (error) {
              console.error('Error saving profile to database:', error);
              alert(`Registration successful! You can now login.`);
              navigate("/login");
            }
          })
          .catch((error) => {
            console.error('Error updating user profile:', error);
            alert('Error updating profile: ' + error.message);
          });
      })
      .catch((error) => {
        console.error('Firebase registration error:', error);
        alert(`${error.code}: ${error.message}`);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await logInWithGoogle();
      const user = result.user;
      
      // Get Firebase token
      const firebaseToken = await user.getIdToken();
      localStorage.setItem('token', firebaseToken);
      
      // Save Google user to MongoDB with default Student role
      const response = await fetch('http://localhost:5000/api/auth/save-profile', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${firebaseToken}`,
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          profileImage: user.photoURL,
          role: 'Student',
          phone: '',
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error saving user');
      }
      
      // Store token and role
      localStorage.setItem('role', 'Student');
      localStorage.setItem('token', firebaseToken);
      
      setUser({ ...user, role: 'Student' });
      alert('Registered as Student with Google!');
      navigate('/student-dashboard/my-tuitions');
    } catch (error) {
      console.error('Google registration error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className='flex justify-center my-16'>
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className='font-semibold text-2xl text-center'>Register Your Account</h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">

            {/* Name */}
            <label className="label">Name</label>
            <input name='name' type="text" className="input" placeholder="Name" required />

            {/* Email */}
            <label className="label">Email</label>
            <input name='email' type="email" className="input" placeholder="Email" required />

            {/* Phone */}
            <label className="label">Phone</label>
            <input name='phone' type="tel" className="input" placeholder="Phone Number" required />

            {/* Photo URL */}
            <label className="label">Photo URL</label>
            <input name='photo' type="text" className="input" placeholder="Photo URL" required />

            {/* Password */}
            <label className="label">Password</label>
            <input name='password' type="password" className="input" placeholder="Password" required />
            <p className="text-sm text-gray-500 mt-1">Must contain uppercase, lowercase, and be at least 6 characters</p>

            {/* Role Selection */}
            <label className="label mt-4">Register As</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="select select-bordered w-full"
              required
            >
              <option value="Student">Student (Looking for tutors)</option>
              <option value="Tutor">Tutor (Offering tuition services)</option>
            </select>

            <button className="btn btn-neutral mt-4" type='submit'>
              Register
            </button>

            <h2 className='font-semibold text-center mt-3'>-------- Or --------</h2>

            
            <button
              type='button'
              onClick={handleGoogleSignIn}
              className="btn mt-3 bg-white text-black border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google (Auto Student)
            </button>

            <p className='font-semibold text-center mt-3'>
              Already Have An Account?
              <NavLink className="text-blue-400 font-bold link link-hover ml-1" to='/login'>Login</NavLink>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
