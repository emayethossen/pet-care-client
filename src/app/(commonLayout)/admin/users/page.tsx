"use client"

import React, { useEffect, useState } from 'react';

const AdminUserList: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPromoting, setIsPromoting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch all users
    const fetchUsers = async () => {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) {
            setError('No authorization token found. Please log in.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users: ' + response.statusText);
            }
            const data = await response.json();
            setUsers(data.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handlePromoteUser = async (userId: string) => {
        setIsPromoting(true);
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/promote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to promote user.');
            }
            alert('User promoted to admin successfully!');
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Failed to promote user:', error);
            alert('Failed to promote user to admin.');
        } finally {
            setIsPromoting(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setIsDeleting(true);
            try {
                const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to delete user.');
                }
                alert('User deleted successfully!');
                fetchUsers(); // Refresh the user list
            } catch (error) {
                console.error('Failed to delete user:', error);
                alert('Failed to delete user.');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Loadinggg......
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl font-semibold text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <h2 className="md:text-2xl text-xl font-semibold mb-4">User Management</h2>
            {users && users.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 border-b md:grid grid-cols-5">
                                <th className="p-3 hidden md:flex justify-center items-center text-center text-sm font-semibold text-gray-700">ID</th>
                                <th className="p-3 text-center text-sm font-semibold text-gray-700">Name</th>
                                <th className="p-3 hidden md:flex justify-center items-center text-center text-sm font-semibold text-gray-700">Email</th>
                                <th className="p-3 hidden md:flex justify-center items-center text-center text-sm font-semibold text-gray-700">Role</th>
                                <th className="p-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="md:grid grid-cols-5">
                                    <td className="p-3 hidden md:block text-center text-sm text-gray-700">{user._id}</td>
                                    <td className="p-3 text-center text-sm text-gray-700">{user.name}</td>
                                    <td className="p-3 hidden md:block text-center text-sm text-gray-700">{user.email}</td>
                                    <td className="p-3 hidden md:block text-center text-sm text-gray-700">{user.role}</td>
                                    <td className="text-center text-sm text-gray-700 grid md:grid-cols-2 justify-center items-center md:space-x-2 space-y-2">
                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() => handlePromoteUser(user._id)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                                                disabled={isPromoting}
                                            >
                                                {isPromoting ? 'Promoting...' : 'Promote'}
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
                                            disabled={isDeleting}
                                        >
                                            {isDeleting ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-lg">No users found.</p>
            )}
        </div>
    );
};

export default AdminUserList;
