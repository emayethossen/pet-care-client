// CreatePost.tsx
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic"; // Dynamically import ReactQuill to avoid SSR issues

// Import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Story");
    const [isPremium, setIsPremium] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const router = useRouter();

    // Handle image upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages([...e.target.files]);
        }
    };

    // Handle form submission
    // Before making the Axios request, log the form data
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("isPremium", isPremium ? "true" : "false");
    images.forEach((image) => {
        formData.append("images", image);
    });

    // Log FormData
    for (const pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post("http://localhost:5000/api/posts", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Post created:", response.data);
        router.push("/posts");
    } catch (error) {
        console.error("Error creating post:", error);
    }
};


    return (
        <div className="max-w-4xl mx-auto py-10">
            <h2 className="text-3xl font-semibold mb-6">Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Content</label>
                    <ReactQuill value={content} onChange={setContent} />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="Story">Story</option>
                        <option value="Tip">Tip</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={isPremium}
                            onChange={() => setIsPremium(!isPremium)}
                        />
                        <span>Make this content premium</span>
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Upload Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="mt-1 block w-full"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 text-white bg-blue-600 rounded-md"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
