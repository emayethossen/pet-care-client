'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import Image from 'next/image';
import LoadingSpinner from '../../components/pages/LoadingSpinner';
import EditProfileModal from '../../components/pages/EditProfileModal';

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
    const DEFAULT_AVATAR_URL = 'https://i.ibb.co.com/0jPH8hR/avatardefault-92824.png'
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('https://pet-care-server-three.vercel.app/api/users/me', {
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

    const handleSubmit = async (data: { name: string; bio: string; phone: string; profilePicture?: string }) => {
        const updatedData = {
            name: data.name,
            bio: data.bio,
            phone: data.phone,
            profilePicture: data.profilePicture, // This should be the URL string
        };

        try {
            const response = await axios.put('https://pet-care-server-three.vercel.app/api/users/me', updatedData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            setProfile(response.data.data); // Update the profile with new data
            toast.success("Profile updated successfully!"); // Show success toast
            handleCloseModal(); // Close the modal after successful update
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error("Failed to update profile."); // Show error toast
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>

            {profile ? (
                <div className="max-w-md mx-auto my-10 bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex flex-col items-center p-5">
                        <Image
                            className="w-24 h-24 rounded-full border-2 border-gray-300"
                            src={profile.profilePicture || DEFAULT_AVATAR_URL}
                            alt="Profile Picture"
                            width={96}
                            height={96} 
                        />
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
                formData={profile ? { name: profile.name, bio: profile.bio, phone: profile.phone, profilePicture: profile.profilePicture } : null}
            />
        </div>
    );
};

export default Profile;
