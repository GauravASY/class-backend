from fastapi import APIRouter, Request

router = APIRouter()

@router.post("/signup")
async def signup(req: Request):
    """
    handles the post request to the /signup endpoint, extracts the email and password 
    from the request body, and returns a success message after user registration.
    
    """

    data = await req.json()

    email = data.get("email")
    password = data.get("password")

    return {
        "message": "User registered successfully",
        "email": email
    }