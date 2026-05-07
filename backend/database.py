import os
from contextlib import contextmanager
from urllib.parse import urlsplit, urlunsplit

from dotenv import load_dotenv
from psycopg2 import pool as psycopg2_pool
from psycopg2.extras import RealDictCursor

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set. Add it to the backend .env file.")


def _normalize_database_url(url: str) -> str:
    if "+asyncpg" not in url:
        return url

    parsed = urlsplit(url)
    scheme = parsed.scheme.replace("+asyncpg", "", 1)

    return urlunsplit(
        (
            scheme,
            parsed.netloc,
            parsed.path,
            parsed.query,
            parsed.fragment,
        )
    )


RAW_DATABASE_URL = _normalize_database_url(DATABASE_URL)

connection_pool: psycopg2_pool.SimpleConnectionPool | None = None


def get_pool() -> psycopg2_pool.SimpleConnectionPool:
    global connection_pool

    if connection_pool is None:
        connection_pool = psycopg2_pool.SimpleConnectionPool(
            minconn=1,
            maxconn=10,
            dsn=RAW_DATABASE_URL,
        )

    return connection_pool


@contextmanager
def get_db_connection():
    db_pool = get_pool()
    connection = db_pool.getconn()

    try:
        yield connection
    finally:
        db_pool.putconn(connection)


async def init_db() -> None:
    with get_db_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS users (
                    id BIGSERIAL PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                )
                """
            )
        connection.commit()


async def close_db() -> None:
    global connection_pool

    if connection_pool is not None:
        connection_pool.closeall()
        connection_pool = None


@contextmanager
def get_dict_cursor():
    with get_db_connection() as connection:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            yield connection, cursor