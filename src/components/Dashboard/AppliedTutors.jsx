import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { toast } from 'react-toastify';

const AppliedTutors = () => {
    useEffect(() => {
    document.title = 'eTuitionBD - Applied Tutors';
  }, []);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tuitions, setTuitions] = useState([]);
    const [selectedTuition, setSelectedTuition] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTuitions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/my-tuitions', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTuitions(response.data.tuitions);
                if (response.data.tuitions.length > 0) {
                    setSelectedTuition(response.data.tuitions[0]._id);
                }
            } catch (error) {
                console.error('Error fetching tuitions:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTuitions();
    }, []);

    useEffect(() => {
        if (selectedTuition) {
            const fetchApplications = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:5000/api/tuitions/${selectedTuition}/applications`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    );
                    setApplications(response.data.applications);
                } catch (error) {
                    console.error('Error fetching applications:', error);
                }
            };
            fetchApplications();
        }
    }, [selectedTuition]);

    const handleStatusChange = async (applicationId, newStatus) => {
        if (newStatus === 'Approved') {
            // Redirect to checkout page instead of immediately approving
            navigate(`/checkout/${applicationId}`);
        } else {
            // Reject application directly
            try {
                await axios.patch(
                    `http://localhost:5000/api/applications/${applicationId}`,
                    { status: newStatus },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                setApplications(
                    applications.map((app) =>
                        app._id === applicationId ? { ...app, status: newStatus } : app
                    )
                );
                toast.success(`Application ${newStatus.toLowerCase()} successfully!`);
            } catch (error) {
                toast.error('Error updating application');
            }
        }
    };

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Applied Tutors</h2>

            {tuitions.length > 0 ? (
                <>
                    <div className="mb-6">
                        <label className="label">
                            <span className="label-text font-semibold">Select a Tuition:</span>
                        </label>
                        <select
                            value={selectedTuition || ''}
                            onChange={(e) => setSelectedTuition(e.target.value)}
                            className="select select-bordered w-full"
                        >
                            {tuitions.map((tuition) => (
                                <option key={tuition._id} value={tuition._id}>
                                    {tuition.subject} - {tuition.class}
                                </option>
                            ))}
                        </select>
                    </div>

                    {applications.length > 0 ? (
                        <div className="grid gap-6">
                            {applications.map((application) => (
                                <div key={application._id} className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                            {application.tutorProfileImage ? (
                                                <img src={application.tutorProfileImage} alt="Tutor" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-2xl">👤</span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold">{application.tutorName}</h3>
                                            <p className="text-gray-600">{application.tutorEmail}</p>
                                            <p className="text-gray-600 mt-2"><strong>Expected Salary:</strong> ৳{application.expectedSalary}</p>
                                        </div>
                                        <span className={`badge ${
                                            application.status === 'Approved' ? 'badge-success' :
                                            application.status === 'Rejected' ? 'badge-error' :
                                            'badge-warning'
                                        }`}>
                                            {application.status}
                                        </span>
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
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleStatusChange(application._id, 'Approved')}
                                                className="btn btn-success btn-sm"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(application._id, 'Rejected')}
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
                            <p className="text-gray-500 text-lg">No applications for this tuition yet</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">You haven't posted any tuitions yet</p>
                </div>
            )}
        </div>
    );
};

export default AppliedTutors;
