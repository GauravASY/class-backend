from fastapi import APIRouter
from fastapi import HTTPException #used to return proper API error responses
from pydantic import BaseModel #used so FastAPI auto parses and validates JSON
import os #used to read environment variables for credentials

router = APIRouter() 

class LoginRequest(BaseModel): #pydantic model describing expected request 
    email: str
    password: str

@router.post("/login")
async def login(payload: LoginRequest): #payload automatically contains request JSON
    """
    Handles the POST request to the /login endpoint.
    Extracts email and password from request body
    and validates user credentials.
    """

    if not payload.email.strip() or not payload.password.strip(): #check if email or password is empty
        raise HTTPException(status_code=400, detail="Email and password required") #return bad request error

    expected_email = os.getenv("AUTH_EMAIL") #read email from environment variable
    expected_password = os.getenv("AUTH_PASSWORD") #read password from environment variable

    if not expected_email or not expected_password: #check if server credentials are configured
        raise HTTPException(
            status_code=500,
            detail="Server auth credentials are not configured", #server configuration error
        )

    if payload.email == expected_email and payload.password == expected_password: #validate login credentials
        return {
            "message": "Login successful" #successful login response
        }

    raise HTTPException(status_code=401, detail="Invalid credentials") #return unauthorized error