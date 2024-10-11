"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface EditPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (updatedPost: { title: string; content: string; coverImage: string; category: string; isPremium: boolean }) => void;
    postData: { title: string; content: string; coverImage: string; category: string; isPremium: boolean } | null;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ isOpen, onClose, onSubmit, postData }) => {
    const [title, setTitle] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Tip');
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        if (postData) {
            setTitle(postData.title);
            setCoverImage(postData.coverImage);
            setContent(postData.content);
            setCategory(postData.category);
            setIsPremium(postData.isPremium);
        }
    }, [postData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, content, coverImage, category, isPremium });
    };

    if (!isOpen) return null;

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'code-block'],
            ['clean'],
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'color', 'background', 'align', 'code-block',
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Edit Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="title">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border rounded w-full p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="coverImage">Cover Image URL</label>
                        <input
                            type="text"
                            value={coverImage}
                            onChange={(e) => setCoverImage(e.target.value)}
                            className="border rounded w-full p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="content">Content</label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="category">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border rounded w-full p-2"
                        >
                            <option value="Tip">Tip</option>
                            <option value="Story">Story</option>
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label>
                            <input
                                type="checkbox"
                                checked={isPremium}
                                onChange={(e) => setIsPremium(e.target.checked)}
                            />
                            Premium Content
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-2 bg-gray-300 text-gray-800 py-1 px-3 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-1 px-3 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPostModal;
