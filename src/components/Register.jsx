import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router';
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { createUser, setUser, updateUser, logInWithGoogle } = useContext(AuthContext);
  const [role, setRole] = useState('Student');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = 'eTuitionBD - Register';
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToImgbb = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image to imgbb');
      }

      const data = await response.json();
      return data.data.url; // Return the image URL
    } catch (error) {
      console.error('Error uploading to imgbb:', error);
      throw error;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const phone = form.phone.value;

    // Validate that an image was selected
    if (!photoFile) {
      alert('Please select a profile image');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.");
      return;
    }

    setUploading(true);

    try {
      // Upload image to imgbb
      const photoUrl = await uploadImageToImgbb(photoFile);

      // Register user in Firebase
      createUser(email, password)
        .then((result) => {
          const user = result.user;
          updateUser({ displayName: name, photoURL: photoUrl })
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
                    profileImage: photoUrl,
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
                  photoURL: photoUrl,
                  role: role,
                  phone,
                });
                alert(`Registered as ${role}! Welcome!`);
                
                // Get the page user was trying to access before registration
                const from = location.state?.from?.pathname || null;
                
                // Route based on role, but prefer redirecting to the original page if available
                if (from && from !== '/login' && from !== '/register') {
                  navigate(from);
                } else if (role === 'Tutor') {
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
        })
        .finally(() => setUploading(false));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
      setUploading(false);
    }
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

            {/* Profile Image Upload */}
            <label className="label">Profile Image</label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
                const files = e.dataTransfer.files;
                if (files[0]) {
                  const event = { target: { files } };
                  handlePhotoChange(event);
                }
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                id="photo-input"
                required
              />
              <label htmlFor="photo-input" className="cursor-pointer block">
                {photoPreview ? (
                  <div className="flex flex-col items-center gap-3">
                    <img src={photoPreview} alt="Preview" className="w-20 h-20 rounded-lg object-cover" />
                    <p className="text-sm text-gray-600">Click to change image</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl mb-2">📸</p>
                    <p className="text-gray-700 font-medium">Drag & drop your image here</p>
                    <p className="text-gray-500 text-sm">or click to select</p>
                  </div>
                )}
              </label>
            </div>

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

            <button 
              className="btn btn-neutral mt-4" 
              type='submit'
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Uploading...
                </>
              ) : (
                'Register'
              )}
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
