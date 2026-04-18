import React from 'react';

export const GlitchText: React.FC<{ text: string, className?: string, element?: 'h1' | 'h2' | 'span' | 'div' | 'p' }> = ({ text, className = '', element: Element = 'div' }) => {
  return (
    <Element className={`glitch-container ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="glitch-layer glitch-cyan" aria-hidden="true">{text}</span>
      <span className="glitch-layer glitch-magenta" aria-hidden="true">{text}</span>
    </Element>
  );
};
