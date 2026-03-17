
import hashlib
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_session
from backend.models import User

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str
@router.post("/login")
async def login(payload: LoginRequest, session: AsyncSession = Depends(get_session)):
    """
    Handles the POST request to the /login endpoint.
    Extracts email and password from request body
    and validates user credentials.
    """

    email = payload.email.strip().lower()
    password = payload.password.strip()


    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password required")


    user = await session.scalar(select(User).where(User.email == email))
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")


    password_hash = hashlib.sha256(password.encode("utf-8")).hexdigest()
    if user.password_hash != password_hash:
        raise HTTPException(status_code=401, detail="Invalid credentials")


    return {
        "message": "Login successful",
        "email": user.email,
    }
