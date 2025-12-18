import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';

const Checkout = () => {
    useEffect(() => {
    document.title = 'eTuitionBD - Checkout';
  }, []);
    const { applicationId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [application, setApplication] = useState(null);
    const [tuition, setTuition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const fetchApplicationDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/applications/${applicationId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                console.log('Application data:', response.data.application);
                setApplication(response.data.application);

                // Fetch tuition details using tuitionId from application
                const tuitionId = response.data.application.tuitionId;
                console.log('Fetching tuition with ID:', tuitionId);
                
                const tuitionRes = await axios.get(
                    `http://localhost:5000/api/tuitions/${tuitionId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                console.log('Tuition data:', tuitionRes.data.tuition);
                setTuition(tuitionRes.data.tuition);
            } catch (error) {
                console.error('Error fetching details:', error.response?.data || error.message);
                toast.error('Error loading checkout details: ' + (error.response?.data?.message || error.message));
                navigate('/student-dashboard/applied-tutors');
            } finally {
                setLoading(false);
            }
        };
        fetchApplicationDetails();
    }, [applicationId, navigate]);

    const handlePayment = async () => {
        setProcessing(true);
        try {
            // Record payment transaction (this also updates application status to Approved)
            await axios.post(
                'http://localhost:5000/api/payments',
                {
                    applicationId,
                    tutorId: application.tutorId,
                    amount: application.expectedSalary,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            toast.success('Payment successful! Tutor has been approved.');
            navigate('/student-dashboard/my-tuitions');
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Error processing payment. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!application || !tuition) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Unable to load checkout details</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-4xl font-bold text-center mb-2">Secure Checkout</h1>
                    <p className="text-center text-gray-600 mb-8">Complete your payment to approve this tutor</p>

                    {/* Tuition Details */}
                    <div className="border-b-2 pb-6 mb-6">
                        <h2 className="text-xl font-bold mb-4">Tuition Details</h2>
                        <div className="grid grid-cols-2 gap-4 text-gray-700">
                            <div>
                                <p className="font-semibold">Subject</p>
                                <p className="text-lg">{tuition.subject}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Class</p>
                                <p className="text-lg">{tuition.class}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Location</p>
                                <p className="text-lg">{tuition.location}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Budget</p>
                                <p className="text-lg">৳{tuition.budget}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tutor Details */}
                    <div className="border-b-2 pb-6 mb-6">
                        <h2 className="text-xl font-bold mb-4">Tutor Details</h2>
                        <div className="space-y-3 text-gray-700">
                            <div>
                                <p className="font-semibold">Name</p>
                                <p className="text-lg">{application.tutorName}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Email</p>
                                <p className="text-lg">{application.tutorEmail}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Qualifications</p>
                                <p className="text-lg">{application.qualifications}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Experience</p>
                                <p className="text-lg">{application.experience} years</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-8">
                        <p className="text-gray-600 text-sm font-semibold mb-2">PAYMENT AMOUNT</p>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-5xl font-bold text-blue-600">
                                    ৳{application.expectedSalary}
                                </p>
                                <p className="text-gray-600 mt-2">Expected Salary / Tutor Fee</p>
                            </div>
                            <div className="text-right text-green-600">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="font-semibold mt-2">Ready to Pay</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                        <p className="text-sm text-blue-800">
                            <strong>Note:</strong> This is a demonstration payment system for project purposes. Upon clicking "Pay", 
                            the tutor will be approved and payment will be recorded in your transaction history.
                        </p>
                    </div>

                    {/* Pay Button */}
                    <div className="flex gap-4">
                        <button
                            onClick={handlePayment}
                            disabled={processing}
                            className="btn btn-primary btn-lg flex-1"
                        >
                            {processing ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Processing...
                                </>
                            ) : (
                                'Pay ৳' + application.expectedSalary
                            )}
                        </button>
                        <button
                            onClick={() => navigate('/student-dashboard/applied-tutors')}
                            disabled={processing}
                            className="btn btn-outline btn-lg flex-1"
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Security Info */}
                    <div className="mt-8 pt-6 border-t text-center text-gray-600 text-sm">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Secure Payment
                        </div>
                        <p>Your information is encrypted and secure</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
