"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      Back to Blogs
    </button>
  );
};

export default BackButton;