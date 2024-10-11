"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface Follower {
    _id: string;
    name: string;
    profilePicture: string;
}

const FollowerList = () => {
    const { userId } = useParams(); // Get the userId from the URL
    const [followers, setFollowers] = useState<Follower[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFollowers = async () => {
            if (userId) {
                try {
                    const res = await axios.get(`https://pet-care-server-three.vercel.app/api/users/${userId}/followers`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Auth token from localStorage
                        },
                    });

                    if (res.data && res.data.data) {
                        setFollowers(res.data.data); // Set followers
                    } else {
                        throw new Error("Unable to fetch followers.");
                    }
                } catch (err: any) {
                    setError("Failed to load followers.");
                    console.error("Error fetching followers:", err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchFollowers();
    }, [userId]);

    if (loading) {
        return <p>Loading followers...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Followers</h1>

            {followers.length > 0 ? (
                <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <ul>
                        {followers.map((follower) => (
                            <li
                                key={follower._id}
                                className="flex items-center border-b border-gray-200 p-4"
                            >
                                <img
                                    className="w-10 h-10 rounded-full mr-4"
                                    src={follower.profilePicture}
                                    alt={`${follower.name}'s profile`}
                                />
                                <span className="text-gray-800">{follower.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-gray-500">You have no followers yet.</p>
            )}
        </div>
    );
};

export default FollowerList;
