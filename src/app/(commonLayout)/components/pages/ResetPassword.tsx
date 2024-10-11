"use client"; // Ensure this component can use client-side hooks

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Use next/navigation instead

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter(); // Initialize router for navigation

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const token = window.location.pathname.split('/').pop(); // Extract token from URL

        try {
            const response = await axios.post(`https://pet-care-server-three.vercel.app/api/auth/reset-password/${token}`, { password: newPassword });
            setSuccess(response.data.message);

            // Optionally redirect the user after successful password reset
            // router.push('/login'); // Uncomment to redirect
        } catch (err: any) {
            setError(err.response?.data.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default ResetPassword;
