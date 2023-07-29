from sqlalchemy import Column, Integer, String, DateTime, Enum, JSON

from .database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    due_date = Column(DateTime, nullable=False)
    priority = Column(Enum("low", "medium", "high"), nullable=False)
    status = Column(Enum("todo", "in-progress", "completed"), nullable=False)
    logs = Column(JSON, default=[])
