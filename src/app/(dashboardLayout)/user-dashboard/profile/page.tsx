"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        followers: [],
        following: [],
    });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetch user details using `fetch` API
    const fetchUserDetails = async () => {
        const token = localStorage.getItem("authToken");
console.log(token)
        if (!token) {
            router.push("/login"); // Redirect if no token
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/users/me", {
                cache: "no-store", // Ensures the data is not cached
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res)

            if (!res.ok) {
                throw new Error("Failed to fetch user profile");
            }

            const userData = await res.json();
            const { name, email, phone, followers, following } = userData;
            setUser({ name, email, phone, followers, following });
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Display loading state
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="flex justify-between items-center">
                {/* Profile Info */}
                <div className="flex items-center space-x-4">
                    {/* <img
                        src="/path/to/default-profile.jpg" // Update with the profile picture
                        alt="Profile Picture"
                        className="rounded-full h-20 w-20 object-cover"
                    /> */}Picture
                    <div>
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-gray-600">{user.phone}</p>
                    </div>
                </div>
                {/* Edit Profile Button */}
                <button
                    onClick={() => router.push("/edit-profile")}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                    Edit Profile
                </button>
            </div>

            {/* Followers/Following */}
            <div className="flex justify-start space-x-8 mt-4">
                <div className="text-center">
                    <p className="text-xl font-bold">20</p>
                    <p className="text-gray-600">Followers</p>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold">20</p>
                    <p className="text-gray-600">Following</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
