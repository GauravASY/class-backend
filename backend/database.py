import os
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_async_engine(
    DATABASE_URL,
    echo=True
)

SessionLocal = sessionmaker(
    bind=engine,
    expire_on_commit=False
)