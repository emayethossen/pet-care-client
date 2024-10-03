// app/my-posts/page.tsx (Next.js App Router)
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Post {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

const MyPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    // Fetch the user's posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/my-posts', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Send token to authenticate
                    },
                });
                setPosts(response.data); // Set posts
            } catch (err: any) {
                setError('Failed to fetch posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <p>Loading your posts...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">My Posts</h1>

            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                            <p className="text-gray-700 mb-4">{post.content.substring(0, 100)}...</p>
                            <p className="text-gray-500 text-sm">Created on: {new Date(post.createdAt).toLocaleDateString()}</p>
                            <button
                                onClick={() => router.push(`/blog/${post._id}`)}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                View Post
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">You haven't created any posts yet.</p>
            )}
        </div>
    );
};

export default MyPosts;
