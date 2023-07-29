from datetime import datetime
from pydantic import BaseModel
from enum import Enum


class Priority(str, Enum):
    LOW = 'low'
    MEDIUM = 'medium'
    HIGH = 'high'


class Status(str, Enum):
    TODO = 'todo'
    INPROGRESS = 'in-progress'
    COMPLETED = 'completed'


class Log(BaseModel):
    timestamp: datetime
    action: str


class Task(BaseModel):
    id: int
    title: str
    description: str
    due_date: datetime
    priority: Priority
    status: Status
    logs: list[Log]

    class Config:
        orm_mode = True
