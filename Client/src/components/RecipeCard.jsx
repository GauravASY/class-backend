import React from 'react';
import './RecipeCard.css';

export default function RecipeCard({ recipe, onReset }) {
    if (!recipe) return null;

    return (
        <section className="recipe-section section" id="recipe-output">
            <div className="container">
                <div className="recipe-card">
                    {/* Header Metadata */}
                    <div className="recipe-card__meta">
                        {recipe.cuisine && (
                            <span className="recipe-card__badge recipe-card__badge--cuisine">
                                {recipe.cuisine}
                            </span>
                        )}
                        {recipe.cookingTime && (
                            <span className="recipe-card__badge recipe-card__badge--time">
                                ⏱ {recipe.cookingTime}
                            </span>
                        )}
                        {recipe.servings && (
                            <span className="recipe-card__badge recipe-card__badge--servings">
                                🍽 {recipe.servings} servings
                            </span>
                        )}
                    </div>

                    {/* Recipe Title */}
                    <h2 className="recipe-card__title">{recipe.name}</h2>

                    {recipe.description && (
                        <p className="recipe-card__description">{recipe.description}</p>
                    )}

                    {/* Ingredients */}
                    {recipe.ingredients && recipe.ingredients.length > 0 && (
                        <div className="recipe-card__section">
                            <h3 className="recipe-card__section-title">
                                <span className="recipe-card__section-icon" aria-hidden="true">🥬</span>
                                Ingredients
                            </h3>
                            <ul className="recipe-card__ingredients">
                                {recipe.ingredients.map((item, index) => (
                                    <li key={index} className="recipe-card__ingredient">
                                        <span className="recipe-card__ingredient-bullet" aria-hidden="true">●</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Instructions */}
                    {recipe.steps && recipe.steps.length > 0 && (
                        <div className="recipe-card__section">
                            <h3 className="recipe-card__section-title">
                                <span className="recipe-card__section-icon" aria-hidden="true">👨‍🍳</span>
                                Instructions
                            </h3>
                            <ol className="recipe-card__steps">
                                {recipe.steps.map((step, index) => (
                                    <li key={index} className="recipe-card__step">
                                        <span className="recipe-card__step-number">{index + 1}</span>
                                        <p className="recipe-card__step-text">{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}

                    {/* Reset Button */}
                    <button
                        className="recipe-card__reset"
                        onClick={onReset}
                        id="try-another-btn"
                        type="button"
                    >
                        Try Another
                        <span aria-hidden="true">↺</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
