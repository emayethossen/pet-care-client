import AllBlog from "./components/pages/AllBlog";
import Category from "./components/pages/Category";
import PopularBlogs from "./components/pages/PopularBlogs";

export default async function Posts() {

  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <AllBlog />
        </div>
        <div className="hidden md:block px-8">
          <Category />
          <PopularBlogs />
        </div>
      </div>
    </div>
  );
}
