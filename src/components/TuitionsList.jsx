import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TuitionsList = () => {
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        subject: '',
        location: '',
        class: '',
    });
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState('desc');

    const fetchTuitions = async (pageNum = 1) => {
        setLoading(true);
        try {
            const params = {
                page: pageNum,
                limit: 12,
                sortBy,
                order,
            };
            if (filters.subject) params.subject = filters.subject;
            if (filters.location) params.location = filters.location;
            if (filters.class) params.class = filters.class;

            const response = await axios.get('http://localhost:5000/api/tuitions', { params });
            setTuitions(response.data.tuitions);
            setTotalPages(response.data.pagination.pages);
            setPage(pageNum);
        } catch (error) {
            console.error('Error fetching tuitions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTuitions(1);
    }, [filters, sortBy, order]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

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
                <h1 className="text-4xl font-bold mb-8">All Tuition Posts</h1>

                {/* Filters Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Search & Filter</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <input
                            type="text"
                            name="subject"
                            placeholder="Search by subject..."
                            value={filters.subject}
                            onChange={handleFilterChange}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Filter by location..."
                            value={filters.location}
                            onChange={handleFilterChange}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="text"
                            name="class"
                            placeholder="Filter by class..."
                            value={filters.class}
                            onChange={handleFilterChange}
                            className="input input-bordered w-full"
                        />
                        <div className="flex gap-2">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="select select-bordered flex-1"
                            >
                                <option value="createdAt">Latest</option>
                                <option value="budget">Budget</option>
                            </select>
                            <select
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                className="select select-bordered flex-1"
                            >
                                <option value="desc">Desc</option>
                                <option value="asc">Asc</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tuitions Grid */}
                {tuitions.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {tuitions.map((tuition) => (
                                <div key={tuition._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                                    <h3 className="text-xl font-semibold mb-2">{tuition.subject}</h3>
                                    <div className="space-y-2 mb-4 text-gray-600">
                                        <p><strong>Class:</strong> {tuition.class}</p>
                                        <p><strong>Location:</strong> {tuition.location}</p>
                                        <p><strong>Budget:</strong> ৳{tuition.budget}</p>
                                        <p><strong>Schedule:</strong> {tuition.schedule}</p>
                                        <p className="text-sm">{tuition.description?.substring(0, 100)}...</p>
                                    </div>
                                    <Link
                                        to={`/tuition/${tuition._id}`}
                                        className="btn btn-primary btn-sm w-full"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-2 mb-8">
                            <button
                                onClick={() => fetchTuitions(page - 1)}
                                disabled={page === 1}
                                className="btn btn-outline"
                            >
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => fetchTuitions(i + 1)}
                                    className={`btn ${page === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => fetchTuitions(page + 1)}
                                disabled={page === totalPages}
                                className="btn btn-outline"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-xl">No tuitions found matching your criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TuitionsList;
