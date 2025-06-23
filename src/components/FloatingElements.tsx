import React from 'react';

const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Floating Balloons */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="text-6xl">🎈</div>
      </div>
      <div className="absolute top-40 right-20 animate-float-delayed">
        <div className="text-5xl">🎈</div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float-slow">
        <div className="text-4xl">🎈</div>
      </div>
      
      {/* Floating Sparkles */}
      <div className="absolute top-32 right-40 animate-sparkle">
        <div className="text-3xl">✨</div>
      </div>
      <div className="absolute top-60 left-40 animate-sparkle-delayed">
        <div className="text-2xl">⭐</div>
      </div>
      <div className="absolute bottom-60 right-60 animate-sparkle-slow">
        <div className="text-3xl">💫</div>
      </div>
      
      {/* Floating Hearts */}
      <div className="absolute top-80 right-10 animate-float">
        <div className="text-4xl">💖</div>
      </div>
      <div className="absolute bottom-80 left-60 animate-float-delayed">
        <div className="text-3xl">💕</div>
      </div>
    </div>
  );
};

export default FloatingElements;