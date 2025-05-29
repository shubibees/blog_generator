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

interface Response{
  success: boolean;
  message: string;
  filePath: string;
}
const BlogGeneratorPage: React.FC = () => {
  const [blog, setBlog] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateBlog = async (topic: string) => {
    setLoading(true);
    setError(null);
    setBlog(null);
    setImageUrl(null);

    try {
      // TODO: Replace this with actual API call to generate blog based on topic
      // const response = await fetch('/api/generate-blog', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ topic }),
      // });
      // const blogData: BlogData = await response.json();

      // Temporary hardcoded data (should come from API)
      const blogData: BlogData = {
  "topic": "Creative DIY Projects with Sainik Laminates: Personalise Your Space",
  "blog": {
    "raw": "{\"image_url\": \"https://cdn.openai.com/API/docs/images/images-gallery/speaker-output.png\", \"image_description\": \"A creative DIY project involving the use of patterned laminates to customize a living room space. This project features dazzling laminates accentuating the walls or furniture for an appealing, personalized touch. The room is adorned with soft lighting, plush couches for comfort, a neatly arranged coffee table, modern art hanging on the walls and an indoor plant for freshness. The floor covered with a large area rug lends a cozy vibe to the room. Every corner of this living room is accentuated to exhibit striking and visually appealing details.\"}",
    "pydantic": null,
    "json_dict": null,
    "tasks_output": [
      {
        "description": "1. Prioritize the latest trends, key players, and noteworthy news on Creative DIY Projects with Sainik Laminates: Personalise Your Space.\n2. Identify the target audience, considering their interests and pain points.\n3. Develop a detailed content outline including an introduction, key points, and a call to action.\n4. Include SEO keywords and relevant data or sources.\n",
        "name": "plan_task",
        "expected_output": "A comprehensive content plan document with an outline, audience analysis, SEO keywords, and resources.",
        "summary": "1. Prioritize the latest trends, key players, and noteworthy news...",
        "raw": "Title: Creative DIY Projects with Sainik Laminates: Personalise Your Space\n\nI. Introduction \n\na. Brief Introduction to Sainik Laminates and its growing popularity in interior design.\nb. The concept of DIY projects with Sainik Laminates.\n\nII. Understanding Sainik Laminates\n\na. Types and features of Sainik Laminates.\nb. Advantages of choosing Sainik Laminates for DIY projects.\n\nIII. Trends in DIY projects with Sainik Laminates \n\na. Detailed discussion on trending DIY designs (Pastels, Solids, Woodgrains, Glossy Looks, Accent Walls).\nb. Real-life examples & user experiences.\n\nIV. Target Audience and their needs\n\na. Profiling the target audience.\nb. Needs and preferences of the audience.\nc. How DIY projects with Sainik Laminates meet these needs.\n\nV. DIY project ideas with Sainik Laminates\n\na. Step-by-step guides for creating different DIY designs (Platform beds, Dining tables, Shelves, etc.)\nb. Additional tips and hacks for getting the best result.\n\nVI. Conclusion \n\na. Recap of the value and versatility of Sainik Laminates for DIY projects.\nb. Encourage readers to embark on their own DIY projects.\n\nVII. Call to action\n\na. Inviting readers to share their own DIY experiences and feedback.\nb. Inviting enquiries from readers interested in purchasing or finding out more about Sainik Laminates.\n\nThis content plan caters to different segments of our target audience such as homeowners, interior designers, and DIY enthusiasts, providing them with comprehensive information and actionable ideas for DIY projects using Sainik Laminates.",
        "pydantic": null,
        "json_dict": null,
        "agent": "Content Planner",
        "output_format": "raw"
      },
      {
        "description": "1. Use the content plan to craft a compelling blog post on Creative DIY Projects with Sainik Laminates: Personalise Your Space.\n2. Incorporate SEO keywords naturally.\n3. Sections/Subtitles are properly named in an engaging manner.\n4. Ensure the post is structured with an engaging introduction, insightful body, and a summarizing conclusion.\n5. Format the content in HTML with proper headings, paragraphs, and styling.\n6. Proofread for grammatical errors and alignment with the brand's voice.\n",
        "name": "write_task",
        "expected_output": "A well-written blog post in HTML format, ready for publication, each section should have 2 or 3 paragraphs.",
        "summary": "1. Use the content plan to craft a compelling blog...",
        "raw": "Title: Creative DIY Projects with Sainik Laminates: Personalise Your Space\n\n<h1>I. Introduction</h1>\n\n<p>The world of interior design has witnessed a significant shift, with Sainik Laminates emerging as a trusted choice for innovative, stylish, and durable decorating options. This growing popularity can be traced back to the fascinating possibility of DIY projects with Sainik Laminates, giving you a chance to personalise your space exactly how you envision it.</p>\n\n<h2>II. Understanding Sainik Laminates</h2>\n\n<p>Sainik Laminates offer a plethora of types and features, each uniquely crafted to cater to different design needs. This range extends from heat-resistant to scratch-proof laminates, enhancing aesthetic appeal just as they assure longevity. The real advantage lies in the feasibility these laminates provide for DIY ventures - ease of installation, a wide array of designs, and durability make them the perfect choice for such undertakings.</p>\n\n<h3>III. Trends in DIY projects with Sainik Laminates</h3>\n\n<p>As homeowners look for unique ways to express their personal style, DIY projects with Sainik Laminates are gaining popularity. Everything from pastels and solids to woodgrains and glossy finishes are creating enchanting spaces. Homeowners, just like you, are innovatively using laminates to create accent walls for a dramatic effect.</p>\n<p>Stroll through the world of social media and you’ll find a plethora of real-life examples, user experiences, and variations that will inspire you to jump on the DIY bandwagon with Sainik Laminates.</p>\n\n<h4>IV. Target Audience and their needs</h4>\n\n<p>DIY projects with Sainik Laminates are not confined to professional interior designers. Homeowners looking for a decor change, DIY enthusiasts with a knack for creativity and even students who want to personalize their dorm rooms form the core target audience.</p>\n<p>Each one desires something unique - a reflection of their personalities wrapped in durability and easy maintenance. DIY projects with Sainik Laminates cater to these preferences impeccably, offering a striking balance of style and functionality.</p>\n\n<h5>V. DIY project ideas with Sainik Laminates</h5>\n\n<p>From platform beds and dining tables to shelves and workspace desks, possibilities for DIY creations with Sainik Laminates are limited only by your imagination. The ease of processing and installation, coupled with the available variety, makes your DIY journey a rewarding experience.</p>\n<p>Watch out for additional tips and hacks! They will ensure you achieve the finest results and bring your envisioned design to life.</p>\n\n<h6>VI. Conclusion</h6>\n\n<p>Sainik Laminates have revolutionized the domain of DIY interior projects, blending versatility, durability, and aesthetics into an accessible package. The freedom to personalise your space as you envision is truly empowering.</p>\n<p>I encourage you to embark on this rewarding journey. Let your creativity flow, and you will be amazed at what you can achieve!</p>\n\n<h6>VII. Call to Action</h6>\n\n<p>I invite you to share your own DIY experiences, your victories, lessons learned, and masterpieces. I'd also be thrilled to address any queries you might have about Sainik Laminates or how they can be integrated into your space.</p>\n<p>The arena of DIY decor awaits you. So, are you ready to personalise your space with Sainik Laminates?</p>",
        "pydantic": null,
        "json_dict": null,
        "agent": "Content Writer",
        "output_format": "raw"
      },
      {
        "description": "Proofread the given blog post for grammatical errors and alignment with the brand's voice",
        "name": "edit_task",
        "expected_output": "A well-written blog post in HTML format, ready for publication, each section should have 2 or 3 paragraphs.\n",
        "summary": "Proofread the given blog post for grammatical errors and alignment...",
        "raw": "<h1>I. Introduction</h1>\n\n<p>The interior design realm has seen a notable shift recently. Sainik Laminates, known for its innovative, stylish, and durable decor options, has caught everyone's attention. A part of this growing popularity stems from the fun and hands-on aspects of DIY projects that these laminates facilitate, allowing you to truly have a say in your space's vibe.</p>\n\n<h2>II. Understanding Sainik Laminates</h2>\n\n<p>Sainik Laminates unrolls a myriad of styles and dynamic features designed to fit just about any design inspiration. Options range from heat-resistant to scratch-proof laminates — not only are these a delight to the eyes, but they also offer impressive longevity. However, what truly distinguishes Sainik Laminates is the seamless integration into any DIY projects—their easy installation, wide selection of designs, and durability make them an ideal choice.</p>\n\n<h3>III. Trends in DIY projects with Sainik Laminates</h3>\n\n<p>In a quest to craft spaces that reflect their individual style and taste, homeowners are turning to DIY projects featuring Sainik Laminates. Current trends span from soft pastels and vibrant solids to woodgrains and high-gloss finishes, each capable of infusing character into a space. The use of laminates to create accent walls for a strikingly dramatic touch is gaining particular popularity.</p>\n<p>Hop over to social media, and you'll discover a treasure trove of real-life examples and inspiring variations that could kickstart your DIY journey with Sainik Laminates.</p>\n\n<h4>IV. Target Audience and their needs</h4>\n\n<p>Sainik Laminates and DIY projects are not just for seasoned interior designers. They appeal to homeowners yearning for a decor change, DIY enthusiasts craving a creative outlet, and students looking to add a personal touch to their dorm rooms. </p>\n<p>A shared desire amongst our audience is uniqueness — a fidelity to their personality complemented by durability and simplicity in maintenance. It is here where DIY design with Sainik Laminates checks all these boxes, providing both style and function in extraordinary harmony.</p>\n\n<h5>V. DIY project ideas with Sainik Laminates</h5>\n\n<p>The scope for DIY creations with Sainik Laminates ranges as widely as your imagination. Think platform beds, dining tables, shelves, or workspace desks. The simple processing, installation, and abundant choice are sure to make your DIY journey an enriching experience.</p>\n<p>Make sure to check out our additional tips and hacks! They'll guide you in realizing your design vision in the finest manner possible.</p>\n\n<h6>VI. Conclusion</h6>\n\n<p>Sainik Laminates have revolutionized DIY interior design, skillfully blending the trifecta of versatility, durability, and aesthetics. The joy and freedom to craft your space as per your vision are empowering indeed.</p>\n<p>I encourage you to embark on this exciting journey. Let the creativity flow, and you're sure to be amazed at what you can conjure!</p>\n\n<h6>VII. Call to Action</h6>\n\n<p>I invite you to share your DIY experiences and stories - your triumphs, valuable lessons, and beautiful creations. I'm here to address any queries related to Sainik Laminates or about sprucing up your space with their versatile range.</p>\n<p>The DIY decor world beckons! So, are you ready to stamp your personal touch on your space with Sainik Laminates?</p>",
        "pydantic": null,
        "json_dict": null,
        "agent": "Editor",
        "output_format": "raw"
      },
      {
        "description": "Create a banner image for the blog post that captures the essence of the content and attracts readers' attention\n",
        "name": "design_task",
        "expected_output": "A visually appealing banner image related to the blog post topic",
        "summary": "Create a banner image for the blog post that captures...",
        "raw": "{\"image_url\": \"https://cdn.openai.com/API/docs/images/images-gallery/speaker-output.png\", \"image_description\": \"A creative DIY project involving the use of patterned laminates to customize a living room space. This project features dazzling laminates accentuating the walls or furniture for an appealing, personalized touch. The room is adorned with soft lighting, plush couches for comfort, a neatly arranged coffee table, modern art hanging on the walls and an indoor plant for freshness. The floor covered with a large area rug lends a cozy vibe to the room. Every corner of this living room is accentuated to exhibit striking and visually appealing details.\"}",
        "pydantic": null,
        "json_dict": null,
        "agent": "Senior Banner Image Designer",
        "output_format": "raw"
      }
    ],
    "token_usage": {
      "total_tokens": 17919,
      "prompt_tokens": 15104,
      "cached_prompt_tokens": 0,
      "completion_tokens": 2815,
      "successful_requests": 7
    }
  }
}

      // Extract the edited blog content
      const editedTask = blogData.blog.tasks_output.find(task => task.name === "edit_task");
      if (!editedTask) {
        throw new Error('No edited blog content found');
      }

      const designTask = blogData.blog.tasks_output.find(task => task.name === "design_task");
      let newImageUrl: string | null = null;

      if (designTask) {
        try {
          const designData: DesignData = JSON.parse(designTask.raw);
          const extractedImageUrl = designData.image_url;

          if (extractedImageUrl) {
            const response = await fetch(extractedImageUrl);
            const blob = await response.blob();
            const reader = new FileReader();

            const result = await new Promise<{imgURL: string}>((resolve, reject) => {
              reader.onloadend = async () => {
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

                  const responseData = await saveResponse.json();
                  if (responseData.success) {
                    newImageUrl = responseData.filePath;
                    console.log('Image saved successfully');
                  } else {
                    console.error('Failed to save image');
                    throw new Error('Failed to save image');
                  }

                  await fetch('/api', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      title: blogData.topic,
                      content: editedTask.raw,
                      imgURL: newImageUrl,
                    }),
                  });
                  resolve({
                    imgURL: newImageUrl,
                  });
                } catch (error) {
                  console.error('Error processing image:', error);
                  reject(error);
                }
              };
              reader.onerror = (error) => {
                console.error('FileReader error:', error);
                reject(error);
              };
              reader.readAsDataURL(blob);
            });
          }
        } catch (error) {
          console.error('Error processing design task:', error);
          throw error;
        }
      }

      
      setBlog(editedTask.raw);
      setImageUrl(result.imgURL);

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
                  <h1>Image URL: {imageUrl}</h1>
              {imageUrl && (
                <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt="Generated blog image"
                    // layout="fill"
                    fill
                    // objectFit="cover"
                    // className="transition-opacity duration-300 ease-in-out"
                    className="object-cover transition-opacity duration-300 ease-in-out"
                    onLoadingComplete={(image) =>
                      image.classList.remove("opacity-0")
                    }
                  />
                </div>
              )}
              <div
                className="prose lg:prose-xl dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog) }}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <BlogInputForm onSubmit={handleGenerateBlog} loading={loading} />
              {error && (
                <div
                  className="bg-red-100 border border-neutral-200 border-red-400 text-red-700 px-4 py-3 rounded relative dark:bg-red-900 dark:text-red-100 dark:border-red-800 dark:border-neutral-800"
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
