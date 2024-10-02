import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const BlogCard = ({ blog }) => {
    console.log(blog.images);
    return (
        <div className="md:flex text-center md:text-left gap-8 rounded-lg p-4">
            {/* Left Section (Image) */}
            <div className="w-1/3 shadow-md">
                <Image
                    src={blog.images[0]} // Using the first image from the images array
                    alt={blog.title}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover w-full h-full"
                />
            </div>

            {/* Right Section (Content) */}
            <div className="md:w-2/3 w-full pl-4 md:flex flex-col justify-between space-y-4">
                {/* Blog Title */}
                <h2 className="md:text-3xl text:xl font-bold text-gray-800 mb-2">{blog.title}</h2>

                {/* Author Info */}
                <div className="flex items-center gap-4 mb-3">
                    {/* Profile Picture */}
                    <Image
                        src={blog.author.image} // Author image
                        alt={blog.author.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                    />
                    {/* Author Name and Date */}
                    <p className="text-gray-600 font-bold">By <span className='text-[#F44A72]'>{blog.author.name}</span></p>
                    <p className="text-gray-500 font-medium">{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</p>
                </div>

                {/* Blog Excerpt */}
                <p className="text-gray-700 font-medium mb-4">
                    {blog.content.substring(0, 180)}... {/* Truncate content to 80 characters */}
                </p>

                {/* Bottom Section (Read More + Like Count) */}
                <div className="flex justify-between items-center">
                    {/* Read More Button */}
                    <Link href={`/blog/${blog._id}`} className="text-blue-600 font-medium hover:underline">
                        Read More
                    </Link>

                    {/* Like Count */}
                    <div className="flex items-center text-gray-600 space-x-4 mr-6">
                        {/* Like Count */}
                        <div className="flex items-center">
                            <ThumbsUp className="w-5 h-5 mr-1" />
                            <span>{blog.upvotes}</span>
                        </div>
                        {/* Dislike Count */}
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
