from fastapi import FastAPI
from pydantic import BaseModel #used so FastAPI auto reads and validates JSON
from typing import List
from fastapi.middleware.cors import CORSMiddleware #needed so frontend can call backend
from backend.auth import router as auth_router #import auth api
from backend.signup import router as signup_router #import signup api

app = FastAPI()

origins = [ #allowed frontend URLs
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware( #enable CORS so browser allows frontend→backend requests
    CORSMiddleware,
    allow_origins=origins, #only allow these URLs
    allow_credentials=True,
    allow_methods=["*"], #allow all request types 
    allow_headers=["*"], #allow all headers
)

app.include_router(auth_router) #attach auth routes
app.include_router(signup_router) #attach signup routes

class RecipeRequest(BaseModel): #pydantic model so FastAPI auto parses request body
    cuisines: str
    ingredients: List[str]

"""
handles the post request to the root endpoint, extracts the ingredients and cuisines from 
the request body, and returns them in a dictionary format.
"""
@app.post("/") #POST endpoint
async def recipes_get(payload: RecipeRequest): #payload automatically contains JSON body
    return {
        "cuisines": payload.cuisines, #get cuisines from request
        "ingredients": payload.ingredients #get ingredients from request
    }