import React, { use, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { NavLink, useNavigate } from "react-router";

const Profile = () => {

  useEffect(() => {
      document.title = 'eTuitionBD - Profile';
    }, []);

  const { user } = use(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] gap-5">
        <p className="text-xl font-semibold">Please log in to see your profile.</p>
        <NavLink to='/login' className="btn btn-primary">LogIn</NavLink>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <img
        src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
        alt="Profile"
        className="w-32 h-32 rounded-full mb-5 border-4 border-blue-500 object-cover"
      />
      <h2 className="text-2xl font-bold mb-2">Name: {user.displayName || "No name set"}</h2>
      <p className="text-lg mb-6">Email: {user.email}</p>
      <button
        onClick={() => navigate("/update-profile")}
        className="btn btn-primary px-6"
      >
        Update Information
      </button>
    </div>
  );
};

export default Profile;
