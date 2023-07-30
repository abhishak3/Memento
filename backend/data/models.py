from sqlalchemy import Column, Integer, String, DateTime, Enum, JSON

from .database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    dueDate = Column(DateTime, nullable=False)
    priority = Column(Enum("low", "medium", "high",
                      name='priority_types'), nullable=False)
    status = Column(Enum("todo", "in-progress", "completed",
                    name='status_types'), nullable=False)
    historyLog = Column(JSON, default=[])
