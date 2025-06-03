import Image from "next/image";
import { notFound } from 'next/navigation';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import BackButton from '@/components/BackButton'; // You'll need to create this client component

interface Blog {
  id: string;
  title: string;
  content: string;
  imgURL: string;
}

const BlogDetailPage = async ({ params }: { params: { id: string } }) => {
  let blog: Blog;
  
  try {
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/${params.id}`, {
      // Add cache options as needed
      cache: 'no-store', // or 'force-cache' depending on your needs
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    
    blog = await response.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    notFound(); // This will show the 404 page
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <BackButton />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative h-64 w-full">
          <Image 
            src={blog.imgURL ? blog.imgURL : '/placeholder.png'} 
            alt={blog.title} 
            fill 
            className="object-cover" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority // Add priority for above-the-fold images
          />
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;