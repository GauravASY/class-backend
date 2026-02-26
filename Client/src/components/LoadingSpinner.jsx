import React from 'react';
import './LoadingSpinner.css';

export default function LoadingSpinner() {
    return (
        <div className="loading-spinner" aria-label="Loading recipe">
            <svg
                className="loading-spinner__spoon"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <ellipse cx="25" cy="16" rx="10" ry="13" stroke="var(--color-parchment)" strokeWidth="2.5" fill="none" />
                <line x1="25" y1="29" x2="25" y2="48" stroke="var(--color-parchment)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="loading-spinner__dots">
                <span className="loading-spinner__dot"></span>
                <span className="loading-spinner__dot"></span>
                <span className="loading-spinner__dot"></span>
            </div>
        </div>
    );
}
