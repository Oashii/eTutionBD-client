import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TutorsList = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTutors = async (pageNum = 1) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/tutors', {
                params: {
                    page: pageNum,
                    limit: 12,
                },
            });
            setTutors(response.data.tutors);
            setTotalPages(response.data.pagination.pages);
            setPage(pageNum);
        } catch (error) {
            console.error('Error fetching tutors:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTutors(1);
    }, []);

    if (loading && page === 1) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Browse Tutors</h1>

                {tutors.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {tutors.map((tutor) => (
                                <div key={tutor._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-center">
                                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                        {tutor.profileImage ? (
                                            <img src={tutor.profileImage} alt={tutor.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-4xl">👤</span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{tutor.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4 break-all">{tutor.email}</p>
                                    {tutor.phone && <p className="text-gray-600 text-sm mb-4">{tutor.phone}</p>}
                                    <Link
                                        to={`/tutor/${tutor._id}`}
                                        className="btn btn-primary btn-sm w-full"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-2 mb-8">
                            <button
                                onClick={() => fetchTutors(page - 1)}
                                disabled={page === 1}
                                className="btn btn-outline"
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => fetchTutors(i + 1)}
                                    className={`btn ${page === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => fetchTutors(page + 1)}
                                disabled={page === totalPages}
                                className="btn btn-outline"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-xl">No tutors available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TutorsList;
