import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
                    <motion.h1 
                        className="text-5xl font-bold mb-4"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Welcome to eTuitionBD
                    </motion.h1>
                    <motion.p 
                        className="text-xl mb-8 opacity-90"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Connect with qualified tutors and find the perfect tuition for your learning journey
                    </motion.p>
                    <motion.div 
                        className="flex gap-4 justify-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link to="/tuitions" className="btn btn-white text-blue-600">
                            Browse Tuitions
                        </Link>
                        <Link to="/tutors" className="btn btn-outline text-white border-white hover:bg-white hover:text-blue-600">
                            Find Tutors
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <motion.h2 
                        className="text-4xl font-bold text-center mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        How It Works
                    </motion.h2>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.2,
                                }
                            },
                            hidden: {}
                        }}
                    >
                        <motion.div 
                            className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-4xl font-bold text-blue-600 mb-4">1</div>
                            <h3 className="text-xl font-semibold mb-3">Post a Requirement</h3>
                            <p className="text-gray-600">Create a tuition post with your requirements, budget, and schedule</p>
                        </motion.div>
                        <motion.div 
                            className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-4xl font-bold text-blue-600 mb-4">2</div>
                            <h3 className="text-xl font-semibold mb-3">Receive Applications</h3>
                            <p className="text-gray-600">Get applications from qualified tutors interested in your tuition</p>
                        </motion.div>
                        <motion.div 
                            className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-4xl font-bold text-blue-600 mb-4">3</div>
                            <h3 className="text-xl font-semibold mb-3">Select & Hire</h3>
                            <p className="text-gray-600">Review applications and hire the best tutor for your needs</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.h2 
                        className="text-4xl font-bold text-center mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Why Choose eTuitionBD
                    </motion.h2>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.15,
                                }
                            },
                            hidden: {}
                        }}
                    >
                        <motion.div 
                            className="bg-blue-50 p-6 rounded-lg"
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1 }
                            }}
                            transition={{ duration: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-lg font-semibold text-blue-600 mb-2">✓ Verified Tutors</h3>
                            <p className="text-gray-600">All tutors are verified and reviewed by our admin team</p>
                        </motion.div>
                        <motion.div 
                            className="bg-blue-50 p-6 rounded-lg"
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1 }
                            }}
                            transition={{ duration: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-lg font-semibold text-blue-600 mb-2">✓ Transparent Pricing</h3>
                            <p className="text-gray-600">Clear pricing with no hidden charges</p>
                        </motion.div>
                        <motion.div 
                            className="bg-blue-50 p-6 rounded-lg"
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1 }
                            }}
                            transition={{ duration: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-lg font-semibold text-blue-600 mb-2">✓ Flexible Schedule</h3>
                            <p className="text-gray-600">Choose tutors based on your preferred schedule</p>
                        </motion.div>
                        <motion.div 
                            className="bg-blue-50 p-6 rounded-lg"
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1 }
                            }}
                            transition={{ duration: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 className="text-lg font-semibold text-blue-600 mb-2">✓ Quality Assured</h3>
                            <p className="text-gray-600">Experienced tutors with proven track records</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Latest Tuitions Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <motion.div 
                        className="flex justify-between items-center mb-12"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold">Latest Tuition Posts</h2>
                        <Link to="/tuitions" className="btn btn-primary">
                            View All Tuitions
                        </Link>
                    </motion.div>
                    {latestTuitions.length > 0 ? (
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1,
                                    }
                                },
                                hidden: {}
                            }}
                        >
                            {latestTuitions.map((tuition) => (
                                <motion.div 
                                    key={tuition._id} 
                                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    transition={{ duration: 0.4 }}
                                    whileHover={{ scale: 1.02 }}
                                >
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
                                </motion.div>
                            ))}
                        </motion.div>
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
                    <motion.div 
                        className="flex justify-between items-center mb-12"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold">Featured Tutors</h2>
                        <Link to="/tutors" className="btn btn-primary">
                            View All Tutors
                        </Link>
                    </motion.div>
                    {latestTutors.length > 0 ? (
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1,
                                    }
                                },
                                hidden: {}
                            }}
                        >
                            {latestTutors.map((tutor) => (
                                <motion.div 
                                    key={tutor._id} 
                                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-center"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    transition={{ duration: 0.4 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <motion.div 
                                        className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {tutor.profileImage ? (
                                            <img src={tutor.profileImage} alt={tutor.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-2xl">👤</span>
                                        )}
                                    </motion.div>
                                    <h3 className="text-xl font-semibold mb-2">{tutor.name}</h3>
                                    <p className="text-gray-600 mb-4">{tutor.email}</p>
                                    <Link
                                        to={`/tutor/${tutor._id}`}
                                        className="btn btn-outline btn-primary btn-sm w-full"
                                    >
                                        View Profile
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
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
                    <motion.h2 
                        className="text-4xl font-bold mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Ready to Get Started?
                    </motion.h2>
                    <motion.p 
                        className="text-xl mb-8 opacity-90"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Join thousands of students and tutors on eTuitionBD
                    </motion.p>
                    <motion.div 
                        className="flex gap-4 justify-center"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <Link to="/register" className="btn btn-white text-blue-600">
                            Sign Up Now
                        </Link>
                        <Link to="/tuitions" className="btn btn-outline text-white border-white hover:bg-white hover:text-blue-600">
                            Browse Tuitions
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;