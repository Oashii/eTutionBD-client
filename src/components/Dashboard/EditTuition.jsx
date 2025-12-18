import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { toast } from 'react-toastify';

const EditTuition = () => {
    useEffect(() => {
    document.title = 'eTuitionBD - Edit Tuition';
  }, []);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        subject: '',
        class: '',
        location: '',
        budget: '',
        schedule: '',
        description: '',
    });

    useEffect(() => {
        const fetchTuition = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tuitions/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setFormData(response.data.tuition);
            } catch (error) {
                console.error('Error fetching tuition:', error);
                toast.error('Error loading tuition');
                navigate('/student-dashboard/my-tuitions');
            } finally {
                setLoading(false);
            }
        };
        fetchTuition();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.subject || !formData.class || !formData.location || !formData.budget || !formData.schedule) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            await axios.put(
                `http://localhost:5000/api/tuitions/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            toast.success('Tuition updated successfully');
            navigate('/student-dashboard/my-tuitions');
        } catch (error) {
            console.error('Error updating tuition:', error);
            toast.error('Error updating tuition');
        }
    };

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-6">Edit Tuition Post</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Subject */}
                    <div className="form-group">
                        <label className="label">
                            <span className="label-text font-semibold">Subject *</span>
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="e.g., Mathematics, English, Physics"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Class */}
                    <div className="form-group">
                        <label className="label">
                            <span className="label-text font-semibold">Class *</span>
                        </label>
                        <input
                            type="text"
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                            placeholder="e.g., Class 10, Class 12"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Location */}
                    <div className="form-group">
                        <label className="label">
                            <span className="label-text font-semibold">Location *</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g., Dhaka, Chittagong"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Budget */}
                    <div className="form-group">
                        <label className="label">
                            <span className="label-text font-semibold">Budget (৳) *</span>
                        </label>
                        <input
                            type="number"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            placeholder="e.g., 5000"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Schedule */}
                    <div className="form-group">
                        <label className="label">
                            <span className="label-text font-semibold">Schedule *</span>
                        </label>
                        <input
                            type="text"
                            name="schedule"
                            value={formData.schedule}
                            onChange={handleChange}
                            placeholder="e.g., 3 days a week, Mon-Wed-Fri"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="form-group">
                    <label className="label">
                        <span className="label-text font-semibold">Description</span>
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Add any additional details about your tuition requirement"
                        className="textarea textarea-bordered w-full h-32"
                    ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="btn btn-primary flex-1"
                    >
                        Update Tuition
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/student-dashboard/my-tuitions')}
                        className="btn btn-outline flex-1"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTuition;
