from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# DB_URL = 'sqlite:///./tasks.db'
DB_URL = "postgresql://default:Wfs0eIgu5YZE@ep-yellow-recipe-83910131.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb"

engine = create_engine(DB_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
