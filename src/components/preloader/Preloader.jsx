import React, { useState, useEffect } from 'react';
import './Preloader.css'; // We'll create this CSS file

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
      className={`preloader-container ${
        isSliding ? 'preloader-slide-up' : ''
      }`}
    >
      <div className={`preloader-content ${
        isComplete ? 'preloader-complete' : ''
      }`}>
        {/* Circular Progress Ring */}
        <div className="preloader-ring">
          <svg className="preloader-svg" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="white"
              strokeWidth="3"
              fill="none"
              opacity={isComplete ? "0.3" : "1"}
              className="preloader-bg-circle"
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
              className={`preloader-spinner ${isComplete ? '' : 'preloader-spin'}`}
              style={{ 
                opacity: isComplete ? "0.5" : "1"
              }}
            />
            
            {/* Checkmark or completion indicator */}
            {isComplete && (
              <g className="preloader-checkmark">
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
        <div className="preloader-text">
          <h1 className={`preloader-title ${
            isComplete ? 'preloader-title-complete' : ''
          }`}>
            Fashion Store
          </h1>
          
          {/* Completion message */}
          {isComplete && (
            <p className="preloader-message">
              Welcome to our store...
            </p>
          )}
        </div>

        {/* Progress Percentage */}
        <div className={`preloader-progress ${
          isComplete ? 'preloader-progress-hidden' : ''
        }`}>
          {Math.round(progress)}%
        </div>
      </div>

      {/* Subtle overlay pattern */}
      <div className="preloader-overlay" />
    </div>
  );
};

export default Preloader;