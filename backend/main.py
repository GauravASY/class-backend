from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from auth import router as auth_router
from database import close_db, init_db
from signup import router as signup_router
from inference import model_generate_recipe

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


@app.on_event("shutdown")
async def shutdown() -> None:
    await close_db()


class RecipeRequest(BaseModel):
    cuisines: str
    ingredients: List[str]


@app.post("/recipe")
async def recipes_get(payload: RecipeRequest):
    recipe_response = ""

    for chunk in model_generate_recipe(payload.ingredients, payload.cuisines):
        recipe_response += chunk

    return {
        "recipe": recipe_response
    }
