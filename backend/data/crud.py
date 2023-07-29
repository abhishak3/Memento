from sqlalchemy.orm import Session

from . import models, schemas


def get_tasks(db: Session):
    return db.query(models.Task).all()


def create_task(db: Session, task: schemas.Task):
    db_item = models.Task(
        id=task.id,
        title=task.title,
        description=task.description,
        dueDate=task.dueDate,
        priority=task.priority,
        status=task.status,
        historyLog=[{'timestamp': log.timestamp.isoformat(), 'action': log.action}
                    for log in task.historyLog]
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def update_task(db: Session, updated_task: schemas.Task, task_id: int):
    task: models.Task = db.query(models.Task).get(task_id)
    task.title = updated_task.title
    task.description = updated_task.description
    task.dueDate = updated_task.dueDate
    task.priority = updated_task.priority
    task.status = updated_task.status
    task.historyLog = [{'timestamp': log.timestamp.isoformat(), 'action': log.action}
                       for log in updated_task.historyLog]
    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, task_id):
    task: models.Task = db.query(models.Task).get(task_id)
    db.delete(task)
    db.commit()
