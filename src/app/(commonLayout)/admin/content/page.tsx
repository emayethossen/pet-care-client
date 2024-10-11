"use client";

import React, { useEffect, useState } from 'react';
import LoadingSkeleton from '../../components/pages/LoadingSkeleton';

interface ContentItem {
    _id: string;
    title: string;
    author: {
        name: string;
    };
    isPublished: boolean;
}

const AdminContentManagement: React.FC = () => {
    const [content, setContent] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch user content
    const fetchContent = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://pet-care-server-three.vercel.app/api/admin/content', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch content.');
            }
            const data = await response.json();
            setContent(data.data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Delete content by ID
    const deleteContent = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`https://pet-care-server-three.vercel.app/api/admin/content/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to delete content: ${errorMessage}`);
            }

            // Update state to remove the deleted content
            setContent(prevContent => prevContent.filter(item => item._id !== id));
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    if (loading) {
        return <div className="text-center"><LoadingSkeleton /></div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="md:text-2xl text-xl text-center font-bold mb-4">User Content</h2>
            {content.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">Title</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">Author</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">Published</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.map((item) => (
                                <tr key={item._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{item.title}</td>
                                    <td className="p-3">{item.author.name}</td>
                                    <td className="p-3">{item.isPublished ? 'Yes' : 'No'}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => deleteContent(item._id)}
                                            className={`px-4 py-2 text-white rounded focus:outline-none ${item.isPublished ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-lg">No content found.</p>
            )}
        </div>
    );
};

export default AdminContentManagement;
