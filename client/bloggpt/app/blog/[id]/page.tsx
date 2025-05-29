 "use client";

import { useRouter } from 'next/navigation';
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import DOMPurify from "dompurify";
import { marked } from "marked";

interface Blog {
  id: string;
  title: string;
  content: string;
  imgURL: string;
}

const BlogDetailPage = async ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const Response =  await fetch(`/api/${params.id}`);
  const blog = await Response.json();

  const cleanHTML = (html: string) => {
    return DOMPurify.sanitize(html);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Blogs
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative h-64 w-full">
          <Image 
            src={blog.imgURL} 
            alt={blog.title} 
            fill 
            className="object-cover" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          <div 
            className="prose max-w-none" 
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;