import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [latestTuitions, setLatestTuitions] = useState([]);
    const [latestTutors, setLatestTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tutionsRes, tutorsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/tuitions/latest/home'),
                    axios.get('http://localhost:5000/api/tutors/latest'),
                ]);
                setLatestTuitions(tutionsRes.data.tuitions || []);
                setLatestTutors(tutorsRes.data.tutors || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">Welcome to eTuitionBD</h1>
                    <p className="text-xl mb-8 opacity-90">Connect with qualified tutors and find the perfect tuition for your learning journey</p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/tuitions" className="btn btn-white text-blue-600">
                            Browse Tuitions
                        </Link>
                        <Link to="/tutors" className="btn btn-outline text-white border-white hover:bg-white hover:text-blue-600">
                            Find Tutors
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition">
                            <div className="text-4xl font-bold text-blue-600 mb-4">1</div>
                            <h3 className="text-xl font-semibold mb-3">Post a Requirement</h3>
                            <p className="text-gray-600">Create a tuition post with your requirements, budget, and schedule</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition">
                            <div className="text-4xl font-bold text-blue-600 mb-4">2</div>
                            <h3 className="text-xl font-semibold mb-3">Receive Applications</h3>
                            <p className="text-gray-600">Get applications from qualified tutors interested in your tuition</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition">
                            <div className="text-4xl font-bold text-blue-600 mb-4">3</div>
                            <h3 className="text-xl font-semibold mb-3">Select & Hire</h3>
                            <p className="text-gray-600">Review applications and hire the best tutor for your needs</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Choose eTuitionBD</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-600 mb-2">✓ Verified Tutors</h3>
                            <p className="text-gray-600">All tutors are verified and reviewed by our admin team</p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-600 mb-2">✓ Transparent Pricing</h3>
                            <p className="text-gray-600">Clear pricing with no hidden charges</p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-600 mb-2">✓ Flexible Schedule</h3>
                            <p className="text-gray-600">Choose tutors based on your preferred schedule</p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-600 mb-2">✓ Quality Assured</h3>
                            <p className="text-gray-600">Experienced tutors with proven track records</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Tuitions Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-4xl font-bold">Latest Tuition Posts</h2>
                        <Link to="/tuitions" className="btn btn-primary">
                            View All Tuitions
                        </Link>
                    </div>
                    {latestTuitions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {latestTuitions.map((tuition) => (
                                <div key={tuition._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                                    <h3 className="text-xl font-semibold mb-2">{tuition.subject}</h3>
                                    <p className="text-gray-600 mb-2"><strong>Class:</strong> {tuition.class}</p>
                                    <p className="text-gray-600 mb-2"><strong>Location:</strong> {tuition.location}</p>
                                    <p className="text-gray-600 mb-2"><strong>Budget:</strong> ৳{tuition.budget}</p>
                                    <p className="text-gray-600 mb-4"><strong>Schedule:</strong> {tuition.schedule}</p>
                                    <Link
                                        to={`/tuition/${tuition._id}`}
                                        className="btn btn-outline btn-primary btn-sm w-full"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No tuitions available yet</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Latest Tutors Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-4xl font-bold">Featured Tutors</h2>
                        <Link to="/tutors" className="btn btn-primary">
                            View All Tutors
                        </Link>
                    </div>
                    {latestTutors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {latestTutors.map((tutor) => (
                                <div key={tutor._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                        {tutor.profileImage ? (
                                            <img src={tutor.profileImage} alt={tutor.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-2xl">👤</span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{tutor.name}</h3>
                                    <p className="text-gray-600 mb-4">{tutor.email}</p>
                                    <Link
                                        to={`/tutor/${tutor._id}`}
                                        className="btn btn-outline btn-primary btn-sm w-full"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No tutors available yet</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 text-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-xl mb-8 opacity-90">Join thousands of students and tutors on eTuitionBD</p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/register" className="btn btn-white text-blue-600">
                            Sign Up Now
                        </Link>
                        <Link to="/tuitions" className="btn btn-outline text-white border-white hover:bg-white hover:text-blue-600">
                            Browse Tuitions
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;