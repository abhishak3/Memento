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
    id: str
    title: str
    description: str
    dueDate: datetime
    priority: Priority
    status: Status
    historyLog: list[Log]

    class Config:
        orm_mode = True
