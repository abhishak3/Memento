import os
from dotenv import load_dotenv

PROD_ENV_FILE = "../.env"
LOCAL_ENV_FILE = "../.env.local"


def load_dotenv_file():
    if os.getenv('APP_ENV') == 'PROD':
        load_dotenv(dotenv_path=PROD_ENV_FILE)
    else:
        load_dotenv(dotenv_path=LOCAL_ENV_FILE)


load_dotenv_file()


class Config:
    database_url = os.environ.get('DATABASE_URL')
