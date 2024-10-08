"use client";

import React, { useEffect, useState } from 'react';

const AdminContentManagement = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user content
    const fetchContent = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/admin/content', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`, // Assuming token is stored in localStorage
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch content.');
            }
            const data = await response.json();
            setContent(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    if (loading) {
        return <div>Loading content...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">User Content Management</h2>
            {content.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
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
                                <tr key={item._id} className="border-b">
                                    <td className="p-3">{item.title}</td>
                                    <td className="p-3">{item.author.name}</td>
                                    <td className="p-3">{item.isPublished ? 'Yes' : 'No'}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handlePublish(item._id, !item.isPublished)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            {item.isPublished ? 'Unpublish' : 'Publish'}
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
