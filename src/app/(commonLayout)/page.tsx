import AllBlog from "./components/pages/AllBlog";
import Category from "./components/pages/Category";
import PopularBlogs from "./components/pages/PopularBlogs";

export default async function Posts() {
  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main blog content */}
        <div className="col-span-2">
          <AllBlog />
        </div>

        {/* Sidebar with Category and Popular Blogs */}
        <div className="hidden md:block p-8">
          {/* Apply sticky positioning with full height */}
          <div className="sticky top-20 space-y-8">
            <Category />
            <PopularBlogs />
          </div>
        </div>
      </div>
    </div>
  );
}
