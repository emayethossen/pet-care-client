"use client"; // Ensure this component can use client-side hooks

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('https://pet-care-server-three.vercel.app/api/auth/forgot-password', { email });
            setMessage(response.data.message);
            // Optionally redirect to another page after a successful request
            router.push('/');
        } catch (err: any) {
            setError(err.response?.data.message || 'An error occurred');
        }
    };

    return (

        <div className="container mx-auto fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
                <p className="mb-4 text-center text-gray-600">
                    Enter your email address below, and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input py-2 px-4 rounded bg-gray-100 w-full"
                        required
                    />
                    <input
                        type="submit"
                        value="Send Reset Link"
                        className="p-2 rounded text-white bg-green-500 font-semibold w-full"
                    />
                    {message && (
                        <p className="mt-4 text-center text-green-500">{message}</p>
                    )}
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
