import React, { useState, useRef } from 'react';
import './IngredientInput.css';

const MAX_INGREDIENTS = 15;

export default function IngredientInput({ ingredients, setIngredients }) {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const addIngredient = (value) => {
        const trimmed = value.trim().toLowerCase();
        if (
            trimmed &&
            !ingredients.includes(trimmed) &&
            ingredients.length < MAX_INGREDIENTS
        ) {
            setIngredients((prev) => [...prev, trimmed]);
        }
    };

    const removeIngredient = (index) => {
        setIngredients((prev) => prev.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addIngredient(inputValue);
            setInputValue('');
        } else if (e.key === 'Backspace' && !inputValue && ingredients.length > 0) {
            removeIngredient(ingredients.length - 1);
        }
    };

    const handleChange = (e) => {
        const val = e.target.value;
        if (val.includes(',')) {
            const parts = val.split(',');
            parts.forEach((part) => addIngredient(part));
            setInputValue('');
        } else {
            setInputValue(val);
        }
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <section className="ingredient-section section" id="ingredient-section">
            <div className="container">
                <h2 className="ingredient-section__title">Your Ingredients</h2>
                <p className="ingredient-section__desc">
                    Add what you have on hand — we'll work our magic.
                </p>

                <div
                    className="ingredient-input"
                    onClick={focusInput}
                    role="group"
                    aria-label="Ingredient input"
                >
                    <div className="ingredient-input__chips">
                        {ingredients.map((ingredient, index) => (
                            <span
                                key={`${ingredient}-${index}`}
                                className="ingredient-chip"
                            >
                                <span className="ingredient-chip__text">{ingredient}</span>
                                <button
                                    className="ingredient-chip__remove"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeIngredient(index);
                                    }}
                                    aria-label={`Remove ${ingredient}`}
                                    type="button"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                        <input
                            ref={inputRef}
                            type="text"
                            className="ingredient-input__field"
                            value={inputValue}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder={
                                ingredients.length === 0
                                    ? 'e.g. tomatoes, paneer, garlic...'
                                    : ingredients.length >= MAX_INGREDIENTS
                                        ? 'Max reached'
                                        : 'Add more...'
                            }
                            disabled={ingredients.length >= MAX_INGREDIENTS}
                            id="ingredient-input-field"
                        />
                    </div>

                    {ingredients.length > 0 && (
                        <span className="ingredient-input__count">
                            {ingredients.length}/{MAX_INGREDIENTS}
                        </span>
                    )}
                </div>
            </div>
        </section>
    );
}
