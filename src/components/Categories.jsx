import React, { useState, useEffect } from 'react';
import TitleSameWord from './TitleSameWord';
import category1 from '../assets/category1.png'; 
import category2 from '../assets/category2.png'; 
import category3 from '../assets/category3.png';
import category4 from '../assets/category4.png';
import category5 from '../assets/category5.png';
import category6 from '../assets/category6.png';
import category7 from '../assets/category7.png';
import category8 from '../assets/category8.png';
import category9 from '../assets/category9.png';
import PageSection from './pageSection';

const FashionCategories = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const categories = [
    {
      id: 'shirts',
      title: 'SHIRTS',
      image: category1,
      bgColor: 'bg-gray-200'
    },
    {
      id: 'jeans',
      title: 'JEANS',
      image: category2,
      bgColor: 'bg-purple-100'
    },
    {
      id: 'oversized-tshirts',
      title: 'OVERSIZED T-SHIRTS',
      image: category3,
      bgColor: 'bg-gray-100'
    },
    {
      id: 'tops',
      title: 'TOPS',
      image: category4,
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'sneakers',
      title: 'SNEAKERS',
      image: category5,
      bgColor: 'bg-gray-900'
    },
    {
      id: 'dresses-jumpsuits',
      title: 'JUMPSUITS',
      image: category6,
      bgColor: 'bg-green-400'
    },
    {
      id: 'jackets',
      title: 'JACKETS',
      image: category7,
      bgColor: 'bg-blue-100'
    },
    {
      id: 'cargos',
      title: 'CARGOS',
      image: category8,
      bgColor: 'bg-orange-100'
    },
    {
      id: 'accessories',
      title: 'ACCESSORIES',
      image: category9,
      bgColor: 'bg-pink-100'
    }
  ];

  // Check screen size for different layouts
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) { // sm breakpoint - phone
        setIsMobile('phone');
      } else if (width < 1024) { // lg breakpoint - tablet
        setIsMobile('tablet');
      } else { // desktop
        setIsMobile(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculate total slides based on device type
  const getItemsPerSlide = () => {
    if (isMobile === 'phone') return 4; // 2x2 grid
    if (isMobile === 'tablet') return 3; // 3 items per slide
    return 0; // desktop uses grid
  };

  const totalSlides = isMobile ? Math.ceil(categories.length / getItemsPerSlide()) : 0;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const renderCategoryCard = (category) => (
    <div
      key={category.id}
      className={`relative h-80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out ${
        hoveredCategory === category.id 
          ? 'shadow-2xl' 
          : 'shadow-lg hover:shadow-xl'
      } ${category.bgColor} ${isMobile ? 'flex-shrink-0 w-full' : ''}`}
      onMouseEnter={() => setHoveredCategory(category.id)}
      onMouseLeave={() => setHoveredCategory(null)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={category.image}
          alt={category.title}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            hoveredCategory === category.id 
              ? 'scale-110 brightness-110' 
              : 'scale-100 brightness-95'
          }`}
        />
      </div>

      {/* Overlay Gradient */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        hoveredCategory === category.id 
          ? 'bg-gradient-to-t from-black/60 via-black/20 to-transparent' 
          : 'bg-gradient-to-t from-black/40 via-black/10 to-transparent'
      }`} />


      {/* Category Label */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <span className={`font-bold text-md tracking-wider transition-all duration-300 italiana-regular text-white drop-shadow-lg ${
          hoveredCategory === category.id 
            ? 'text-base' 
            : ''
        }`}>
          {category.title}
        </span>


        {/* Discount Tags */}
        {category.id === 'jeans' && (
          <div className="px-3 py-2 bg-[#69af6d] text-white rounded-full text-xs font-semibold shadow-md itim-regular-bold">
            20% OFF
          </div>
        )}
        {category.id === 'tops' && (
          <div className="px-3 py-2 bg-[#69af6d] text-white rounded-full text-xs font-semibold shadow-md itim-regular-bold">
            Upto 30% OFF
          </div>
        )}
        {category.id === 'sneakers' && (
          <div className="px-3 py-2 bg-[#69af6d] text-white rounded-full text-xs font-semibold shadow-md itim-regular-bold">
            15% OFF
          </div>
        )}
        {category.id === 'cargos' && (
          <div className="px-3 py-2 bg-[#69af6d] text-white rounded-full text-xs font-semibold shadow-md itim-regular-bold">
            Upto 20% OFF
          </div>
        )}
      </div>

      {/* Hover Effect Shine */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-700 ${
        hoveredCategory === category.id 
          ? 'translate-x-full opacity-100' 
          : '-translate-x-full opacity-0'
      }`} />
    </div>
  );

  return (
    <PageSection>
      <div className="min-h-screen bg-white px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className='text-center text-3xl py-4'>
            <TitleSameWord text={<><span className='italiana-regular'>CATEGO</span><span className="text-[#FF7272] italiana-regular">RIES</span></>} />
          </div>
          
          {/* Desktop Grid */}
          {!isMobile && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => renderCategoryCard(category))}
            </div>
          )}

          {/* Mobile/Tablet Carousel */}
          {isMobile && (
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }, (_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      {/* Phone Layout: 2x2 Grid */}
                      {isMobile === 'phone' && (
                        <div className="grid grid-cols-2 grid-rows-2 gap-3 px-2 h-[640px]">
                          {categories
                            .slice(slideIndex * 4, slideIndex * 4 + 4)
                            .map((category) => (
                              <div key={category.id} className="h-80">
                                {renderCategoryCard(category)}
                              </div>
                            ))}
                        </div>
                      )}
                      
                      {/* Tablet Layout: 3 Items in Row */}
                      {isMobile === 'tablet' && (
                        <div className="grid grid-cols-3 gap-4 px-2">
                          {categories
                            .slice(slideIndex * 3, slideIndex * 3 + 3)
                            .map((category) => renderCategoryCard(category))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 z-10"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 z-10"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalSlides }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-[#FF7272] scale-110' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Swipe Indicators */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500 italiana-regular">
                  {isMobile === 'phone' 
                    ? 'Swipe to browse categories (4 per page)' 
                    : 'Swipe to browse categories (3 per page)'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageSection>
  );
};

export default FashionCategories;