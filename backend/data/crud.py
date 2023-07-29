from sqlalchemy.orm import Session

from . import models, schemas


def get_tasks(db: Session):
    return db.query(models.Task).all()


def create_task(db: Session, task: schemas.Task):
    db_item = models.Task(
        title=task.title,
        description=task.description,
        due_date=task.due_date,
        priority=task.priority,
        status=task.status,
        logs=[{'timestamp': log.timestamp.isoformat(), 'action': log.action}
              for log in task.logs]
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def update_task(db: Session, updated_task: schemas.Task, task_id: int):
    task: models.Task = db.query(models.Task).get(task_id)
    task.title = updated_task.title
    task.description = updated_task.description
    task.due_date = updated_task.due_date
    task.priority = updated_task.priority
    task.status = updated_task.status
    task.logs = [{'timestamp': log.timestamp.isoformat(), 'action': log.action}
                 for log in updated_task.logs]
    db.commit()
    db.refresh(task)
    return task
