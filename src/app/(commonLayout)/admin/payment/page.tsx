"use client";

import React, { useEffect, useState } from 'react';

// Define a type for the payment data
interface Payment {
    _id: string;
    userId: { name: string };
    postId: { title: string };
    amount: number;
    currency: string;
    paymentStatus: string;
    createdAt: string;
}

const AdminPaymentHistory: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('https://pet-care-server-three.vercel.app/api/admin/payments', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Use your auth method
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch payment history.');
                }

                const data: Payment[] = await response.json();
                setPayments(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="md:text-2xl text-xl text-center font-bold mb-4">Payment History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">User</th>
                            <th className="py-3 px-6 text-left">Post</th>
                            <th className="py-3 px-6 text-left">Amount</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {payments.map((payment) => (
                            <tr key={payment._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6">{payment.userId?.name}</td>
                                <td className="py-3 px-6">{payment.postId?.title}</td>
                                <td className="py-3 px-6">{(payment.amount / 100).toFixed(2)} {payment.currency}</td> {/* Assuming amount is in cents */}
                                <td className="py-3 px-6">{payment.paymentStatus}</td>
                                <td className="py-3 px-6">{new Date(payment.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPaymentHistory;
