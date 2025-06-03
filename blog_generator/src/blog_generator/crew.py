from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import SerperDevTool
from crewai.agents.agent_builder.base_agent import BaseAgent
from typing import List
from dotenv import load_dotenv
import os
from pydantic import BaseModel

# Load environment variables
load_dotenv()

# Set up Serper API key
os.environ['SERPER_API_KEY'] = os.getenv('SERPER_API_KEY')

# Initialize the tool for internet searching capabilities

from crewai_tools import DallETool

dalle_tool = DallETool(model="dall-e-3",
                       size="1024x1024",
                       quality="standard",
                       n=1)

class DesignOutput(BaseModel):
    image_url: str
    image_description: str

@CrewBase
class BlogGenerator():
    """BlogGenerator crew"""

    agents: List[BaseAgent]
    tasks: List[Task]

    @agent
    def planner(self) -> Agent:
        return Agent(
            config=self.agents_config['planner'],
            verbose=True,
            tools=[SerperDevTool()]
        )

    @agent
    def writer(self) -> Agent:
        return Agent(
            config=self.agents_config['writer'],
            verbose=True
        )

    @agent
    def editor(self) -> Agent:
        return Agent(
            config=self.agents_config['editor'],
            verbose=True
        )
        
    @agent
    def formatter(self) -> Agent:
        return Agent(
            config=self.agents_config['formatter'],
            verbose=True
        )

    @agent
    def designer(self) -> Agent:
        return Agent(
            config=self.agents_config['designer'],
            verbose=True,
            tools=[dalle_tool]
        )

    @task
    def plan_task(self) -> Task:
        return Task(
            config=self.tasks_config['plan_task']
        )

    @task
    def write_task(self) -> Task:
        return Task(
            config=self.tasks_config['write_task']
        )

    @task
    def edit_task(self) -> Task:
        return Task(
            config=self.tasks_config['edit_task']
        )
        
    @task
    def format_task(self) -> Task:
        return Task(
            config=self.tasks_config['format_task']
        )

    @task
    def design_task(self) -> Task:
        return Task(
            config=self.tasks_config['design_task'],
            output_pydantic=DesignOutput
        )

    @crew
    def crew(self) -> Crew:
        """Creates the BlogGenerator crew"""
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
