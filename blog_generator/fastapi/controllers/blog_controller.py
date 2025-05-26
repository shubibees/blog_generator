from fastapi import HTTPException
from blog_generator.crew import BlogGenerator

class BlogController:
    @staticmethod
    async def generate_blog(topic: str):
        try:
            result = BlogGenerator().crew().kickoff(inputs={"topic": topic})
            return {"topic": topic, "blog": result}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
