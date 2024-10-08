"use client";

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Author {
    _id: string;
    name: string;
    profilePicture: string;
}

interface Blog {
    _id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
    coverImage: string;
    author: Author;
    upvotes: number;
    downvotes: number;
    isPremium: boolean;
}

const BlogCard = ({ blog }: { blog: Blog }) => {
    const [truncatedContent, setTruncatedContent] = useState('');
    const router = useRouter();

    useEffect(() => {
        const truncateContent = (content: string, maxLength: number) => {
            if (typeof window !== 'undefined') {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = content;

                const plainText = tempDiv.textContent || '';
                return plainText.length > maxLength ? plainText.substring(0, maxLength) + "..." : plainText;
            }
            return content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
        };

        setTruncatedContent(truncateContent(blog.content, 180));
    }, [blog.content]);

    const handleReadMore = () => {
        if (blog.isPremium) {
            const confirmPayment = window.confirm("This content is premium and requires payment. Would you like to proceed?");
            if (confirmPayment) {
                // Redirect to payment page with the postId
                router.push(`/payment?postId=${blog._id}`); // Pass postId as a query parameter
            }
        } else {
            // Redirect to the blog post page
            router.push(`/blog/${blog._id}`);
        }
    };

    return (
        <div className="md:flex text-center md:text-left gap-8 rounded-lg p-4">
            <div className="w-1/3 shadow-md">
                <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    width={150} 
                    height={150}
                    className="rounded-lg object-cover w-full h-full"
                />
            </div>

            <div className="md:w-2/3 w-full pl-4 md:flex flex-col justify-between space-y-4">
                <h2 className="md:text-3xl text:xl font-bold text-gray-800 mb-2">
                    {blog.title}
                    {blog.isPremium && (
                        <span className="ml-2 bg-yellow-500 text-white text-xs font-bold px-2 rounded">
                            Premium
                        </span>
                    )}
                </h2>

                <div className="flex items-center gap-4 mb-3">
                    <Link href={`/profile/${blog.author._id}`}>
                        <Image
                            src={blog.author.profilePicture}
                            alt={blog.author.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full"
                        />
                    </Link>
                    <p className="text-gray-600 font-bold">By <span className='text-[#F44A72]'>{blog.author.name}</span></p>
                    <p className="text-gray-500 font-medium">{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</p>
                </div>

                <p className="text-gray-700 mb-4 font-medium">
                    {truncatedContent}
                </p>

                <div className="flex justify-between items-center">
                    <button
                        onClick={handleReadMore}
                        className="py-3 px-6 bg-gradient-to-r from-[#F95C6B] to-[#E51284] text-white rounded-md font-semibold hover:from-red-200 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Read More
                    </button>

                    <div className="flex items-center text-gray-600 space-x-4 mr-6">
                        <div className="flex items-center">
                            <ThumbsUp className="w-5 h-5 mr-1" />
                            <span>{blog.upvotes}</span>
                        </div>
                        <div className="flex items-center">
                            <ThumbsDown className="w-5 h-5 mr-1" />
                            <span>{blog.downvotes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
