import React, { useState, useEffect } from 'react';

const Preloader = ({ isLoading = true, children, minLoadTime = 2000 }) => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoading) {
        setShowPreloader(false);
      }
    }, minLoadTime);

    return () => clearTimeout(timer);
  }, [isLoading, minLoadTime]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowPreloader(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!showPreloader) {
    return children;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main preloader content */}
      <div className="text-center z-10">
        {/* Logo/Brand area */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">ShopFlow</h1>
          <p className="text-gray-300 text-sm">Premium Shopping Experience</p>
        </div>

        {/* Loading animation */}
        <div className="relative mb-8">
          {/* Spinning rings */}
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animation-delay-150" style={{animationDirection: 'reverse'}}></div>
            <div className="absolute inset-4 border-4 border-transparent border-b-pink-500 rounded-full animate-spin animation-delay-300"></div>
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Loading progress bar */}
        <div className="w-64 mx-auto mb-6">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-white">
          <LoadingText />
        </div>

        {/* Shopping icons animation */}
        <div className="flex justify-center space-x-8 mt-8 opacity-60">
          {[
            { icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", delay: "0s" },
            { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", delay: "0.3s" },
            { icon: "M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01", delay: "0.6s" }
          ].map((item, i) => (
            <div
              key={i}
              className="w-8 h-8 animate-bounce"
              style={{ animationDelay: item.delay }}
            >
              <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LoadingText = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "Loading products...",
    "Preparing your cart...",
    "Setting up deals...",
    "Almost ready..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-6 flex items-center justify-center">
      <span className="text-lg font-medium animate-pulse">
        {texts[currentText]}
      </span>
    </div>
  );
};


export default EcommerceApp;