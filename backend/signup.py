import bcrypt

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from psycopg2.errors import UniqueViolation

from backend.database import get_dict_cursor

router = APIRouter()

class SignupRequest(BaseModel):
    email: str
    password: str
    
@router.post("/signup")
def signup(payload: SignupRequest):
    email = payload.email.strip().lower()
    password = payload.password


    if not email or not password.strip():
        raise HTTPException(status_code=400, detail="Email and password required")


    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    with get_dict_cursor() as (connection, cursor):
        try:
            cursor.execute(
                """
                INSERT INTO users (email, password_hash)
                VALUES (%s, %s)
                RETURNING id, email
                """,
                (email, password_hash),
            )
            user = cursor.fetchone()
            connection.commit()
        except UniqueViolation as exc:
            connection.rollback()
            raise HTTPException(status_code=409, detail="User already exists") from exc

    return {
        "message": "User registered successfully",
        "email": user["email"],
        "user_id": user["id"],
    }
