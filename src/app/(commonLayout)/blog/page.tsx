import { format } from "date-fns";
import { Command, MessageCircle, ThumbsDown, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AllBlog = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/posts", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const blogs = await res.json();

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-6">All Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog: any) => (
              <div
                key={blog._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                {/* Displaying the first image */}
                {blog.images && blog.images.length > 0 && (
                  <img
                    src={blog.images[0]}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                  <p className="text-gray-700 mb-4">
                    {blog.content.slice(0, 100)}...
                  </p>
                  <div className="flex items-center gap-4 mb-3">
                    {/* Profile Picture */}
                    <Image
                      src={blog.author.profilePicture} // Author image
                      alt={blog.author.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                    {/* Author Name and Date */}
                    <p className="text-gray-600 font-bold">By <span className='text-[#F44A72]'>{blog.author.name}</span></p>
                    <p className="text-gray-500 font-medium">{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</p>
                  </div>

                  {/* Upvote/Downvote and Comment Count */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600 space-x-4 mr-6">
                      {/* Like Count */}
                      <div className="flex items-center">
                        <ThumbsUpIcon className="w-5 h-5 mr-1" />
                        <span>{blog.upvotes}</span>
                      </div>
                      {/* Dislike Count */}
                      <div className="flex items-center">
                        <ThumbsDown className="w-5 h-5 mr-1" />
                        <span>{blog.downvotes}</span>
                      </div>
                    </div>
                    <p className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-1" /> <span>{blog.comments.length}</span>
                    </p>
                  </div>

                  {/* Read More Button */}
                  <Link href={`/blog/${blog._id}`}>
                    <button className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 mt-4 rounded hover:bg-blue-600 transition">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
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

export default AllBlog;
