

import Image from "next/image";
interface Blog {
  id: string;
  title: string;
  content: string;
  imgURL: string;
}

interface BlogListingProps {
  blogList: Blog[];
}

const BlogListing: React.FC<BlogListingProps> = ({blogList}) => {

    console.log("blogList", blogList);
    return (
        <div className="space-y-4">
            {blogList.map((blog) => {
                return (
                    <div key={blog.id} className="border rounded-lg p-4">
                        <h1>Image URL: {blog.imgURL}</h1>
                        <Image src={blog.imgURL || '/placeholder.png'} alt={blog.title} className="w-full h-48 object-cover rounded-lg mb-4" width={100} height={100} />
                        <h2 className="text-l font-bold mb-2">{blog.title}</h2>
                        <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: blog.content.trim().slice(0, 100) }}></p>
                    </div>
                )
            })}
        </div>
  );
};

export default BlogListing;


