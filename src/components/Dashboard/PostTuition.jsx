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
        <div>
            <h2 className="text-2xl font-bold mb-6">Post a New Tuition</h2>
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text font-semibold">Subject *</span>
                        </label>
                        <input
                            type="text"
                            name="subject"
                            placeholder="e.g. Mathematics"
                            className="input input-bordered"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text font-semibold">Class *</span>
                        </label>
                        <input
                            type="text"
                            name="class"
                            placeholder="e.g. Class 10"
                            className="input input-bordered"
                            value={formData.class}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text font-semibold">Location *</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            placeholder="e.g. Dhaka"
                            className="input input-bordered"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text font-semibold">Budget (৳) *</span>
                        </label>
                        <input
                            type="number"
                            name="budget"
                            placeholder="e.g. 5000"
                            className="input input-bordered"
                            value={formData.budget}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text font-semibold">Schedule *</span>
                        </label>
                        <input
                            type="text"
                            name="schedule"
                            placeholder="e.g. 2 days/week"
                            className="input input-bordered"
                            value={formData.schedule}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text font-semibold">Description *</span>
                        </label>
                        <textarea
                            name="description"
                            placeholder="Describe your tuition requirements..."
                            className="textarea textarea-bordered h-32"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="flex gap-3">
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
                            className="btn btn-ghost flex-1"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostTuition;
