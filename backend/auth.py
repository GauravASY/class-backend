from fastapi import APIRouter, Request

router = APIRouter()

@router.post("/login")
async def login(req: Request):
    """
    Handles the POST request to the /login endpoint.
    Extracts email and password from request body
    and validates user credentials.
    """

    data = await req.json()

    email = data.get("email")
    password = data.get("password")

    if email == "test@gmail.com" and password == "1234":
        return {
            "message": "Login successful"
        }

    return {
        "message": "Invalid credentials"
    }