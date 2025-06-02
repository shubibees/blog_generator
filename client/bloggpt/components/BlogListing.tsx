"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Blog {
    id: string;
    title: string;
    content: string;
    imgURL: string;
}


const BlogListing = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`${process.env.BASE_URL || 'http://localhost:3000'}/api`, {
                    cache: 'no-store',
                });
                if (!res.ok) throw new Error("Failed to fetch blogs");
                const data = await res.json();
                setBlogs(data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        }
        fetchBlog();
    }, []);
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Generated Blogs</h1>
            {blogs.map((blog) => (
                <div key={blog.id} className="border rounded-lg shadow-sm overflow-hidden">
                    <div className="relative h-48 w-full">
                        <Image
                            src={blog.imgURL || '/placeholder.png'}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h2>
                        <div className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: blog.content.trim().slice(0, 150) }}></div>
                        <Link
                            href={`/blog/${blog.id}`}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            Read More <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogListing;


