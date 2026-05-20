
import { generateRecipe } from './services/recipeService';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Hero from './components/Hero';
import IngredientInput from './components/IngredientInput';
import CuisineSelector from './components/CuisineSelector';
import GenerateButton from './components/GenerateButton';
import RecipeCard from './components/RecipeCard';
import './App.css';

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const recipeRef = useRef(null);

  const canGenerate = ingredients.length >= 2 && selectedCuisine;

  const handleGenerate = async () => {
    if (!canGenerate || isLoading) return;

    setIsLoading(true);
    setRecipe(null);

    try {
      const response = await axios.post("http://localhost:8001/recipe", {
        ingredients,
        cuisines: selectedCuisine,
      });

      const recipeText = response.data.recipe;

      setRecipe({
        name: "Generated Recipe",
        cuisine: selectedCuisine,
        description: recipeText,
        ingredients: ingredients,
        steps: [],
      });

      setTimeout(() => {
        recipeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err) {
      console.error('Failed to generate recipe:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRecipe(null);
    setIngredients([]);
    setSelectedCuisine('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Hero />

      <main className="app__main">
        <IngredientInput
          ingredients={ingredients}
          setIngredients={setIngredients}
        />

        <CuisineSelector
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
        />

        <GenerateButton
          onClick={handleGenerate}
          isLoading={isLoading}
          disabled={!canGenerate}
        />

        <div ref={recipeRef}>
          {recipe && (
            <RecipeCard recipe={recipe} onReset={handleReset} />
          )}
        </div>
      </main>

      <footer className="app__footer">
        <p>Crafted with 🤎 — Recipe Generator</p>
      </footer>
    </div>
  );
}