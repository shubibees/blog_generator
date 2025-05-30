from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from endpoints import blog_router
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Add your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

# Include routers
app.include_router(blog_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)

