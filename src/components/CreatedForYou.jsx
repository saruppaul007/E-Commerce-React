import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import PageSection from './pageSection';
import {assets} from '../assets/assets';

// Custom arrow components with improved styling
const ChevronLeft = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const CreatedForYou = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const collections = [
    {
      id: 1,
      title: "COLOUR OF THE YEAR",
      image: assets.createdForYou1,
    },
    {
      id: 2,
      title: "9-5 COLLECTION",
      image: assets.createdForYou2,
    },
    {
      id: 3,
      title: "STREETWEAR CLUB",
      image: assets.createdForYou3,
    },
    {
      id: 4,
      title: "DENIM DROPS",
      image: assets.createdForYou4,
    },
    {
      id: 5,
      title: "PRINTS EDIT",
      image: assets.createdForYou5,
    },
    {
      id: 6,
      title: "SUNNY STAPLES",
      image: assets.createdForYou6,
    },
    {
      id: 7,
      title: "STREET SPORT",
      image: assets.createdForYou7,
    },
    {
      id: 8,
      title: "SUMMER SCENE",
      image: assets.createdForYou8,
    }
  ];

  // Handle responsive slides with better breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesToShow(1); // 1 item on mobile (below sm)
      } else if (width < 1024) {
        setSlidesToShow(2); // 2 items on tablet (sm to lg)
      } else if (width < 1280) {
        setSlidesToShow(3); // 3 items on desktop (lg to xl)
      } else {
        setSlidesToShow(4); // 4 items on large screens (xl and above)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset slide when slidesToShow changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [slidesToShow]);

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered && collections.length > slidesToShow) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => {
          const maxSlide = Math.max(0, Math.ceil(collections.length / slidesToShow) - 1);
          return prev >= maxSlide ? 0 : prev + 1;
        });
      }, 4000); // Auto-slide every 4 seconds

      return () => clearInterval(interval);
    }
  }, [isHovered, collections.length, slidesToShow]);

  const maxSlide = Math.max(0, Math.ceil(collections.length / slidesToShow) - 1);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev <= 0 ? maxSlide : prev - 1));
  };

  // Handle card click navigation
  const handleCardClick = (collection) => {
    navigate('/collection', { 
      state: { 
        selectedCollection: collection.title,
        collectionId: collection.id 
      } 
    });
  };

  return (
    <PageSection>
      <hr />
      <div className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className='text-center text-xl sm:text-2xl md:text-3xl py-4'>
            <Title text1={'CREATED JUST'} text2={'FOR YOU'} />
          </div>

          {/* Carousel Container */}
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Navigation Arrows with white backgrounds */}
            {collections.length > slidesToShow && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30 
                           bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 
                           shadow-lg hover:shadow-xl transition-all duration-300 
                           hover:bg-white hover:scale-110 group border border-gray-200"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-gray-900" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-30 
                           bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 
                           shadow-lg hover:shadow-xl transition-all duration-300 
                           hover:bg-white hover:scale-110 group border border-gray-200"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-gray-900" />
                </button>
              </>
            )}

            {/* Collections Slider */}
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {collections.map((collection, index) => (
                  <div
                    key={collection.id}
                    className="flex-shrink-0 px-1 sm:px-2 md:px-3"
                    style={{ width: `${100 / slidesToShow}%` }}
                  >
                    {/* Responsive aspect ratio container with click functionality */}
                    <div 
                      className="relative h-[370px] sm:h-[350px] md:h-[400px] lg:h-[420px] 
                                overflow-hidden cursor-pointer group transition-all duration-500 
                                hover:shadow-2xl rounded-lg"
                      onClick={() => handleCardClick(collection)}
                    >
                      
                      {/* Image fills entire container */}
                      <div className="absolute inset-0">
                        <img
                          src={collection.image}
                          alt={collection.title}
                          className="w-full h-full object-cover transition-transform duration-700 
                                   group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      {/* Collection Title - Responsive positioning */}
                      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 
                                    right-3 sm:right-4 md:right-6 z-20">
                        <span className="font-bold text-xs sm:text-sm md:text-base 
                                       tracking-widest text-white italiana-regular 
                                       drop-shadow-2xl bg-black/60 backdrop-blur-sm 
                                       px-2 py-1 rounded">
                          {collection.title}
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 
                                    via-transparent to-transparent opacity-0 
                                    group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Click indicator */}
                      <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Auto-slide indicator */}
                      {!isHovered && collections.length > slidesToShow && (
                        <div className="absolute top-3 left-3 z-20">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots - Enhanced for all screen sizes */}
            {collections.length > slidesToShow && (
              <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
                {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-[--gray] scale-125'
                        : 'bg-gray-300 hover:bg-gray-500 hover:scale-110'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Auto-slide status indicator */}
          <div className="text-center mt-4 text-xs text-gray-500">
            {!isHovered && collections.length > slidesToShow ? (
              <span className="inline-flex items-center space-x-1">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                <span className='instrument-sans-regular'>Auto-sliding • Hover to pause</span>
              </span>
            ) : collections.length > slidesToShow ? (
              <span className='instrument-sans-regular'>Auto-slide paused</span>
            ) : null}
          </div>
        </div>
      </div>
      <hr />
    </PageSection>
  );
};

export default CreatedForYou;