"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router for navigation
import { toast } from "react-toastify";

const UserProfile = ({ params }: { params: { userId: string } }) => {
    const [profileData, setProfileData] = useState<any>(null);
    const [currentUser, setCurrentUser] = useState<any>(null); // Store the logged-in user's profile data
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter(); // Initialize Next.js router for navigation

    // Fetch the logged-in user's profile
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch current user: ${res.statusText}`);
                }

                const { data } = await res.json();
                setCurrentUser(data);

                // After fetching the current user, fetch the other user's profile
                await fetchProfileData(data._id); // Pass the current user's ID to check follow status
            } catch (err) {
                console.error("Error fetching current user:", err);
                setError("Error fetching your profile. Please try again later.");
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    // Fetch the profile data of the user being visited
    const fetchProfileData = async (currentUserId: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/${params.userId}`, {
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch profile: ${res.statusText}`);
            }

            const { data } = await res.json();
            setProfileData(data);

            // Check if the current user is following this profile user
            if (data?.followers.includes(currentUserId)) {
                setIsFollowing(true);
            }
            setLoading(false);
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError("Error fetching profile details. Please try again later.");
            setLoading(false);
        }
    };

    // Handle follow user
    const handleFollow = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/users/follow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify({ followUserId: params.userId }),
            });

            if (!res.ok) {
                throw new Error("Failed to follow user");
            }

            setIsFollowing(true);
            toast.success("You are now following this user.");
            setProfileData((prev: any) => ({
                ...prev,
                followers: [...prev.followers, currentUser._id],
            }));
        } catch (error) {
            console.error("Error following user:", error);
            toast.error("Failed to follow the user.");
        }
    };

    // Handle unfollow user
    const handleUnfollow = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/users/unfollow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify({ unfollowUserId: params.userId }), // Correct key 'unfollowUserId'
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Unfollow API error details:", errorData);
                throw new Error("Failed to unfollow user");
            }

            setIsFollowing(false);
            toast.success("You have unfollowed this user.");
            setProfileData((prev: any) => ({
                ...prev,
                followers: prev.followers.filter((id: string) => id !== currentUser._id),
            }));
        } catch (error) {
            console.error("Error unfollowing user:", error);
            toast.error("Failed to unfollow the user.");
        }
    };


    // Redirect to the user's posts page
    const goToPostsPage = () => {
        router.push(`/users/${params.userId}/posts`); // Assumes you have a posts page for the user
    };

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <div className="max-w-md mx-auto my-10 bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex flex-col items-center p-5">
                    <img
                        className="w-24 h-24 rounded-full border-2 border-gray-300"
                        src={profileData?.profilePicture || "/assets/logo.png"}
                        alt="Profile Picture"
                    />
                    <h1 className="mt-4 text-2xl font-bold text-gray-800">{profileData?.name}</h1>
                    <p className="mt-2 text-gray-600 text-center px-4">{profileData?.bio || "Pet Lover"}</p>
                    <div className="flex space-x-4 mt-4">
                        <div className="text-center">
                            <span className="font-bold text-gray-800">{profileData?.followers?.length || 0}</span>
                            <p onClick={() => router.push(`/profile/${params.userId}/followers`)} className="text-gray-500 text-sm">Followers</p>
                        </div>
                        <div className="text-center">
                            <span className="font-bold text-gray-800">{profileData?.following?.length || 0}</span>
                            <p onClick={() => router.push(`/profile/${params.userId}/following`)} className="text-gray-500 text-sm">Following</p>
                        </div>
                    </div>
                    <p className="text-gray-600">
                        Member since: {new Date(profileData?.createdAt).toLocaleDateString()}
                    </p>
                    <div className="mt-4 text-gray-600">
                        <p className="text-sm">Email: {profileData?.email}</p>
                        <p className="text-sm">Phone: {profileData?.phone}</p>
                    </div>

                    {/* Follow/Unfollow button */}
                    {isFollowing ? (
                        <button
                            className="mt-6 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                            onClick={handleUnfollow}
                        >
                            Unfollow
                        </button>
                    ) : (
                        <button
                            className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                            onClick={handleFollow}
                        >
                            Follow
                        </button>
                    )}

                    {/* Posts button */}
                    <button
                        className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                        onClick={goToPostsPage}
                    >
                        View Posts
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
