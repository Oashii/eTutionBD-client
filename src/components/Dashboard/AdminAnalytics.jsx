import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAnalytics = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        students: 0,
        tutors: 0,
        admins: 0,
        totalTuitions: 0,
        approvedTuitions: 0,
        pendingTuitions: 0,
        rejectedTuitions: 0,
        totalTransactions: 0,
        totalEarnings: 0,
    });
    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const [usersRes, tuitionsRes, paymentsRes] = await Promise.all([
                    axios.get('https://etuitionbd.vercel.app/api/admin/users', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    }),
                    axios.get('https://etuitionbd.vercel.app/api/admin/tuitions', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    }),
                    axios.get('https://etuitionbd.vercel.app/api/admin/transactions', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    }).catch((error) => {
                        console.error('Error fetching transactions:', error);
                        return { data: { transactions: [] } };
                    }),
                ]);

                const users = usersRes.data.users;
                const tuitions = tuitionsRes.data.tuitions;
                const transactions = paymentsRes.data.transactions || [];

                const studentCount = users.filter((u) => u.role === 'Student').length;
                const tutorCount = users.filter((u) => u.role === 'Tutor').length;
                const adminCount = users.filter((u) => u.role === 'Admin').length;

                const approvedCount = tuitions.filter((t) => t.status === 'Approved').length;
                const pendingCount = tuitions.filter((t) => t.status === 'Pending').length;
                const rejectedCount = tuitions.filter((t) => t.status === 'Rejected').length;

                // Filter for successful transactions only (status is 'Success' from server)
                const successfulTransactions = transactions.filter((t) => t.status === 'Success' || t.status === 'Successful' || t.status === 'success');
                const totalEarnings = successfulTransactions.reduce((sum, p) => sum + p.amount, 0);

                setStats({
                    totalUsers: users.length,
                    students: studentCount,
                    tutors: tutorCount,
                    admins: adminCount,
                    totalTuitions: tuitions.length,
                    approvedTuitions: approvedCount,
                    pendingTuitions: pendingCount,
                    rejectedTuitions: rejectedCount,
                    totalTransactions: successfulTransactions.length,
                    totalEarnings: totalEarnings,
                });

                setPayments(successfulTransactions.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)));

                // Calculate monthly earnings
                const monthlyMap = {};
                successfulTransactions.forEach((txn) => {
                    const month = new Date(txn.transactionDate).toISOString().slice(0, 7);
                    monthlyMap[month] = (monthlyMap[month] || 0) + txn.amount;
                });
                setMonthlyData(Object.entries(monthlyMap).map(([month, amount]) => ({ month, amount })).sort((a, b) => a.month.localeCompare(b.month)));
            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    // Calculate monthly earnings for selected month
    const selectedMonthEarnings = monthlyData.find(m => m.month === selectedMonth)?.amount || 0;
    const selectedMonthTransactions = payments.filter(p => new Date(p.transactionDate).toISOString().slice(0, 7) === selectedMonth).length;

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    // Calculate percentages for pie chart
    const totalUsersValue = stats.totalUsers || 1;
    const studentPercent = ((stats.students / totalUsersValue) * 100).toFixed(1);
    const tutorPercent = ((stats.tutors / totalUsersValue) * 100).toFixed(1);
    const adminPercent = ((stats.admins / totalUsersValue) * 100).toFixed(1);

    const totalTuitionsValue = stats.totalTuitions || 1;
    const approvedPercent = ((stats.approvedTuitions / totalTuitionsValue) * 100).toFixed(1);
    const pendingPercent = ((stats.pendingTuitions / totalTuitionsValue) * 100).toFixed(1);
    const rejectedPercent = ((stats.rejectedTuitions / totalTuitionsValue) * 100).toFixed(1);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Reports & Analytics</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Total Users</h3>
                    <p className="text-3xl font-bold dark:text-white">{stats.totalUsers}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-md p-6">
                    <h3 className="text-blue-600 dark:text-blue-400 text-sm font-semibold mb-2">Students</h3>
                    <p className="text-3xl font-bold dark:text-white">{stats.students}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg shadow-md p-6">
                    <h3 className="text-green-600 dark:text-green-400 text-sm font-semibold mb-2">Tutors</h3>
                    <p className="text-3xl font-bold dark:text-white">{stats.tutors}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg shadow-md p-6">
                    <h3 className="text-purple-600 dark:text-purple-400 text-sm font-semibold mb-2">Admins</h3>
                    <p className="text-3xl font-bold dark:text-white">{stats.admins}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* User Distribution Pie Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-6 dark:text-white">User Distribution</h3>
                    <div className="flex items-center justify-center gap-8">
                        <svg viewBox="0 0 100 100" className="w-40 h-40">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="15" strokeDasharray={`${studentPercent * 2.827} 282.7`} transform="rotate(-90 50 50)" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray={`${tutorPercent * 2.2} 220`} transform="rotate(-90 50 50)" style={{strokeDashoffset: `-${studentPercent * 2.827}`}} />
                            <circle cx="50" cy="50" r="25" fill="none" stroke="#a855f7" strokeWidth="10" strokeDasharray={`${adminPercent * 1.57} 157`} transform="rotate(-90 50 50)" style={{strokeDashoffset: `-${(studentPercent + tutorPercent) * 2.0}`}} />
                        </svg>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                                <span className="dark:text-gray-300">Students: {studentPercent}% ({stats.students})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-600 rounded"></div>
                                <span className="dark:text-gray-300">Tutors: {tutorPercent}% ({stats.tutors})</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-purple-600 rounded"></div>
                                <span className="dark:text-gray-300">Admins: {adminPercent}% ({stats.admins})</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tuition Status Bar Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-6 dark:text-white">Tuition Status Distribution</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-semibold dark:text-gray-300">Approved</span>
                                <span className="text-sm font-bold dark:text-gray-300">{approvedPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                                <div className="bg-green-500 h-4 rounded-full" style={{width: `${approvedPercent}%`}}></div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stats.approvedTuitions} tuitions</p>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-semibold dark:text-gray-300">Pending</span>
                                <span className="text-sm font-bold dark:text-gray-300">{pendingPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                                <div className="bg-yellow-500 h-4 rounded-full" style={{width: `${pendingPercent}%`}}></div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stats.pendingTuitions} tuitions</p>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-semibold dark:text-gray-300">Rejected</span>
                                <span className="text-sm font-bold dark:text-gray-300">{rejectedPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                                <div className="bg-red-500 h-4 rounded-full" style={{width: `${rejectedPercent}%`}}></div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stats.rejectedTuitions} tuitions</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tuition Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Total Tuitions</h3>
                    <p className="text-3xl font-bold dark:text-white">{stats.totalTuitions}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg shadow-md p-6">
                    <h3 className="text-green-600 dark:text-green-400 text-sm font-semibold mb-2">Approved</h3>
                    <p className="text-3xl font-bold dark:text-white">{stats.approvedTuitions}</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg shadow-md p-6">
                    <h3 className="text-yellow-600 dark:text-yellow-400 text-sm font-semibold mb-2">Pending</h3>
                    <p className="text-3xl font-bold dark:text-white">{stats.pendingTuitions}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg shadow-md p-6">
                    <h3 className="text-red-600 dark:text-red-400 text-sm font-semibold mb-2">Rejected</h3>
                    <p className="text-3xl font-bold dark:text-white">{stats.rejectedTuitions}</p>
                </div>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Total Earnings Card */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white rounded-lg shadow-md p-8">
                    <h3 className="text-lg opacity-90 mb-2">Total Platform Earnings</h3>
                    <p className="text-5xl font-bold mb-4">৳{stats.totalEarnings.toLocaleString()}</p>
                    <div className="flex justify-between items-center opacity-90">
                        <span>All successful transactions</span>
                        <span className="text-2xl">{stats.totalTransactions} transactions</span>
                    </div>
                </div>

                {/* Monthly Report Card */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-emerald-900 dark:to-emerald-950 text-white rounded-lg shadow-md p-8">
                    <div className="mb-4">
                        <label className="text-sm opacity-90">View Monthly Report</label>
                        <input 
                            type="month" 
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="input input-bordered w-full mt-2 text-gray-800 dark:text-gray-900"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg opacity-90 mb-2">{selectedMonth} Earnings</h3>
                        <p className="text-5xl font-bold mb-2">৳{selectedMonthEarnings.toLocaleString()}</p>
                        <p className="opacity-90">{selectedMonthTransactions} transactions this month</p>
                    </div>
                </div>
            </div>

            {/* Monthly Line Chart */}
            {monthlyData.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                    <h3 className="text-xl font-bold mb-6 dark:text-white">Monthly Earnings Trend</h3>
                    <div className="overflow-x-auto">
                        <div className="min-h-64 flex items-end gap-2">
                            {monthlyData.map((data) => {
                                const maxAmount = Math.max(...monthlyData.map(d => d.amount), 1);
                                const heightPercent = (data.amount / maxAmount) * 100;
                                return (
                                    <div key={data.month} className="flex-1 flex flex-col items-center">
                                        <div className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-400" style={{height: `${heightPercent}%`, minHeight: '20px'}}></div>
                                        <p className="text-xs mt-2 text-gray-600 dark:text-gray-400 text-center">{new Date(data.month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}</p>
                                        <p className="text-xs font-semibold dark:text-gray-300">৳{(data.amount / 1000).toFixed(0)}k</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Successful Transactions */}
            {payments.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
                    <div className="p-6 border-b dark:border-gray-700">
                        <h3 className="text-xl font-bold dark:text-white">Successful Transaction History</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">All successful payments made by users</p>
                    </div>
                    <table className="w-full">
                        <thead className="bg-gray-200 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left dark:text-gray-300">Transaction ID</th>
                                <th className="px-6 py-3 text-left dark:text-gray-300">Amount</th>
                                <th className="px-6 py-3 text-left dark:text-gray-300">Status</th>
                                <th className="px-6 py-3 text-left dark:text-gray-300">Date</th>
                                <th className="px-6 py-3 text-left dark:text-gray-300">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.slice(0, 20).map((payment) => (
                                <tr key={payment._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 font-mono text-sm dark:text-gray-300">{payment.transactionId}</td>
                                    <td className="px-6 py-4 font-semibold dark:text-gray-300">৳{payment.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className="badge badge-success">Successful</span>
                                    </td>
                                    <td className="px-6 py-4 dark:text-gray-300">{new Date(payment.transactionDate).toLocaleDateString()} {new Date(payment.transactionDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-3 py-1 rounded">
                                            {payment.type || 'Tuition Fee'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
                        Showing {Math.min(20, payments.length)} of {payments.length} total successful transactions
                    </div>
                </div>
            )}

            {payments.length === 0 && (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No successful transactions yet</p>
                </div>
            )}
        </div>
    );
};

export default AdminAnalytics;
