import { ThumbsDownIcon, ThumbsUp } from "lucide-react";

const BlogDetails = async ({ params }: { params: { id: string } }) => {
    try {
        const res = await fetch(`http://localhost:5000/api/posts/${params.id}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch post: ${res.statusText}`);
        }

        const { data } = await res.json(); // Corrected: Fetching data from the response

        console.log("params", params);
        console.log("data", data); // Check the response data in the console

        return (
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
                
                {/* Display the image */}
                {data.images && data.images.length > 0 && (
                    <img
                        src={data.images[0]} // Display the first image
                        alt={data.title}
                        className="w-full h-96 object-cover mb-4"
                    />
                )}

                {/* Post Content */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <p className="text-gray-700 mb-4">{data.content}</p>
                    <div className="flex justify-between items-center">
                        {/* Safely accessing post.author */}
                        <p className="text-sm text-gray-500">
                            Author: {data.author.name}
                        </p>
                        <p className="text-sm text-gray-500">Category: {data.category}</p>
                    </div>

                    {/* Upvotes, Downvotes, and Comments Count */}
                    <div className="flex mt-4">
                    <div className="flex items-center text-gray-600 space-x-4 mr-6">
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
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching blog:", error);
        return <p>Error fetching blog details. Please try again later.</p>;
    }
};

export default BlogDetails;
