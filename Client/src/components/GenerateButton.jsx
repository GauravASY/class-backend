import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import './GenerateButton.css';

export default function GenerateButton({ onClick, isLoading, disabled }) {
    return (
        <section className="generate-section section">
            <div className="container">
                <button
                    className={`generate-btn ${isLoading ? 'generate-btn--loading' : ''}`}
                    onClick={onClick}
                    disabled={disabled || isLoading}
                    id="generate-recipe-btn"
                    type="button"
                >
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <span className="generate-btn__text">Generate Recipe</span>
                            <span className="generate-btn__icon" aria-hidden="true">✨</span>
                        </>
                    )}
                </button>
                {disabled && !isLoading && (
                    <p className="generate-btn__hint">
                        Add at least 2 ingredients and select a cuisine to get started.
                    </p>
                )}
            </div>
        </section>
    );
}
