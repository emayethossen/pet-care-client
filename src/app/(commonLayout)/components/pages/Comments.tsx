"use client"

import { useState } from "react";

const Comments = ({ postId }: { postId: string }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<string[]>([]); // Assuming comments is an array of strings, adjust as necessary.
    const [loading, setLoading] = useState(false);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify({ comment }),
            });
            if (!res.ok) throw new Error("Failed to post comment");
            const { data } = await res.json();
            setComments([...comments, data]);
            setComment("");
        } catch (error) {
            console.error("Error submitting comment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Write a comment..."
                    rows={4}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    disabled={loading || !comment.trim()}
                >
                    {loading ? "Posting..." : "Post Comment"}
                </button>
            </form>
            <div>
                {comments.length > 0 ? (
                    <ul className="space-y-4">
                        {comments.map((comment, index) => (
                            <li key={index} className="border-b pb-4">
                                {comment}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
};

export default Comments;
