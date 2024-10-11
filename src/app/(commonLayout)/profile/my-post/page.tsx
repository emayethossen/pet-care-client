"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import EditPostModal from '../../components/pages/EditPostModal';
import ConfirmationModal from '@/app/utils/ComfirmationModal';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';

interface Post {
    _id: string;
    title: string;
    content: string;
    coverImage: string; 
    category: string;
    isPremium: boolean;
    createdAt: string;
}

const MyPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState<Post | null>(null);
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://pet-care-server-three.vercel.app/api/my-posts', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setPosts(response.data);
            } catch (err: any) {
                setError('Failed to fetch posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleEditClick = (post: Post) => {
        setCurrentPost(post);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentPost(null);
    };

    const handleUpdatePost = async (updatedPost: { title: string; content: string; coverImage: string; category: string; isPremium: boolean }) => {
        if (currentPost) {
            try {
                await axios.put(`https://pet-care-server-three.vercel.app/api/posts/${currentPost._id}`, updatedPost, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post._id === currentPost._id ? { ...post, ...updatedPost } : post
                    )
                );
                toast.success("Post updated successfully!"); // Show success toast
                handleCloseModal();
            } catch (err: any) {
                setError('Failed to update post. Please try again.');
            }
        }
    };

    const handleOpenConfirmationModal = (postId: string) => {
        setPostToDelete(postId);
        setConfirmationModalOpen(true);
    };

    const handleCloseConfirmationModal = () => {
        setConfirmationModalOpen(false);
        setPostToDelete(null);
    };

    const handleDeletePost = async () => {
        if (postToDelete) {
            try {
                await axios.delete(`https://pet-care-server-three.vercel.app/api/posts/${postToDelete}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                // Remove the post from local state
                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postToDelete));
                toast.success("Post deleted successfully!");
            } catch (err: any) {
                setError('Failed to delete post. Please try again.');
            } finally {
                handleCloseConfirmationModal();
            }
        }
    };

    const truncateContent = (content: string, maxLength: number) => {
        if (typeof window !== 'undefined') {
            const plainText = new DOMParser().parseFromString(content, 'text/html').body.textContent || '';
            return plainText.length > maxLength ? plainText.substring(0, maxLength) + "..." : plainText;
        }
        // Fallback for SSR
        return content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
    };

    if (loading) {
        return <p>Loading your posts...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold text-center mb-6">My Posts</h1>

            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                            <p className="text-gray-700 mb-4">
                                {truncateContent(post.content, 100)}
                            </p>
                            <p className="text-gray-500 text-sm">Created on: {new Date(post.createdAt).toLocaleDateString()}</p>
                            <div className="flex justify-between mt-4">
                                <Link href={`/blog/${post._id}`}
                                    className="bg-gradient-to-r from-[#F95C6B] to-[#E51284] text-white rounded-md font-semibold hover:from-red-200 hover:to-red-400 px-4 py-2"
                                >
                                    View Post
                                </Link>
                                <div className='space-x-2'>
                                    <button
                                        onClick={() => handleEditClick(post)}
                                        className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-yellow-600"
                                    >
                                        <Edit />
                                    </button>
                                    <button
                                        onClick={() => handleOpenConfirmationModal(post._id)}
                                        className="px-2 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                                    >
                                        <Trash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">You haven't created any posts yet.</p>
            )}

            {/* Edit Post Modal */}
            <EditPostModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleUpdatePost}
                postData={currentPost ? {
                    title: currentPost.title,
                    content: currentPost.content,
                    coverImage: currentPost.coverImage,
                    category: currentPost.category,
                    isPremium: currentPost.isPremium,
                } : null}
            />

            {/* Confirmation Modal */}
            {isConfirmationModalOpen && (
                <ConfirmationModal
                    onConfirm={handleDeletePost}
                    onCancel={handleCloseConfirmationModal}
                />
            )}
        </div>
    );
};

export default MyPosts;
