import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

const PopularBlogs = async () => {
    try {
        const res = await fetch("https://pet-care-server-three.vercel.app/api/posts", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch posts");
        }

        const blogs = await res.json();

        return (
            <div className="container mx-auto border border-red-200 p-4 bg-[#FFF9F3] shadow-lg rounded-xl">
                <h1 className="text-3xl font-bold ml-4 mb-4">Popular Articals</h1>
                <div className="space-y-4">
                    {blogs.length > 0 ? (
                        blogs.slice(0, 5).map((blog: any) => (
                            <Link key={blog._id} href={`/blog/${blog._id}`}>
                                <div className="flex gap-4 rounded-lg p-4">
                                    {/* Left Section (Image) */}
                                    <div className="w-2/5 shadow-md">
                                        <Image
                                            src={blog.coverImage} // Using the first image from the images array
                                            alt={blog.title}
                                            width={150}
                                            height={150}
                                            className="rounded-lg object-cover w-full h-full"
                                        />
                                    </div>

                                    {/* Right Section (Content) */}
                                    <div className="w-3/5 flex flex-col justify-between">
                                        {/* Blog Title */}
                                        <h2 className="text:xl font-bold text-gray-800">{blog.title}</h2>

                                        {/* Author Info */}
                                        <p className="text-gray-600 font-bold">By <span className='text-[#F44A72]'>{blog.author.name}</span></p>
                                        <div className="flex items-center gap-4">
                                            <p className="text-gray-500 font-medium">{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No blogs available</p>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="text-center text-red-500">
                <p>Failed to load blogs. Please try again later.</p>
            </div>
        );
    }
};

export default PopularBlogs;
