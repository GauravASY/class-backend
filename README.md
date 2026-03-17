# Recipe AI Generator

An AI-powered recipe generator — a class project with a React frontend and a FastAPI backend.

## Overview

Toss in your ingredients, pick a cuisine, and let our AI chef craft a beautiful, structured recipe just for you. The app features a premium kitchen-inspired UI connected to a FastAPI backend with user authentication and a Neon PostgreSQL database.

## Project Structure

```
class-backend/
├── Client/          # React + Vite frontend
└── backend/         # FastAPI Python backend
```

## Features

- **Warm Organic-Minimal UI** — Kitchen-friendly design with parchment textures (`#F5F0E8`), terracotta accents (`#C1440E`), and olive tones (`#6B7C3F`).
- **Tag-Based Ingredient Input** — Add ingredients as pills with Enter or comma support.
- **Cuisine Selection Grid** — Choose from 8 distinct cuisines (Indian, Chinese, Thai, Italian, and more).
- **AI-Powered Generation** — Dynamic recipe generation with structured output (Ingredients, Time, Servings, Step-by-Step Instructions).
- **Mock Fallback System** — Works out-of-the-box with cuisine-specific fallback recipes even without an API key.
- **User Authentication** — Signup and login endpoints backed by a PostgreSQL database.
- **Micro-Animations** — Smooth fade-ins, floating illustrations, and interactive hover effects.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) |
| Styling | Vanilla CSS with custom design tokens |
| Typography | [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) |
| Backend | [FastAPI](https://fastapi.tiangolo.com/) (Python 3.13+) |
| Database | [Neon PostgreSQL](https://neon.tech/) via SQLAlchemy (async) |
| ORM | SQLAlchemy 2.0 with asyncpg |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/signup` | Register a new user |
| `POST` | `/login` | Authenticate a user |
| `POST` | `/` | Submit ingredients & cuisine; get a recipe |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Python](https://www.python.org/) 3.13+
- [uv](https://docs.astral.sh/uv/) (Python package manager)
- A Neon PostgreSQL database (set `DATABASE_URL` in a `.env` file)

### Clone the Repository

```bash
git clone https://github.com/GauravASY/class-backend.git
cd class-backend
```

### Backend Setup

```bash
cd backend

# Install dependencies
uv sync

# Create a .env file at the repo root with your database URL
echo "DATABASE_URL=your_neon_postgres_url" > ../.env

# Run the server
uv run uvicorn backend.main:app --reload
```

The API will be available at `http://localhost:8000`.

### Frontend Setup

```bash
cd Client

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment Variables

Create a `.env` file in the repo root:

```env
DATABASE_URL=postgresql+asyncpg://<user>:<password>@<host>/<dbname>?sslmode=require
```
