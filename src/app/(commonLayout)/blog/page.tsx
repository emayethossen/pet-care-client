"use client";

import { format } from "date-fns";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "../components/pages/LoadingSkeleton";
import Image from "next/image";

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
  isPremium: boolean;
}

const AllBlog = () => {
  const DEFAULT_AVATAR_URL = 'https://i.ibb.co.com/0jPH8hR/avatardefault-92824.png'
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const router = useRouter();

  // Fetch all blogs on initial load
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `https://pet-care-server-three.vercel.app/api/posts`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data: Blog[] = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search and selected category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const truncateContent = (content: string, maxLength: number) => {
    const plainText =
      new DOMParser().parseFromString(content, "text/html").body.textContent || "";
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  const handleReadMore = (blog: Blog) => {
    if (blog.isPremium) {
      const confirmPayment = window.confirm(
        "This content is premium and requires payment. Would you like to proceed?"
      );
      if (confirmPayment) {
        router.push(`/payment?postId=${blog._id}`);
      }
    } else {
      router.push(`/blog/${blog._id}`);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">All Blogs</h1>

      {/* Search Input */}
      <div className="md:flex items-center justify-between mb-6 md:w-2/3 mx-auto">
        <div className="flex items-center md:m-0 m-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-[#F95C6B] transition"
          />
          <button className="py-2 px-6 bg-gradient-to-r from-[#F95C6B] to-[#E51284] text-white rounded-md font-semibold hover:from-red-300 hover:to-red-500 transition">
            Search
          </button>
        </div>

        <div className="flex m-4 md:m-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-md p-2 w-full"
          >
            <option value="All">All Categories</option>
            <option value="Tip">Tip</option>
            <option value="Story">Story</option>
          </select>
          <button className="py-2 px-6 bg-gradient-to-r from-[#F95C6B] to-[#E51284] text-white rounded-md font-semibold hover:from-red-300 hover:to-red-500 transition">
            Category
          </button>
        </div>
      </div>


      <div className="md:w-2/3 mx-auto space-y-8">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="md:flex text-center md:text-left gap-8 rounded-lg p-4 border border-gray-200"
            >
              <div className="w-1/3 mx-auto mb-4 md:mb-0 shadow-md">
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
                      src={blog.author.profilePicture || DEFAULT_AVATAR_URL}
                      alt={blog.author.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                  </Link>
                  <p className="text-gray-600 font-bold">
                    By <span className="text-[#F44A72]">{blog.author.name}</span>
                  </p>
                  <p className="text-gray-500 font-medium">
                    {format(new Date(blog.createdAt), "MMMM dd, yyyy")}
                  </p>
                </div>

                <p className="text-gray-700 mb-4 font-medium">
                  {truncateContent(blog.content, 200)}
                </p>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleReadMore(blog)}
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
          ))
        )}
      </div>
    </div>
  );
};

export default AllBlog;
