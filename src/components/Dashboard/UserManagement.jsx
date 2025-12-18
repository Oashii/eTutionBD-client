import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        role: '',
        status: '',
        profileImage: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUsers(users.filter((u) => u._id !== id));
                alert('User deleted successfully');
            } catch (error) {
                alert('Error deleting user');
            }
        }
    };

    const handleViewProfile = (user) => {
        setSelectedUser(user);
        setEditFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            profileImage: user.profileImage || '',
        });
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleEditCancel = () => {
        setIsEditing(false);
        setEditFormData({
            name: selectedUser.name,
            email: selectedUser.email,
            role: selectedUser.role,
            status: selectedUser.status,
            profileImage: selectedUser.profileImage || '',
        });
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(
                `http://localhost:5000/api/admin/users/${selectedUser._id}`,
                editFormData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            setUsers(users.map((u) =>
                u._id === selectedUser._id
                    ? { ...u, ...editFormData }
                    : u
            ));

            setSelectedUser({ ...selectedUser, ...editFormData });
            setIsEditing(false);
            alert('User updated successfully');
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating user');
        }
    };

    const handleRoleChange = async (id, newRole) => {
        try {
            await axios.put(
                `http://localhost:5000/api/admin/users/${id}`,
                { role: newRole },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setUsers(
                users.map((u) =>
                    u._id === id ? { ...u, role: newRole } : u
                )
            );
            alert('User role updated successfully');
        } catch (error) {
            alert('Error updating user');
        }
    };

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">User Management</h2>

            {users.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Email</th>
                                <th className="px-6 py-3 text-left">Role</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            className="select select-bordered select-sm"
                                        >
                                            <option>Student</option>
                                            <option>Tutor</option>
                                            <option>Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="badge badge-success">{user.status}</span>
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button
                                            onClick={() => handleViewProfile(user)}
                                            className="btn btn-primary btn-xs"
                                        >
                                            View/Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn btn-error btn-xs"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No users found</p>
                </div>
            )}

            {/* User Profile Modal */}
            {selectedUser && (
                <div className="modal modal-open">
                    <div className="modal-box w-full max-w-2xl">
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>

                        <h3 className="font-bold text-2xl mb-6">
                            {isEditing ? 'Edit User Profile' : 'User Profile'}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Profile Image - Left Side */}
                            <div className="md:col-span-1 flex flex-col items-center">
                                {editFormData.profileImage ? (
                                    <img
                                        src={editFormData.profileImage}
                                        alt={editFormData.name}
                                        className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
                                    />
                                ) : (
                                    <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-6xl">
                                        👤
                                    </div>
                                )}
                                {isEditing && (
                                    <p className="text-xs text-gray-500 mt-4 text-center">Update the image URL below</p>
                                )}
                            </div>

                            {/* User Info/Form - Right Side */}
                            <div className="md:col-span-2">
                                {isEditing ? (
                                // Edit Form
                                <div className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editFormData.name}
                                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={editFormData.email}
                                            onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    {/* Role */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Role
                                        </label>
                                        <select
                                            value={editFormData.role}
                                            onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                                            className="select select-bordered w-full"
                                        >
                                            <option>Student</option>
                                            <option>Tutor</option>
                                            <option>Admin</option>
                                        </select>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Account Status
                                        </label>
                                        <select
                                            value={editFormData.status}
                                            onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                                            className="select select-bordered w-full"
                                        >
                                            <option>Active</option>
                                            <option>Inactive</option>
                                            <option>Suspended</option>
                                            <option>Verified</option>
                                        </select>
                                    </div>

                                    {/* Profile Image URL */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Profile Image URL
                                        </label>
                                        <input
                                            type="url"
                                            value={editFormData.profileImage}
                                            onChange={(e) => setEditFormData({ ...editFormData, profileImage: e.target.value })}
                                            className="input input-bordered w-full"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            ) : (
                                // View Mode
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Name</p>
                                            <p className="font-semibold">{selectedUser.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Email</p>
                                            <p className="font-semibold">{selectedUser.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Role</p>
                                            <p className="font-semibold">{selectedUser.role}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Account Status</p>
                                            <p className="font-semibold">
                                                <span className="badge badge-success">{selectedUser.status}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Member Since</p>
                                        <p className="font-semibold">
                                            {new Date(selectedUser.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>

                        {/* Modal Actions */}
                        <div className="modal-action mt-6">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleEditCancel}
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleEditSubmit}
                                        className="btn btn-primary"
                                    >
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setSelectedUser(null)}
                                        className="btn btn-ghost"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={handleEditClick}
                                        className="btn btn-primary"
                                    >
                                        Edit User
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setSelectedUser(null)}></div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
