from datetime import datetime
from pydantic import BaseModel
from enum import Enum
from typing import List


class Log(BaseModel):
    timestamp: datetime
    action: str


class Task(BaseModel):
    id: int
    title: str
    description: str
    due_date: datetime
    priority: str
    status: str
    logs: List[Log]

    class Config:
        orm_mode = True
