import React, { useState, useContext, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { toast } from 'react-toastify';

const PostTuition = () => {
    useEffect(() => {
    document.title = 'eTuitionBD - Post Tuition';
  }, []);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        subject: '',
        class: '',
        location: '',
        budget: '',
        schedule: '',
        description: '',
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post('http://localhost:5000/api/tuitions', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success('Tuition posted successfully! Admin will review and approve it.');
            navigate('/student-dashboard/my-tuitions');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error posting tuition');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-6">Post a New Tuition</h2>

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
                            placeholder="e.g., Mathematics, English, Physics"
                            className="input input-bordered w-full"
                            value={formData.subject}
                            onChange={handleChange}
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
                            placeholder="e.g., Class 10, Class 12"
                            className="input input-bordered w-full"
                            value={formData.class}
                            onChange={handleChange}
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
                            placeholder="e.g., Dhaka, Chittagong"
                            className="input input-bordered w-full"
                            value={formData.location}
                            onChange={handleChange}
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
                            placeholder="e.g., 5000"
                            className="input input-bordered w-full"
                            value={formData.budget}
                            onChange={handleChange}
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
                            placeholder="e.g., 3 days a week, Mon-Wed-Fri"
                            className="input input-bordered w-full"
                            value={formData.schedule}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="form-group">
                    <label className="label">
                        <span className="label-text font-semibold">Description *</span>
                    </label>
                    <textarea
                        name="description"
                        placeholder="Describe your tuition requirements..."
                        className="textarea textarea-bordered w-full h-32"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-primary flex-1"
                    >
                        {submitting ? 'Posting...' : 'Post Tuition'}
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

export default PostTuition;
