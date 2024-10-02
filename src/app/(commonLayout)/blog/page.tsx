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

                  {/* Upvote/Downvote and Comment Count */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Upvotes: {blog.upvotes} | Downvotes: {blog.downvotes}
                    </p>
                    <p className="text-sm text-gray-500">
                      Comments: {blog.comments.length}
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
