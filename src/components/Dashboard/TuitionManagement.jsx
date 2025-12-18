import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TuitionManagement = () => {
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTuitions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/tuitions', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTuitions(response.data.tuitions);
            } catch (error) {
                console.error('Error fetching tuitions:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTuitions();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/admin/tuitions/${id}`,
                { status: 'Approved' },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setTuitions(
                tuitions.map((t) =>
                    t._id === id ? { ...t, status: 'Approved' } : t
                )
            );
            toast.success('Tuition approved successfully');
        } catch (error) {
            toast.error('Error approving tuition');
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/admin/tuitions/${id}`,
                { status: 'Rejected' },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setTuitions(
                tuitions.map((t) =>
                    t._id === id ? { ...t, status: 'Rejected' } : t
                )
            );
            toast.success('Tuition rejected successfully');
        } catch (error) {
            toast.error('Error rejecting tuition');
        }
    };

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Tuition Management</h2>

            {tuitions.length > 0 ? (
                <div className="grid gap-6">
                    {tuitions.map((tuition) => (
                        <div key={tuition._id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold">{tuition.subject}</h3>
                                    <p className="text-gray-600">{tuition.class} - {tuition.location}</p>
                                </div>
                                <span className={`badge ${
                                    tuition.status === 'Approved' ? 'badge-success' :
                                    tuition.status === 'Rejected' ? 'badge-error' :
                                    'badge-warning'
                                }`}>
                                    {tuition.status === 'Approved' ? 'Available' : tuition.status}
                                </span>
                            </div>

                            <p className="text-gray-700 mb-4">{tuition.description?.substring(0, 150)}...</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                                <p><strong>Budget:</strong> ৳{tuition.budget}</p>
                                <p><strong>Schedule:</strong> {tuition.schedule}</p>
                                <p><strong>Posted:</strong> {new Date(tuition.createdAt).toLocaleDateString()}</p>
                            </div>

                            {tuition.status === 'Pending' && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleApprove(tuition._id)}
                                        className="btn btn-success btn-sm"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(tuition._id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No tuitions found</p>
                </div>
            )}
        </div>
    );
};

export default TuitionManagement;
