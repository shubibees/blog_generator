"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
interface Blog {
  id: string;
  title: string;
  content: string;
  imgURL: string;
}

interface BlogListingProps {
  // Add any props if needed in the future
}

const BlogListing: React.FC<BlogListingProps> = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api");
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const blogListing = await response.json();
        setBlogs(blogListing);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div key={blog.id} className="border rounded-lg p-4">
          <Image src={blog.imgURL || '/placeholder.png'} alt={blog.title} className="w-full h-48 object-cover rounded-lg mb-4" width={500} height={500} />
          <h2 className="text-l font-bold mb-2">{blog.title}</h2>
          <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: blog.content.trim().slice(0, 100) }}></p>
        </div>
      ))}
    </div>
  );
};

export default BlogListing;