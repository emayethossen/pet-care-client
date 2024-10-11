import BlogCard from "./BlogCard";
import NewsletterSubscription from "./NewsletterSubscription";

const AllBlog = async () => {
    try {
        const res = await fetch("https://pet-care-server-three.vercel.app/api/posts", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch posts");
        }

        const blogs = await res.json();

        return (
            <div className="container mx-auto py-8">
                <div className="space-y-8">
                    {blogs.length > 0 ? (
                        blogs.slice(0, 3).map((blog: any) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))
                    ) : (
                        <p>No blogs available</p>
                    )}
                </div>
                <NewsletterSubscription />
                <div className="space-y-8">
                    {blogs.length > 0 ? (
                        blogs.slice(3, 6).map((blog: any) => (
                            <BlogCard key={blog._id} blog={blog} />
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
