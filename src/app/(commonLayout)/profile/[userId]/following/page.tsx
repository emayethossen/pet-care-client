"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface Following {
    _id: string;
    name: string;
    profilePicture: string;
}

const FollowingList = () => {
    const { userId } = useParams(); // Get the userId from the URL
    const [following, setFollowing] = useState<Following[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFollowing = async () => {
            if (userId) {
                try {
                    const res = await axios.get(`https://pet-care-server-three.vercel.app/api/users/${userId}/following`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Auth token from localStorage
                        },
                    });

                    if (res.data && res.data.data) {
                        setFollowing(res.data.data); // Set following
                    } else {
                        throw new Error("Unable to fetch following list.");
                    }
                } catch (err: any) {
                    setError("Failed to load following list.");
                    console.error("Error fetching following:", err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchFollowing();
    }, [userId]);

    if (loading) {
        return <p>Loading following list...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Following</h1>

            {following.length > 0 ? (
                <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <ul>
                        {following.map((user) => (
                            <li
                                key={user._id}
                                className="flex items-center border-b border-gray-200 p-4"
                            >
                                <img
                                    className="w-10 h-10 rounded-full mr-4"
                                    src={user.profilePicture}
                                    alt={`${user.name}'s profile`}
                                />
                                <span className="text-gray-800">{user.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-gray-500">You are not following anyone yet.</p>
            )}
        </div>
    );
};

export default FollowingList;
