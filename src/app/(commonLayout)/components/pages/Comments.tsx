"use client";
import ConfirmationModal from "@/app/utils/ComfirmationModal";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

interface Comment {
    _id: string;
    content: string;
    author: {
        username: string;
    };
    createdAt: string;
}

const Comments = ({ postId }: { postId: string }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`https://pet-care-server-three.vercel.app/api/posts/${postId}/comments`);
                if (!res.ok) throw new Error("Failed to fetch comments");
                const { data } = await res.json();
                setComments(data);
            } catch (error) {
                console.error("Error fetching comments:", error);
                toast.error("Failed to load comments");
            }
        };

        fetchComments();
    }, [postId]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`https://pet-care-server-three.vercel.app/api/posts/${postId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify({ content: comment }),
            });

            if (!res.ok) throw new Error("Failed to post comment");

            const { data } = await res.json();
            setComments([...comments, data]);
            setComment("");
            toast.success("Comment posted successfully!");
        } catch (error) {
            console.error("Error submitting comment:", error);
            toast.error("Failed to post comment");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (comment: Comment) => {
        setEditingCommentId(comment._id);
        setComment(comment.content);
    };

    const openModal = (commentId: string) => {
        setCommentToDelete(commentId);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async () => {
        if (!commentToDelete) return;

        try {
            const res = await fetch(`https://pet-care-server-three.vercel.app/api/comments/${commentToDelete}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            if (!res.ok) throw new Error("Failed to delete comment");

            setComments(comments.filter(comment => comment._id !== commentToDelete));
            toast.success("Comment deleted successfully!");
        } catch (error) {
            console.error("Error deleting comment:", error);
            toast.error("Failed to delete comment");
        } finally {
            setIsModalOpen(false);
            setCommentToDelete(null);
        }
    };

    const handleUpdateComment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`https://pet-care-server-three.vercel.app/api/comments/${editingCommentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify({ content: comment }),
            });

            if (!res.ok) throw new Error("Failed to update comment");

            const updatedComment = await res.json();
            setComments(comments.map(c => (c._id === updatedComment._id ? updatedComment : c)));
            setComment("");
            setEditingCommentId(null);
            toast.success("Comment updated successfully!");
        } catch (error) {
            console.error("Error updating comment:", error);
            toast.error("Failed to update comment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <form onSubmit={editingCommentId ? handleUpdateComment : handleCommentSubmit} className="mb-4">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write a comment..."
                    rows={4}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition"
                    disabled={loading || !comment.trim()}
                >
                    {loading ? (editingCommentId ? "Updating..." : "Posting...") : (editingCommentId ? "Update Comment" : "Post Comment")}
                </button>
            </form>

            {/* Display Comments */}
            <div>
                {comments.length > 0 ? (
                    <ul className="space-y-4">
                        {comments.map((comment) => (
                            <li key={comment._id} className="border-b pb-4 mb-4">
                                <div className="flex items-center justify-between">
                                    <strong className="text-lg">{comment.author.username}</strong>
                                    <span className="text-gray-500 text-sm">
                                        {new Date(comment.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <p className="mt-1 text-gray-700">{comment.content}</p>
                                <div className="mt-2 flex space-x-2">
                                    <button
                                        onClick={() => handleEditClick(comment)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => openModal(comment._id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No comments yet. Be the first to comment!</p>
                )}
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <ConfirmationModal
                    onConfirm={handleDeleteClick}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Comments;
