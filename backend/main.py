from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from backend.auth import router as auth_router
from backend.database import init_db
from backend.signup import router as signup_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(signup_router)

@app.on_event("startup")
async def startup() -> None:
    await init_db()

class RecipeRequest(BaseModel):
    cuisines: str
    ingredients: List[str]

@app.post("/recipe")
async def recipes_get(payload: RecipeRequest):
    print(payload) #To understand the structure of the payload. Check and extract accordingly
    return {
        "cuisines": payload.cuisines,
        "ingredients": payload.ingredients,
    }
