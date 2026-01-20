import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    useEffect(() => {
        document.title = 'eTuitionBD - Home';
      }, []);
    const [latestTuitions, setLatestTuitions] = useState([]);
    const [latestTutors, setLatestTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tutionsRes, tutorsRes] = await Promise.all([
                    axios.get('https://etuitionbd.vercel.app/api/tuitions/latest/home'),
                    axios.get('https://etuitionbd.vercel.app/api/tutors/latest'),
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

            {/* Statistics Section */}
            <section className="py-16 px-4 bg-white dark:bg-gray-900">
                <div className="max-w-6xl mx-auto">
                    <motion.h2 
                        className="text-4xl font-bold text-center mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Our Impact
                    </motion.h2>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
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
                            className="text-center"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">5000+</div>
                            <p className="text-xl text-gray-600 dark:text-gray-300">Active Students</p>
                        </motion.div>
                        <motion.div 
                            className="text-center"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">800+</div>
                            <p className="text-xl text-gray-600 dark:text-gray-300">Verified Tutors</p>
                        </motion.div>
                        <motion.div 
                            className="text-center"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">10000+</div>
                            <p className="text-xl text-gray-600 dark:text-gray-300">Sessions Completed</p>
                        </motion.div>
                        <motion.div 
                            className="text-center"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">4.8/5</div>
                            <p className="text-xl text-gray-600 dark:text-gray-300">Average Rating</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 px-4 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-6xl mx-auto">
                    <motion.h2 
                        className="text-4xl font-bold text-center mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Student Testimonials
                    </motion.h2>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
                            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex gap-1 mb-3">
                                {[...Array(5)].map((_, i) => <span key={i}>⭐</span>)}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                "I improved my math grades significantly in just 3 months. The tutor was very patient and explained concepts clearly."
                            </p>
                            <div className="font-semibold">Fatima Ahmed</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Student, Dhaka</div>
                        </motion.div>
                        <motion.div 
                            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex gap-1 mb-3">
                                {[...Array(5)].map((_, i) => <span key={i}>⭐</span>)}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                "The platform is easy to use and the payment system is secure. I found the perfect tutor for my child!"
                            </p>
                            <div className="font-semibold">Karim Hassan</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Parent, Chittagong</div>
                        </motion.div>
                        <motion.div 
                            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex gap-1 mb-3">
                                {[...Array(5)].map((_, i) => <span key={i}>⭐</span>)}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                "As a tutor, eTuitionBD has helped me build a steady income. The platform is transparent and reliable."
                            </p>
                            <div className="font-semibold">Noor Khan</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Tutor, Sylhet</div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Services/Features Section */}
            <section className="py-16 px-4 bg-white dark:bg-gray-900">
                <div className="max-w-6xl mx-auto">
                    <motion.h2 
                        className="text-4xl font-bold text-center mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Our Services
                    </motion.h2>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                            className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-600"
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="text-3xl mb-3">🎓</div>
                            <h3 className="font-bold text-lg mb-2">Online Tutoring</h3>
                            <p className="text-gray-600 dark:text-gray-300">Connect with qualified tutors for one-on-one online sessions at your convenience.</p>
                        </motion.div>
                        <motion.div 
                            className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-600"
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="text-3xl mb-3">🏠</div>
                            <h3 className="font-bold text-lg mb-2">Home Tutoring</h3>
                            <p className="text-gray-600 dark:text-gray-300">Find tutors willing to come to your location for personalized in-home instruction.</p>
                        </motion.div>
                        <motion.div 
                            className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-600"
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="text-3xl mb-3">📊</div>
                            <h3 className="font-bold text-lg mb-2">Progress Tracking</h3>
                            <p className="text-gray-600 dark:text-gray-300">Monitor your progress with detailed reports and feedback from your tutor.</p>
                        </motion.div>
                        <motion.div 
                            className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-600"
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="text-3xl mb-3">📱</div>
                            <h3 className="font-bold text-lg mb-2">Mobile Access</h3>
                            <p className="text-gray-600 dark:text-gray-300">Access the platform anytime, anywhere with our mobile-friendly interface.</p>
                        </motion.div>
                        <motion.div 
                            className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-600"
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="text-3xl mb-3">💬</div>
                            <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                            <p className="text-gray-600 dark:text-gray-300">Get instant support from our dedicated customer service team.</p>
                        </motion.div>
                        <motion.div 
                            className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border-l-4 border-indigo-600"
                            variants={{
                                hidden: { opacity: 0, x: -20 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="text-3xl mb-3">🔐</div>
                            <h3 className="font-bold text-lg mb-2">Secure Payments</h3>
                            <p className="text-gray-600 dark:text-gray-300">All transactions are secure and encrypted for your peace of mind.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Blog/Latest Articles Section */}
            <section className="py-16 px-4 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-6xl mx-auto">
                    <motion.div 
                        className="flex justify-between items-center mb-12"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold">Latest Articles</h2>
                        <Link to="/blog" className="btn btn-primary">
                            View All Articles
                        </Link>
                    </motion.div>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
                        {[
                            {
                                emoji: '📚',
                                title: '10 Tips for Finding the Right Tutor',
                                excerpt: 'Learn how to identify a tutor that matches your learning style and academic goals.',
                                date: 'January 15, 2026'
                            },
                            {
                                emoji: '💡',
                                title: 'How to Maximize Your Learning Sessions',
                                excerpt: 'Discover effective strategies to make the most out of your tuition sessions.',
                                date: 'January 12, 2026'
                            },
                            {
                                emoji: '🌐',
                                title: 'Benefits of Online Tutoring',
                                excerpt: 'Explore the advantages of online education and why it\'s perfect for busy students.',
                                date: 'January 10, 2026'
                            }
                        ].map((article, index) => (
                            <motion.div 
                                key={index}
                                className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center text-3xl h-24 flex items-center justify-center">
                                    {article.emoji}
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2 hover:text-blue-600 dark:hover:text-blue-400">{article.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{article.excerpt}</p>
                                    <p className="text-gray-500 dark:text-gray-500 text-xs">{article.date}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 bg-white dark:bg-gray-900">
                <div className="max-w-4xl mx-auto">
                    <motion.h2 
                        className="text-4xl font-bold text-center mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.div 
                        className="space-y-4"
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
                        {[
                            { q: 'How do I find a tutor?', a: 'Browse our tutors page and use filters to find tutors based on your needs.' },
                            { q: 'Is eTuitionBD free to join?', a: 'Yes, joining is completely free. You only pay when you hire a tutor.' },
                            { q: 'How secure are payments?', a: 'All payments are processed securely through encrypted channels.' },
                            { q: 'Can I cancel a tuition session?', a: 'Yes, cancellations can be made based on our cancellation policy.' }
                        ].map((item, index) => (
                            <motion.details 
                                key={index}
                                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg cursor-pointer"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1 }
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <summary className="font-semibold text-lg hover:text-blue-600 dark:hover:text-blue-400">
                                    {item.q}
                                </summary>
                                <p className="mt-3 text-gray-600 dark:text-gray-300 ml-4">{item.a}</p>
                            </motion.details>
                        ))}
                    </motion.div>
                    <div className="text-center mt-8">
                        <Link to="/faq" className="btn btn-outline">
                            View All FAQ
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white py-16 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.h2 
                        className="text-4xl font-bold mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Stay Updated
                    </motion.h2>
                    <motion.p 
                        className="text-xl mb-8 opacity-90"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Subscribe to our newsletter for latest tips, updates, and exclusive offers
                    </motion.p>
                    <motion.div 
                        className="flex gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        />
                        <button className="btn btn-white text-blue-600 hover:text-blue-700">
                            Subscribe
                        </button>
                    </motion.div>
                    <p className="text-sm mt-4 opacity-75">We respect your privacy. Unsubscribe at any time.</p>
                </div>
            </section>

            <section className="bg-blue-600 dark:bg-blue-900 text-white py-16 px-4 transition-colors duration-300">
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