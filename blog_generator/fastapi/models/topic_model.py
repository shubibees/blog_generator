from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class TopicRequest(BaseModel):
    topic: str

class TaskOutput(BaseModel):
    description: str
    name: str
    expected_output: str
    summary: str
    raw: str
    pydantic: Optional[Any] = None
    json_dict: Optional[Any] = None
    agent: str
    output_format: str

class TokenUsage(BaseModel):
    total_tokens: int
    prompt_tokens: int
    cached_prompt_tokens: int
    completion_tokens: int
    successful_requests: int

class BlogContent(BaseModel):
    raw: str
    pydantic: Optional[Any] = None
    json_dict: Optional[Any] = None
    tasks_output: List[TaskOutput]
    token_usage: TokenUsage

class BlogResponse(BaseModel):
    topic: str
    blog: BlogContent