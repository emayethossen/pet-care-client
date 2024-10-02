import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:5000/api/user/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>No user data found</p>;

    return (
        <div>
            <h1>{user.name}'s Profile</h1>
            <img src={user.profilePicture || '/default-avatar.png'} alt="Profile" />
            <p>Email: {user.email}</p>
            <p>Posts: {user.posts.length}</p>
            <p>Followers: {user.followers.length}</p>
            <p>Following: {user.following.length}</p>

            {/* Profile Update Form can go here */}
        </div>
    );
};

export default ProfilePage;
