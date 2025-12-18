import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthProvider';
import { toast } from 'react-toastify';
import ConfirmDialog from '../ConfirmDialog';

const MyApplications = () => {
    useEffect(() => {
    document.title = 'eTuitionBD - My Applications';
  }, []);
    const { user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        qualifications: '',
        experience: '',
        expectedSalary: '',
    });
    const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, applicationId: null });

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/my-applications', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setApplications(response.data.applications);
            } catch (error) {
                console.error('Error fetching applications:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const handleDelete = async (id) => {
        setDeleteConfirm({ isOpen: true, applicationId: id });
    };

    const confirmDelete = async () => {
        const id = deleteConfirm.applicationId;
        try {
            await axios.delete(`http://localhost:5000/api/applications/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setApplications(applications.filter((app) => app._id !== id));
            toast.success('Application deleted successfully');
            setDeleteConfirm({ isOpen: false, applicationId: null });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error deleting application');
            setDeleteConfirm({ isOpen: false, applicationId: null });
        }
    };

    const handleEditClick = (application) => {
        setEditingId(application._id);
        setEditFormData({
            qualifications: application.qualifications,
            experience: application.experience,
            expectedSalary: application.expectedSalary,
        });
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditFormData({
            qualifications: '',
            experience: '',
            expectedSalary: '',
        });
    };

    const handleEditSubmit = async (id) => {
        try {
            await axios.put(
                `http://localhost:5000/api/applications/${id}`,
                editFormData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            setApplications(applications.map((app) =>
                app._id === id
                    ? { ...app, ...editFormData, updatedAt: new Date() }
                    : app
            ));

            setEditingId(null);
            toast.success('Application updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating application');
        }
    };

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">My Applications</h2>

            {applications.length > 0 ? (
                <div className="grid gap-6">
                    {applications.map((application) => (
                        <div key={application._id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold">Tuition Application</h3>
                                <span className={`badge ${
                                    application.status === 'Approved' ? 'badge-success' :
                                    application.status === 'Rejected' ? 'badge-error' :
                                    'badge-warning'
                                }`}>
                                    {application.status}
                                </span>
                            </div>

                            {editingId === application._id ? (
                                <div className="space-y-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Expected Salary
                                        </label>
                                        <input
                                            type="number"
                                            value={editFormData.expectedSalary}
                                            onChange={(e) =>
                                                setEditFormData({
                                                    ...editFormData,
                                                    expectedSalary: e.target.value,
                                                })
                                            }
                                            className="input input-bordered w-full"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Qualifications
                                        </label>
                                        <textarea
                                            value={editFormData.qualifications}
                                            onChange={(e) =>
                                                setEditFormData({
                                                    ...editFormData,
                                                    qualifications: e.target.value,
                                                })
                                            }
                                            className="textarea textarea-bordered w-full"
                                            rows="3"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Experience
                                        </label>
                                        <textarea
                                            value={editFormData.experience}
                                            onChange={(e) =>
                                                setEditFormData({
                                                    ...editFormData,
                                                    experience: e.target.value,
                                                })
                                            }
                                            className="textarea textarea-bordered w-full"
                                            rows="3"
                                        ></textarea>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditSubmit(application._id)}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={handleEditCancel}
                                            className="btn btn-ghost btn-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-gray-600">
                                        <p><strong>Expected Salary:</strong> ৳{application.expectedSalary}</p>
                                        <p><strong>Applied:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-gray-600 mb-2"><strong>Qualifications:</strong></p>
                                        <p className="text-gray-700">{application.qualifications}</p>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-gray-600 mb-2"><strong>Experience:</strong></p>
                                        <p className="text-gray-700">{application.experience}</p>
                                    </div>

                                    {application.status === 'Pending' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditClick(application)}
                                                className="btn btn-primary btn-sm"
                                            >
                                                Edit Application
                                            </button>
                                            <button
                                                onClick={() => handleDelete(application._id)}
                                                className="btn btn-error btn-sm"
                                            >
                                                Delete Application
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No applications yet</p>
                </div>
            )}
            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                title="Delete Application"
                message="Are you sure you want to delete this application? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                isDangerous={true}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteConfirm({ isOpen: false, applicationId: null })}
            />
        </div>
    );
};

export default MyApplications;
