import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

// Add custom CSS for zoom animation
const customStyles = `
  @keyframes zoom-slow {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }
  
  .animate-zoom-slow {
    animation: zoom-slow 20s ease-in-out infinite alternate;
  }
`;

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [textAnimationKey, setTextAnimationKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile (not tablet)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480); // Mobile only, tablets use desktop images
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Updated hero slides data with both desktop and mobile images
  const heroSlides = [
    {
      id: 1,
      title: "YOUR ESCAPE, YOUR STYLE",
      subtitle: "BREEZY | MINIMAL TO BOLD PRINTS",
      mobileTitle: "YOUR STYLE",
      mobileSubtitle: "BREEZY | MINIMAL",
      desktopImage: assets.heroMain_img3,
      mobileImage: assets.heroMobile_img1,
    },
    {
      id: 2,
      title: "EXCLUSIVE DESIGNS",
      subtitle: "PREMIUM | LUXURY FASHION",
      mobileTitle: "EXCLUSIVE",
      mobileSubtitle: "PREMIUM | LUXURY",
      desktopImage: assets.heroMain_img,
      mobileImage: assets.heroMobile_img2,
    },
    {
      id: 3,
      title: "TRENDY STYLES",
      subtitle: "MODERN | CONTEMPORARY FASHION",
      mobileTitle: "TRENDY",
      mobileSubtitle: "MODERN | CONTEMPORARY",
      desktopImage: assets.heroMain_img4,
      mobileImage: assets.heroMobile_img3,
    },
    {
      id: 4,
      title: "WINTER COLLECTION",
      subtitle: "COZY | WARM & STYLISH",
      mobileTitle: "WINTER",
      mobileSubtitle: "COZY | WARM",
      desktopImage: assets.heroMain_img6,
      mobileImage: assets.heroMobile_img4,
    },
    {
      id: 5,
      title: "SUMMER COLLECTION",
      subtitle: "FRESH | VIBRANT COLORS",
      mobileTitle: "SUMMER",
      mobileSubtitle: "FRESH | VIBRANT",
      desktopImage: assets.heroMain_img5,
      mobileImage: assets.heroMobile_img5,
    },
    {
      id: 6,
      title: "GEAR UP FOR ACTION",
      subtitle: "PERFORMANCE | COMFORT MEETS STYLE",
      mobileTitle: "GEAR UP",
      mobileSubtitle: "PERFORMANCE | COMFORT",
      desktopImage: assets.heroMain_img2,
      mobileImage: assets.heroMobile_img6,
    },
  ];

  // Get the current image based on device type
  const getCurrentImage = () => {
    return isMobile 
      ? heroSlides[currentSlide].mobileImage 
      : heroSlides[currentSlide].desktopImage;
  };

  // Get the current text based on device type
  const getCurrentTitle = () => {
    return isMobile 
      ? heroSlides[currentSlide].mobileTitle 
      : heroSlides[currentSlide].title;
  };

  const getCurrentSubtitle = () => {
    return isMobile 
      ? heroSlides[currentSlide].mobileSubtitle 
      : heroSlides[currentSlide].subtitle;
  };

  // Trigger animations on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Small delay to ensure smooth animation start
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide functionality with text animation trigger
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const newSlide = (prev + 1) % heroSlides.length;
        // Trigger text animation for each slide change
        setTextAnimationKey(prevKey => prevKey + 1);
        return newSlide;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTextAnimationKey(prevKey => prevKey + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTextAnimationKey(prevKey => prevKey + 1);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setTextAnimationKey(prevKey => prevKey + 1);
  };

  return (
    <div>
      {/* Inject custom CSS */}
      <style>{customStyles}</style>
      
      <div className="relative w-screen h-screen overflow-hidden -ml-[50vw] left-1/2">
        {/* Main Hero Content - FULL SCREEN */}
        <div
          className={`relative w-full h-full flex items-center justify-center transition-all duration-1000 ease-out ${
            isLoaded 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}
        >
          {/* Background Image with Continuous Zoom Animation */}
          <div
            className="absolute inset-0 w-full h-full animate-zoom-slow"
            style={{
              backgroundImage: `url(${getCurrentImage()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20 z-5"></div>

          {/* Left Navigation Arrow */}
          <button
            onClick={prevSlide}
            className={`absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-transparent border-2 border-white rotate-45 flex items-center justify-center transition-all duration-700 hover:scale-110 ${
              isLoaded 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
          {/* Undo the button rotation for arrow */}
          <svg
            className="w-6 h-6 text-white -rotate-45"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          </button>

          {/* Center Content */}
          <div className="text-center z-10 px-4">
            <h1 
              key={`title-${textAnimationKey}`}
              className={`text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-light text-white mb-3 tracking-wider drop-shadow-2xl italiana-regular transition-all duration-1000 ease-out ${
                isLoaded 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-12'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {getCurrentTitle()}
            </h1>
            <p 
              key={`subtitle-${textAnimationKey}`}
              className={`text-xs sm:text-sm md:text-md lg:text-xl text-white/90 font-light tracking-widest uppercase drop-shadow-lg instrument-sans-regular transition-all duration-1000 ease-out ${
                isLoaded 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-12'
              }`}
              style={{ transitionDelay: '900ms' }}
            >
              {getCurrentSubtitle()}
            </p>
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={nextSlide}
            className={`absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-transparent border-2 border-white rotate-45 flex items-center justify-center transition-all duration-700 hover:scale-110 ${
              isLoaded 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <svg
              className="w-6 h-6 text-white  -rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div 
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20 transition-all duration-700 ease-out ${
              isLoaded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/60 hover:bg-white/80 hover:scale-110'
                }`}
              />
            ))}
          </div>

          {/* Decorative Elements - Made More Transparent */}
          <div 
            className={`absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-3xl transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{ transitionDelay: '1200ms' }}
          ></div>
          <div 
            className={`absolute bottom-32 right-32 w-40 h-40 bg-white/5 rounded-full blur-3xl transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{ transitionDelay: '1400ms' }}
          ></div>
          <div 
            className={`absolute top-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{ transitionDelay: '1600ms' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;