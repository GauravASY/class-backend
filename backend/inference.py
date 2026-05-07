import os
from typing import List

from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langchain.messages import HumanMessage, SystemMessage

load_dotenv()

if not os.getenv("GOOGLE_API_KEY"):
    raise ValueError("GOOGLE_API_KEY is not set. Add it to backend/.env file.")

model = init_chat_model("google_genai:gemini-2.5-flash-lite")


def model_generate_recipe(ingredients: List[str], cuisines: str):
    system_prompt = f"""
    You are an expert chef with 20 years of experience.

    Create a simple, delicious recipe using the ingredients provided.
    You can use all or some of these ingredients: {ingredients}

    Cuisine: {cuisines}

    Output format:
    Recipe Name:
    Ingredients Used:
    Steps:
    """

    conversation = [
        SystemMessage(content=system_prompt),
        HumanMessage(content="Generate a recipe now."),
    ]

    for chunk in model.stream(conversation):
        yield chunk.content