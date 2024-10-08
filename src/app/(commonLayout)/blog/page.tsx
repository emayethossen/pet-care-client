"use client";

import { format } from "date-fns";
import { MessageCircle, ThumbsDown, ThumbsUp, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define types for Blog and Author
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
}

const AllBlog = async () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data: Blog[] = await res.json(); // Specify the type of data
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search term and category
  useEffect(() => {
    let results = blogs;

    // Filter by search term (title only)
    if (searchTerm) {
      results = results.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      results = results.filter((blog) => blog.category === selectedCategory);
    }

    // Sort by upvote count
    results.sort((a, b) => b.upvotes - a.upvotes);

    setFilteredBlogs(results);
  }, [searchTerm, selectedCategory, blogs]);

  const truncateContent = (content: string, maxLength: number) => {
    if (typeof window !== 'undefined') {
      const plainText = new DOMParser().parseFromString(content, 'text/html').body.textContent || '';
      return plainText.length > maxLength ? plainText.substring(0, maxLength) + "..." : plainText;
    }
    // Fallback for SSR
    return content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">All Blogs</h1>

      {/* Search and Filter Options */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md w-full p-2"
          />
          <button className="ml-4 py-2 px-6 bg-gradient-to-r from-[#F95C6B] to-[#E51284] text-white rounded-md font-semibold hover:from-red-300 hover:to-red-500 transition">
            Search
          </button>
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All Categories</option>
          <option value="Tip">Tip</option>
          <option value="Story">Story</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      <div className="md:w-2/3 mx-auto space-y-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div key={blog._id} className="md:flex text-center md:text-left gap-8 rounded-lg p-4">
              {/* Left Section (Image) */}
              <div className="w-1/3 shadow-md">
                <Image
                  src={blog.coverImage}
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
                  <Link href={`/profile/${blog.author._id}`}>
                    <Image
                      src={blog.author.profilePicture}
                      alt={blog.author.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                  </Link>
                  {/* Author Name and Date */}
                  <p className="text-gray-600 font-bold">By <span className='text-[#F44A72]'>{blog.author.name}</span></p>
                  <p className="text-gray-500 font-medium">{format(new Date(blog.createdAt), 'MMMM dd, yyyy')}</p>
                </div>

                {/* Blog Excerpt */}
                <p className="text-gray-700 mb-4 font-medium">
                  {truncateContent(blog.content, 200)}
                </p>

                {/* Bottom Section (Read More + Like Count) */}
                <div className="flex justify-between items-center">
                  {/* Read More Button */}
                  <Link href={`/blog/${blog._id}`} className="py-3 px-6 bg-gradient-to-r from-[#F95C6B] to-[#E51284] text-white rounded-md font-semibold hover:from-red-200 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-red-400">
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
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default AllBlog;
