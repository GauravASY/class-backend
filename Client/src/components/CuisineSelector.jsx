import React from 'react';
import './CuisineSelector.css';

const CUISINES = [
    { id: 'indian', name: 'Indian', emoji: '🍛', desc: 'Bold spices & aromatics' },
    { id: 'chinese', name: 'Chinese', emoji: '🥡', desc: 'Wok-fired & umami-rich' },
    { id: 'thai', name: 'Thai', emoji: '🍜', desc: 'Sweet, sour & spicy' },
    { id: 'continental', name: 'Continental', emoji: '🍽️', desc: 'Classic European elegance' },
    { id: 'mexican', name: 'Mexican', emoji: '🌮', desc: 'Smoky heat & fresh lime' },
    { id: 'mediterranean', name: 'Mediterranean', emoji: '🫒', desc: 'Olive oil & sun-kissed herbs' },
    { id: 'japanese', name: 'Japanese', emoji: '🍣', desc: 'Delicate & precision-crafted' },
    { id: 'italian', name: 'Italian', emoji: '🍝', desc: 'Rustic simplicity & amore' },
];

export default function CuisineSelector({ selectedCuisine, setSelectedCuisine }) {
    return (
        <section className="cuisine-section section">
            <div className="container">
                <h2 className="cuisine-section__title">Pick a Cuisine</h2>
                <p className="cuisine-section__desc">
                    Choose a culinary tradition and we'll tailor your recipe.
                </p>

                <div className="cuisine-grid" role="radiogroup" aria-label="Cuisine selection">
                    {CUISINES.map((cuisine) => (
                        <button
                            key={cuisine.id}
                            className={`cuisine-card ${selectedCuisine === cuisine.id ? 'cuisine-card--active' : ''
                                }`}
                            onClick={() => setSelectedCuisine(cuisine.id)}
                            role="radio"
                            aria-checked={selectedCuisine === cuisine.id}
                            id={`cuisine-${cuisine.id}`}
                            type="button"
                        >
                            <span className="cuisine-card__emoji" aria-hidden="true">
                                {cuisine.emoji}
                            </span>
                            <span className="cuisine-card__name">{cuisine.name}</span>
                            <span className="cuisine-card__desc">{cuisine.desc}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
