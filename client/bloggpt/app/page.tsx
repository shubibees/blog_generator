"use client";

import { useState } from "react";
import { generateBlog } from "./actions/generateBlog";
import BlogInputForm from "@/components/BlogInputForm";
import InteractiveBlogLoader from "@/components/InteractiveBlogLoader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { marked } from "marked";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import Image from "next/image";
import DOMPurify from "dompurify";
import BlogListing from "@/components/BlogListing";

interface Task {
  name: string;
  raw: string;
  description: string;
  expected_output: string;
  summary: string;
  agent: string;
  output_format: string;
  pydantic?: any;
  json_dict?: any;
}

interface BlogData {
  topic: string;
  blog: {
    tasks_output: Task[];
    raw: string;
    token_usage: {
      total_tokens: number;
      prompt_tokens: number;
      cached_prompt_tokens: number;
      completion_tokens: number;
      successful_requests: number;
    };
  };
}

interface DesignData {
  image_url: string;
  image_description: string;
}

interface SaveImageResponse {
  success: boolean;
  message: string;
  filePath: string;
}

interface ProcessingResult {
  imgURL: string | null;
}

const BlogGeneratorPage: React.FC = () => {
  const [blog, setBlog] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const processDesignImage = async (designTask: Task): Promise<string | null> => {
    try {
      const designData: DesignData = designTask.pydantic;
      const extractedImageUrl = designData.image_url;
      console.log("extracted image",extractedImageUrl)

      if (!extractedImageUrl) {
        console.warn('No image URL found in design task');
        return null;
      }

      // Use the proxy-image API endpoint to avoid CORS issues
      const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(extractedImageUrl)}`;
      const response = await fetch(proxyUrl);
      console.log("response image", response)
      
      if (!response.ok) {
        const errorData = await response.json();
        // Check if this is an Azure Blob Storage URL that requires direct access
        if (errorData.needsDirectAccess) {
          console.warn('Azure Blob Storage URL requires server-side access');
          throw new Error('This image requires server-side access and cannot be fetched directly');
        }
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      
      return new Promise<string | null>((resolve, reject) => {
        const reader = new FileReader();
        
        // Set up timeout to prevent hanging
        const timeoutId = setTimeout(() => {
          reader.abort();
          reject(new Error('Image processing timeout'));
        }, 30000); // 30 second timeout
        
        reader.onloadend = async () => {
          clearTimeout(timeoutId);
          try {
            const base64data = reader.result as string;
            const timestamp = new Date().getTime();
            const fileName = `banner_${timestamp}.png`;

            const saveResponse = await fetch('/api/save-image', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                base64Image: base64data,
                fileName: fileName
              })
            });

            if (!saveResponse.ok) {
              throw new Error(`Save image API failed: ${saveResponse.statusText}`);
            }

            const responseData: SaveImageResponse = await saveResponse.json();
            if (responseData.success) {
              console.log('Image saved successfully');
              resolve(responseData.filePath);
            } else {
              console.error('Failed to save image:', responseData.message);
              throw new Error(responseData.message || 'Failed to save image');
            }
          } catch (error) {
            console.error('Error processing image:', error);
            reject(error);
          }
        };
        
        reader.onerror = (error) => {
          clearTimeout(timeoutId);
          console.error('FileReader error:', error);
          reject(new Error('Failed to read image file'));
        };
        
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error processing design task:', error);
      return null;
    }
  };

  const saveBlogToDatabase = async (title: string, content: string, imgURL: string | null) => {
    try {
      const blogSaveResponse = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          imgURL,
        }),
      });

      if (!blogSaveResponse.ok) {
        console.warn('Failed to save blog to database:', blogSaveResponse.statusText);
      } else {
        console.log('Blog saved to database successfully');
      }
    } catch (error) {
      console.warn('Error saving blog to database:', error);
    }
  };

  const handleGenerateBlog = async (topic: string) => {
    setLoading(true);
    setError(null);
    setBlog(null);
    setImageUrl(null);

    try {
      // Validate environment variable
      if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
        throw new Error('Backend URL not configured');
      }

      // Generate blog content
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/generate-blog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const blogData: BlogData = await response.json();

      // Validate blog data structure
      if (!blogData.blog?.tasks_output || !Array.isArray(blogData.blog.tasks_output)) {
        throw new Error('Invalid blog data structure received');
      }

      // Extract edited blog content
      const editedTask = blogData.blog.tasks_output.find(task => task.name === "format_task");
      if (!editedTask) {
        throw new Error('No edited blog content found');
      }

      // Process design image if available
      const designTask = blogData.blog.tasks_output.find(task => task.name === "design_task");
      let processedImageUrl: string | null = null;

      if (designTask) {
        try {
          processedImageUrl = await processDesignImage(designTask);
        } catch (error) {
          console.error('Error processing design image:', error);
          setError('Blog generated successfully, but image processing failed');
        }
      }

      // Save blog to database
      await saveBlogToDatabase(blogData.topic, editedTask.raw, processedImageUrl);

      // Update state with results
      setBlog(editedTask.raw);
      setImageUrl(processedImageUrl);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while generating the blog';
      setError(errorMessage);
      console.error('Blog generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBlog(null);
    setImageUrl(null);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            AI Blog Generator
          </CardTitle>
          <CardDescription className="text-center">
            Enter a topic and let AI create a blog post with an image for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <InteractiveBlogLoader />
          ) : blog ? (
            <div className="space-y-6">
              <Button variant="outline" onClick={handleReset} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Generate Another Blog
              </Button>
              
              {imageUrl && (
                <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt="Generated blog image"
                    fill
                    className="object-cover transition-opacity duration-300 ease-in-out opacity-0"
                    onLoad={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.classList.remove("opacity-0");
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', imageUrl);
                      setImageUrl(null);
                    }}
                  />
                </div>
              )}
              
              <div className="prose lg:prose-xl dark:prose-invert max-w-none">
                {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog}</ReactMarkdown> */}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <BlogInputForm onSubmit={handleGenerateBlog} loading={loading} />
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:text-red-100 dark:border-red-800"
                  role="alert"
                >
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogGeneratorPage;