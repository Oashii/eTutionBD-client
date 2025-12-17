import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';

const TuitionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [tuition, setTuition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [formData, setFormData] = useState({
        qualifications: '',
        experience: '',
        expectedSalary: '',
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchTuition = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tuitions/${id}`);
                setTuition(response.data.tuition);
            } catch (error) {
                console.error('Error fetching tuition:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTuition();
    }, [id]);

    const handleApply = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setSubmitting(true);
        try {
            await axios.post(
                'http://localhost:5000/api/applications',
                {
                    tuitionId: id,
                    ...formData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            alert('Application submitted successfully!');
            setShowApplyModal(false);
            setFormData({ qualifications: '', experience: '', expectedSalary: '' });
        } catch (error) {
            alert(error.response?.data?.message || 'Error submitting application');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!tuition) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-500">Tuition not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate(-1)} className="btn btn-ghost mb-6">
                    ← Back
                </button>

                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <h1 className="text-4xl font-bold mb-4">{tuition.subject}</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <p className="text-gray-600 mb-2"><strong>Class:</strong> {tuition.class}</p>
                            <p className="text-gray-600 mb-2"><strong>Location:</strong> {tuition.location}</p>
                            <p className="text-gray-600 mb-2"><strong>Schedule:</strong> {tuition.schedule}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 mb-2"><strong>Budget:</strong> ৳{tuition.budget}</p>
                            <p className="text-gray-600 mb-2"><strong>Status:</strong> <span className="badge badge-success">{tuition.status}</span></p>
                            <p className="text-gray-600 mb-2"><strong>Posted:</strong> {new Date(tuition.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <h2 className="text-2xl font-bold mb-4">Description</h2>
                        <p className="text-gray-700 leading-relaxed">{tuition.description}</p>
                    </div>

                    {tuition.postedByUser && (
                        <div className="bg-blue-50 p-6 rounded-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4">Posted By</h2>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                    {tuition.postedByUser.profileImage ? (
                                        <img src={tuition.postedByUser.profileImage} alt="User" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-2xl">👤</span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-lg font-semibold">{tuition.postedByUser.name}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {user?.role === 'Tutor' && (
                        <button
                            onClick={() => setShowApplyModal(true)}
                            className="btn btn-primary btn-lg w-full"
                        >
                            Apply for This Tuition
                        </button>
                    )}

                    {user?.role === 'Student' && (
                        <button onClick={() => navigate('/my-tuitions')} className="btn btn-outline w-full">
                            Manage Your Tuitions
                        </button>
                    )}

                    {!user && (
                        <button onClick={() => navigate('/login')} className="btn btn-primary btn-lg w-full">
                            Login to Apply
                        </button>
                    )}
                </div>
            </div>

            {/* Apply Modal */}
            {showApplyModal && (
                <div className="modal modal-open">
                    <div className="modal-box w-full max-w-md">
                        <h3 className="font-bold text-lg mb-4">Apply for {tuition.subject}</h3>
                        <form onSubmit={handleApply}>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Qualifications</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered h-24"
                                    placeholder="Your qualifications..."
                                    value={formData.qualifications}
                                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Experience</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered h-24"
                                    placeholder="Your experience..."
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-control mb-6">
                                <label className="label">
                                    <span className="label-text">Expected Salary</span>
                                </label>
                                <input
                                    type="number"
                                    className="input input-bordered"
                                    placeholder="Expected salary..."
                                    value={formData.expectedSalary}
                                    onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="modal-action">
                                <button
                                    type="button"
                                    onClick={() => setShowApplyModal(false)}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn btn-primary"
                                >
                                    {submitting ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowApplyModal(false)}></div>
                </div>
            )}
        </div>
    );
};

export default TuitionDetail;
