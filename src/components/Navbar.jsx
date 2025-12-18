import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../provider/AuthProvider";
import Logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut().then(() => {
      alert("Logged Out!");
      window.location.href = '/';
    })
      .catch(() => { });
  };

  const getDashboardLink = () => {
    if (user?.role === 'Admin') {
      return '/admin-dashboard/users';
    } else if (user?.role === 'Tutor') {
      return '/tutor-dashboard/my-applications';
    } else {
      return '/student-dashboard/my-tuitions';
    }
  };

  const closeDropdown = (e) => {
    e.currentTarget.closest('.dropdown')?.querySelector('[role="button"]')?.blur();
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/tuitions">Tuitions</NavLink></li>
              <li><NavLink to="/tutors">Tutors</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>
          <NavLink to="/" >
            <img src={Logo} alt="Logo" className='max-h-15' />
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/tuitions">Tuitions</NavLink></li>
            <li><NavLink to="/tutors">Tutors</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        {/* Login/Logout Toggle */}
        <div className='flex gap-2 items-center navbar-end'>
          {user && user?.email ? (
            <div className="flex gap-2 items-center">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2">
                  <span className="text-sm font-semibold hidden sm:inline">{user?.displayName || 'User'}</span>
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><NavLink to='/profile' onClick={closeDropdown}>Profile</NavLink></li>
                  <li><NavLink to={getDashboardLink()} onClick={closeDropdown}>Dashboard</NavLink></li>
                  <li><a onClick={(e) => { closeDropdown(e); handleLogOut(); }}>Logout</a></li>
                </ul>
              </div>
              {user?.photoURL && (
                <img src={user.photoURL} alt="profile" className='h-9 w-9 rounded-full' />
              )}
            </div>
          ) :
            <div className='flex gap-2'>
              <NavLink to='/login'>
                <button className='btn btn-primary btn-sm'>Login</button>
              </NavLink>
              <NavLink to='/register'>
                <button className='btn btn-outline btn-sm'>Register</button>
              </NavLink>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Navbar;