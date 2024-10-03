'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditProfileModal from './EditProfileModal'; // Import the modal
import { toast } from 'react-toastify';

interface UserProfile {
    name: string;
    email: string;
    role: string;
    bio: string;
    phone: string;
    profilePicture: string;
    followers: [];
    following: [];
    createdAt: string;
}

const Profile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Send token
                    },
                });
                setProfile(response.data?.data); // Set user profile data
            } catch (err: any) {
                setError('Failed to load profile data.');
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleEditClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (data: { name: string; bio: string; phone: string }) => {
        try {
            const response = await axios.put('http://localhost:5000/api/users/me', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Send token
                },
            });
            setProfile(response.data.data); // Update profile with new data
            toast.success("Profile updated successfully!");
            handleCloseModal(); // Close modal after successful update
        } catch (err: any) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile.');
        }
    };

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>

            {profile ? (
                <div className="max-w-md mx-auto my-10 bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex flex-col items-center p-5">
                        <img className="w-24 h-24 rounded-full border-2 border-gray-300" src={profile.profilePicture} alt="Profile Picture" />
                        <h1 className="mt-4 text-2xl font-bold text-gray-800">{profile.name}</h1>
                        <p className="mt-2 text-gray-600 text-center px-4">{profile.bio || "Pet Lover"}</p>
                        <div className="flex space-x-4 mt-4">
                            <div className="text-center">
                                <span className="font-bold text-gray-800">{profile.followers.length}</span>
                                <p className="text-gray-500 text-sm">Followers</p>
                            </div>
                            <div className="text-center">
                                <span className="font-bold text-gray-800">{profile.following.length}</span>
                                <p className="text-gray-500 text-sm">Following</p>
                            </div>
                        </div>
                        <p className="text-gray-600">Member since: {new Date(profile.createdAt).toLocaleDateString()}</p>
                        <div className="mt-4 text-gray-600">
                            <p className="text-sm">Email: {profile.email}</p>
                            <p className="text-sm">Phone: {profile.phone}</p>
                        </div>
                        <button 
                            className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                            onClick={handleEditClick}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">No profile data available.</p>
            )}

            {/* Modal */}
            <EditProfileModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                formData={profile ? { name: profile.name, bio: profile.bio, phone: profile.phone } : null}
            />
        </div>
    );
};

export default Profile;
