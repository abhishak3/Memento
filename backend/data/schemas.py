from datetime import datetime
from pydantic import BaseModel
from enum import Enum


class Priority(Enum):
    LOW = 'low'
    MEDIUM = 'medium'
    HIGH = 'high'


class Status(Enum):
    TODO = 'todo'
    INPROGRESS = 'in-progress'
    COMPLETED = 'completed'


class Task(BaseModel):
    id: int
    title: str
    description: str
    due_date: datetime
    priority: Priority
    status: Status

    class Config:
        orm_mode = True
