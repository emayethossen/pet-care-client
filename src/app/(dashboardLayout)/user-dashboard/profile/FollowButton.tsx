// components/FollowButton.tsx
import React, { useState } from 'react';
import axios from 'axios';

const FollowButton = ({ userId }: { userId: string }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/api/users/follow', { userId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsFollowing(true);
        } catch (error) {
            console.error('Error following user:', error.response.data);
        }
    };

    const handleUnfollow = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/api/users/unfollow', { userId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsFollowing(false);
        } catch (error) {
            console.error('Error unfollowing user:', error.response.data);
        }
    };

    return (
        <button
            onClick={isFollowing ? handleUnfollow : handleFollow}
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    );
};

export default FollowButton;
