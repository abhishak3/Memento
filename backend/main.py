from typing import List

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from data import crud, models, schemas
from data.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "*",
    "http://localhost:4200",
    "http://127.0.0.1:4200",
    "https://memento-iota.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/')
def home():
    return {"Working": "Yes"}


@app.get('/tasks/', response_model=List[schemas.Task])
def get_tasks(db: Session = Depends(get_db)):
    tasks = crud.get_tasks(db)
    return tasks


@app.post('/tasks/', response_model=schemas.Task)
def create_task(task: schemas.Task, db: Session = Depends(get_db)):
    db_task = crud.create_task(db, task)
    return db_task


@app.post('/task/{task_id}', response_model=schemas.Task)
def update_task(task_id: str, updated_task: schemas.Task, db: Session = Depends(get_db)):
    updated_db_task = crud.update_task(db, updated_task, task_id)
    return updated_db_task
