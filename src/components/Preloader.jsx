import React, { useState, useEffect } from 'react';

const Preloader = ({ onComplete, duration = 3000 }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start sliding animation
          setTimeout(() => {
            setIsComplete(true);
            setIsSliding(true);
          }, 500);
          
          // Call onComplete after slide animation finishes
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1500); // 500ms delay + 1000ms slide duration
          
          return 100;
        }
        return prev + (100 / (duration / 50));
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[--peach-light] transition-all duration-1000 ease-in-out ${
        isSliding ? 'transform translate-y-full' : 'transform translate-y-0'
      }`}
    >
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes typewriter {
          0% { width: 0; }
          100% { width: 100%; }
        }
        
        @keyframes blink {
          0%, 50% { border-color: transparent; }
          51%, 100% { border-color: white; }
        }
        
        @keyframes slideUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .animate-typewriter {
          overflow: hidden;
          border-right: 2px solid white;
          white-space: nowrap;
          animation: typewriter 2s steps(13) forwards, blink 1s infinite;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .animate-complete {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
      
      <div className={`flex flex-col items-center space-y-8 transition-all duration-500 ${
        isComplete ? 'animate-complete' : ''
      }`}>
        {/* Circular Progress Ring */}
        <div className="relative w-24 h-24 animate-fadeInUp">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="white"
              strokeWidth="3"
              fill="none"
              opacity={isComplete ? "0.3" : "1"}
              className="transition-opacity duration-300"
            />
            {/* Rotating line segment */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="gray"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="50 262"
              className={isComplete ? "" : "animate-spin"}
              style={{ 
                transformOrigin: '50% 50%',
                animation: isComplete ? 'none' : 'spin 1.2s linear infinite',
                opacity: isComplete ? "0.5" : "1"
              }}
            />
            
            {/* Checkmark or completion indicator */}
            {isComplete && (
              <g className="animate-fadeInUp">
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  fill="rgba(255,255,255,0.2)"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M35 50 L45 60 L65 40"
                  stroke="white"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Brand Text */}
        <div className="text-center">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-thin text-white mb-2 italiana-regular transition-all duration-500 ${
            isComplete 
              ? 'text-opacity-100 animate-typewriter' 
              : 'text-opacity-80 animate-typewriter'
          }`}>
            Fashion Store
          </h1>
          
          {/* Completion message */}
          {isComplete && (
            <p className="text-white text-opacity-70 text-sm mt-4 animate-slideUp">
              Welcome to our store...
            </p>
          )}
        </div>

        {/* Progress Percentage */}
        <div className={`text-white text-opacity-60 text-sm font-light transition-all duration-300 ${
          isComplete ? 'opacity-0' : 'opacity-100 animate-fadeInUp'
        }`} style={{animationDelay: '0.5s'}}>
          {Math.round(progress)}%
        </div>
      </div>

      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)`
        }} />
      </div>
    </div>
  );
};

export default Preloader;