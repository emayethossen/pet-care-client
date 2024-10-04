"use client"

import { ThumbsDownIcon, ThumbsUp } from "lucide-react";
import PopularBlogs from "../../components/pages/PopularBlogs";
import CategorySlider from "../../components/pages/Category";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/navigation"; // To handle navigation
import Comments from "../../components/pages/Comments";

const BlogDetails = async ({ params }: { params: { id: string } }) => {
    const router = useRouter(); // For navigation
    try {
        const res = await fetch(`http://localhost:5000/api/posts/${params.id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch post: ${res.statusText}`);
        }

        const { data, previousPostId, nextPostId } = await res.json();

        return (
            <div className="container mx-auto md:grid grid-cols-3">
                <div className="col-span-2 py-8 px-4 sm:px-6">
                    {/* Display the image */}
                    {data.images && data.images.length > 0 && (
                        <img
                            src={data.images[0]}
                            alt={data.title}
                            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg mb-4"
                        />
                    )}
                    <h1 className="text-4xl text-center font-bold md:mb-4 mb-2">{data.title}</h1>

                    {/* Author Info */}
                    <div className="flex items-center justify-center md:py-4 gap-4 mb-3">
                        {/* Profile Picture */}
                        <Link href={`/profile/${data.author._id}`}>
                            <Image
                                src={data.author.profilePicture} // Author image
                                alt={data.author.name}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full"
                            />
                        </Link>
                        {/* Author Name and Date */}
                        <p className="text-gray-600 font-bold">
                            By <span className="text-[#F44A72]">{data.author.name}</span>
                        </p>
                        <p className="text-gray-500 font-medium">
                            {format(new Date(data.createdAt), "MMMM dd, yyyy")}
                        </p>
                    </div>

                    {/* Post Content */}
                    <div className="bg-white rounded-lg px-6 space-y-4">
                        <p className="text-gray-700">{data.content}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <p>Author: {data.author.name}</p>
                            <p>Category: {data.category}</p>
                        </div>

                        {/* Upvotes, Downvotes, and Comments Count */}
                        <div className="flex mt-4 justify-between items-center">
                            <div className="flex items-center text-gray-600 space-x-4">
                                {/* Like Count */}
                                <div className="flex items-center">
                                    <ThumbsUp className="w-5 h-5 mr-1" />
                                    <span>{data.upvotes}</span>
                                </div>
                                {/* Dislike Count */}
                                <div className="flex items-center">
                                    <ThumbsDownIcon className="w-5 h-5 mr-1" />
                                    <span>{data.downvotes}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">Comments: {data.comments.length}</p>
                        </div>
                        <Comments postId={params.id} />

                        {/* Previous and Next Buttons */}
                        <div className="flex justify-between mt-6">
                            {previousPostId && (
                                <button
                                    className="bg-gray-300 px-4 py-2 rounded"
                                    onClick={() => router.push(`/blog/${previousPostId}`)}
                                >
                                    Previous
                                </button>
                            )}
                            {nextPostId && (
                                <button
                                    className="bg-gray-300 px-4 py-2 rounded"
                                    onClick={() => router.push(`/blog/${nextPostId}`)}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar with Category and Popular Blogs */}
                <div className="hidden md:block pr-8 py-8">
                    {/* Apply sticky positioning with full height */}
                    <div className="sticky top-20 space-y-8">
                        <CategorySlider />
                        <PopularBlogs />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching blog:", error);
        return <p className="text-center text-red-600">Error fetching blog details. Please try again later.</p>;
    }
};

export default BlogDetails;
