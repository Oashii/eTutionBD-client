import React, { use, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router";

const UpdateProfile = () => {

  useEffect(() => {
        document.title = 'GameHub - Update Profile';
      }, []);

  const { user, updateUser, setUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;

    updateUser({ displayName: name, photoURL: photoURL })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photoURL });
        alert("Profile updated successfully!");
        navigate("/profile");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to update profile.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleUpdate}
        className="card bg-base-100 w-full max-w-sm shadow-2xl p-6"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Update Your Information
        </h2>

        <label className="label">Name</label>
        <input
          type="text"
          name="name"
          defaultValue={user?.displayName || ""}
          placeholder="Enter new name"
          className="input input-bordered w-full mb-4"
        />

        <label className="label">Photo URL</label>
        <input
          type="text"
          name="photoURL"
          defaultValue={user?.photoURL || ""}
          placeholder="Enter photo URL"
          className="input input-bordered w-full mb-4"
        />

        <button type="submit" className="btn btn-primary w-full mt-2">
          Update Information
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
