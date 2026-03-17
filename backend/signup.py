from fastapi import APIRouter
from pydantic import BaseModel #used so FastAPI auto reads and validates JSON

router = APIRouter() #initialize router


class SignupRequest(BaseModel): #pydantic model describing expected request
    email: str
    password: str


@router.post("/signup")
async def signup(payload: SignupRequest): #payload automatically contains request JSON
    """
    handles the post request to the /signup endpoint, extracts the email and password 
    from the request body, and returns a success message after user registration.
    
    """

    return {
        "message": "User registered successfully"
    }