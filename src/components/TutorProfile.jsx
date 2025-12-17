import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TutorProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTutor = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tutors/${id}`);
                setTutor(response.data.tutor);
            } catch (error) {
                console.error('Error fetching tutor:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTutor();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!tutor) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-500">Tutor not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate(-1)} className="btn btn-ghost mb-6">
                    ← Back
                </button>

                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                        <div className="flex-shrink-0">
                            <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                {tutor.profileImage ? (
                                    <img src={tutor.profileImage} alt={tutor.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-6xl">👤</span>
                                )}
                            </div>
                        </div>

                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-2">{tutor.name}</h1>
                            <p className="text-gray-600 text-lg mb-4">{tutor.email}</p>
                            {tutor.phone && <p className="text-gray-600 mb-4"><strong>Phone:</strong> {tutor.phone}</p>}
                            <div className="flex flex-col gap-2">
                                <p className="text-lg"><strong>Role:</strong> <span className="badge badge-primary">{tutor.role}</span></p>
                                <p className="text-lg"><strong>Status:</strong> <span className="badge badge-success">{tutor.status}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold mb-4">About</h2>
                        <p className="text-gray-700">This tutor is verified and active on our platform. Feel free to browse tuition posts and apply to the ones that match your expertise!</p>
                    </div>

                    <div className="mt-8 pt-8 border-t">
                        <button onClick={() => navigate('/tuitions')} className="btn btn-primary btn-lg w-full">
                            Browse Tuitions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorProfile;
