// components/ProfileUpdate.tsx
import React, { useState } from 'react';
import axios from 'axios';

const ProfileUpdate = () => {
    const [name, setName] = useState('');
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }

        const token = localStorage.getItem('token');
        try {
            await axios.put('http://localhost:5000/api/users/me', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error.response.data);
        }
    };

    return (
        <form onSubmit={handleUpdateProfile} className="max-w-md mx-auto mt-10 space-y-4">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded p-2 w-full"
            />
            <input
                type="file"
                onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
                className="border rounded p-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                Update Profile
            </button>
        </form>
    );
};

export default ProfileUpdate;
