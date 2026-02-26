import React from 'react';
import './Hero.css';

export default function Hero() {
  const scrollToInput = () => {
    const el = document.getElementById('ingredient-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      {/* Floating SVG illustrations */}
      <div className="hero__illustrations">
        <svg className="hero__svg hero__svg--mortar" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <ellipse cx="50" cy="75" rx="35" ry="12" fill="var(--color-espresso-light)" opacity="0.15"/>
          <path d="M25 55 C25 35, 75 35, 75 55 L72 75 C72 80, 28 80, 28 75 Z" fill="var(--color-parchment-dark)" stroke="var(--color-espresso-light)" strokeWidth="1.5"/>
          <path d="M30 55 C30 40, 70 40, 70 55" fill="none" stroke="var(--color-olive)" strokeWidth="1" opacity="0.5"/>
          <line x1="50" y1="22" x2="50" y2="50" stroke="var(--color-espresso-light)" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="50" cy="18" r="5" fill="var(--color-espresso-light)"/>
        </svg>

        <svg className="hero__svg hero__svg--herb1" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M30 75 C30 75 30 20 30 15" stroke="var(--color-olive)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M30 50 C20 40 12 42 10 38 C8 34 18 30 30 42" fill="var(--color-olive)" opacity="0.6"/>
          <path d="M30 40 C40 30 48 32 50 28 C52 24 42 20 30 32" fill="var(--color-olive)" opacity="0.5"/>
          <path d="M30 30 C22 22 16 24 14 20 C12 16 20 14 30 24" fill="var(--color-olive)" opacity="0.4"/>
          <path d="M30 22 C36 16 42 18 44 14 C46 10 38 8 30 16" fill="var(--color-olive-light)" opacity="0.35"/>
        </svg>

        <svg className="hero__svg hero__svg--herb2" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M30 78 C30 78 28 25 30 15" stroke="var(--color-olive-dark)" strokeWidth="1.5" strokeLinecap="round"/>
          <ellipse cx="22" cy="35" rx="10" ry="6" fill="var(--color-olive)" opacity="0.3" transform="rotate(-30 22 35)"/>
          <ellipse cx="38" cy="28" rx="10" ry="6" fill="var(--color-olive-light)" opacity="0.25" transform="rotate(25 38 28)"/>
          <ellipse cx="24" cy="22" rx="8" ry="5" fill="var(--color-olive)" opacity="0.2" transform="rotate(-20 24 22)"/>
        </svg>

        <svg className="hero__svg hero__svg--pepper" viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 12 C20 8, 22 5, 20 2" stroke="var(--color-olive-dark)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 15 C12 15 10 50 14 65 C16 70 24 70 26 65 C30 50 28 15 28 15 C28 12 12 12 12 15Z" fill="var(--color-terracotta)" opacity="0.6"/>
          <path d="M15 20 C15 20 14 45 16 55" stroke="var(--color-terracotta-dark)" strokeWidth="0.8" opacity="0.3" strokeLinecap="round"/>
        </svg>

        <svg className="hero__svg hero__svg--spoon" viewBox="0 0 30 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M15 95 L15 45" stroke="var(--color-espresso-light)" strokeWidth="2.5" strokeLinecap="round"/>
          <ellipse cx="15" cy="30" rx="10" ry="18" fill="none" stroke="var(--color-espresso-light)" strokeWidth="2"/>
          <ellipse cx="15" cy="30" rx="7" ry="14" fill="var(--color-parchment-dark)" opacity="0.5"/>
        </svg>
      </div>

      <div className="hero__content">
        <h1 className="hero__title">
          What's in your <em>kitchen</em>?
        </h1>
        <p className="hero__subtitle">
          Toss in your ingredients, pick a cuisine, and let our AI chef craft a 
          beautiful recipe — just for you.
        </p>
        <button className="hero__cta" onClick={scrollToInput} id="start-cooking-btn">
          Start Cooking
          <span className="hero__cta-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
