import React, { useState, useEffect } from 'react';
import Title from './Title';
import PageSection from './pageSection';
import {assets} from '../assets/assets';

// Custom arrow components with white color and shadow
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
    }
  ];

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(2); // 2 items on mobile
      } else {
        setSlidesToShow(3); // 3 items on desktop
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

  const maxSlide = Math.max(0, Math.ceil(collections.length / slidesToShow) - 1);

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  return (
    <PageSection>
      <hr />
      <div className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className='text-center text-2xl md:text-3xl py-4'>
            <Title text1={'CREATED JUST'} text2={'FOR YOU'} />
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Arrows - positioned over corner images */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-30 transition-all duration-300 ${
                currentSlide === 0 
                  ? 'text-gray-400 cursor-not-allowed opacity-50' 
                  : 'text-white hover:text-gray-200 hover:scale-125 drop-shadow-2xl'
              }`}
              style={{ filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.8))' }}
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlide >= maxSlide}
              className={`absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-30 transition-all duration-300 ${
                currentSlide >= maxSlide 
                  ? 'text-gray-400 cursor-not-allowed opacity-50' 
                  : 'text-white hover:text-gray-200 hover:scale-125 drop-shadow-2xl'
              }`}
              style={{ filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.8))' }}
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Collections Slider */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {collections.map((collection, index) => (
                  <div
                    key={collection.id}
                    className="flex-shrink-0 px-2 md:px-3"
                    style={{ width: `${100 / slidesToShow}%` }}
                  >
                    {/* Square aspect ratio container */}
                    <div className="relative h-[420px] overflow-hidden cursor-pointer group transition-all duration-500 hover:shadow-2xl">
                      
                      {/* Image fills entire container */}
                      <div className="absolute inset-0">
                        <img
                          src={collection.image}
                          alt={collection.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Collection Title - Positioned in lower right */}
                      <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 z-20">
                        <span className="font-bold text-md md:text-sm tracking-widest text-black italiana-regular drop-shadow-lg">
                          {collection.title}
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots - Mobile only */}
            <div className="flex justify-center mt-4 space-x-2 md:hidden">
              {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index
                      ? 'bg-gray-800'
                      : 'bg-gray-300 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr />
    </PageSection>
  );
};

export default CreatedForYou;