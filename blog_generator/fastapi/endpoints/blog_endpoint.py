from fastapi import APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware
from models.topic_model import TopicRequest
from controllers.blog_controller import BlogController
from models.topic_model import *

# Initialize router
blog_router = APIRouter()

@blog_router.post("/generate-blog/", response_model=BlogResponse)
async def generate_blog(request: TopicRequest):
    return await BlogController.generate_blog(request.topic)
