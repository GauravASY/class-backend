import hashlib

import bcrypt
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from database import get_dict_cursor

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str


def _is_bcrypt_hash(password_hash: str) -> bool:
    return password_hash.startswith("$2a$") or password_hash.startswith("$2b$") or password_hash.startswith("$2y$")


@router.post("/login")
def login(payload: LoginRequest):
    """
    Handles the POST request to the /login endpoint.
    Extracts email and password from request body
    and validates user credentials.
    """
    email = payload.email.strip().lower()
    password = payload.password.strip()

    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password required")


    with get_dict_cursor() as (connection, cursor):
        cursor.execute(
            """
            SELECT email, password_hash
            FROM users
            WHERE email = %s
            """,
            (email,),
        )
        user = cursor.fetchone()


    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")


    stored_hash = user["password_hash"]
    password_bytes = password.encode("utf-8")

    if _is_bcrypt_hash(stored_hash):
        if not bcrypt.checkpw(password_bytes, stored_hash.encode("utf-8")):
            raise HTTPException(status_code=401, detail="Invalid credentials")
    else:
        legacy_hash = hashlib.sha256(password_bytes).hexdigest()
        if stored_hash != legacy_hash:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        upgraded_hash = bcrypt.hashpw(password_bytes, bcrypt.gensalt()).decode("utf-8")
        cursor.execute(
            """
            UPDATE users
            SET password_hash = %s
            WHERE email = %s
            """,
            (upgraded_hash, email),
        )
        connection.commit()


    return {
        "message": "Login successful",
        "email": user["email"],
    }
