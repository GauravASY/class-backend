from fastapi import FastAPI, Request
from typing import List
from auth import router as auth_router

app = FastAPI()
app.include_router(auth_router)

class recipe():
    cuisines: str 
    ingredients: List[str]

@app.post("/")
async def recipes_get(req: Request):
    """
    handles the post request to the root endpoint, extracts the ingredients and cuisines from the request body, 
    and returns them in a dictionary format.
    input arguments:
    
    """
    data = await req.json() 

    ingredients = data.get("ingredients")
    cuisines = data.get("cuisines")

    return {
        "cuisine": cuisines,
        "ingredients": ingredients
    }



