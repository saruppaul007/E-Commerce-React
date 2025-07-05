import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Title from './Title';
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
      bgColor: 'bg-gray-200',
      route: '/collection'
    },
    {
      id: 'oversized-tshirts',
      title: 'OVERSIZED T-SHIRTS',
      image: category3,
      bgColor: 'bg-gray-100',
      route: '/collection'
    },
    {
      id: 'tops',
      title: 'TOPS',
      image: category4,
      bgColor: 'bg-yellow-50',
      route: '/collection'
    },
    {
      id: 'sneakers',
      title: 'SNEAKERS',
      image: category5,
      bgColor: 'bg-gray-900',
      route: '/collection'
    },
    {
      id: 'dresses-jumpsuits',
      title: 'JUMPSUITS',
      image: category6,
      bgColor: 'bg-green-400',
      route: '/collection'
    },
    {
      id: 'jackets',
      title: 'JACKETS',
      image: category7,
      bgColor: 'bg-blue-100',
      route: '/collection'
    },
    {
      id: 'Bottoms',
      title: 'ALL BOTTOMS',
      image: category8,
      bgColor: 'bg-orange-100',
      route: '/collection'
    },
    {
      id: 'accessories',
      title: 'ACCESSORIES',
      image: category9,
      bgColor: 'bg-pink-100',
      route: '/collection'
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
    <Link
      key={category.id}
      to={category.route}
      className={`relative ${
        isMobile === 'phone' 
          ? 'h-48' // Reduced from h-72 (288px) to h-48 (192px) for mobile
          : 'h-72'
      } rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ease-out block ${
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
        <span className={`font-bold ${
          isMobile === 'phone' 
            ? 'text-sm' // Reduced font size for mobile
            : 'text-md'
        } tracking-wider transition-all duration-300 italiana-regular text-white drop-shadow-lg ${
          hoveredCategory === category.id 
            ? 'text-base' 
            : ''
        }`}>
          {category.title}
        </span>
      </div>

      {/* Hover Effect Shine */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-700 ${
        hoveredCategory === category.id 
          ? 'translate-x-full opacity-100' 
          : '-translate-x-full opacity-0'
      }`} />

      {/* Click indicator for better UX */}
      <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
        hoveredCategory === category.id 
          ? 'opacity-100 transform translate-x-0' 
          : 'opacity-0 transform translate-x-2'
      }`}>
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
          <ArrowRight className={`${
            isMobile === 'phone' 
              ? 'w-3 h-3' // Smaller arrow for mobile
              : 'w-4 h-4'
          } text-white`} />
        </div>
      </div>
    </Link>
  );

  return (
    <PageSection>
      <div className="bg-white px-6 pb-4"> {/* Removed min-h-screen and reduced bottom padding */}
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className='text-center text-3xl py-4'>
            <Title text1={'MAIN'} text2={'CATEGORIES'} />
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
                        <div className="grid grid-cols-2 gap-x-2 gap-y-2 px-2"> {/* Removed fixed height */}
                          {categories
                            .slice(slideIndex * 4, slideIndex * 4 + 4)
                            .map((category) => (
                              <div key={category.id} className="h-48"> {/* Reduced from h-[305px] to h-48 */}
                                {renderCategoryCard(category)}
                              </div>
                            ))}
                        </div>
                      )}
                      
                      {/* Tablet Layout: 3 Items in Row */}
                      {isMobile === 'tablet' && (
                        <div className="grid grid-cols-3 gap-3 px-2">
                          {categories
                            .slice(slideIndex * 3, slideIndex * 3 + 3)
                            .map((category) => renderCategoryCard(category))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows - Adjusted position for smaller cards */}
              {isMobile === 'phone' && (
                <>
                  <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-44 bg-white/50 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300 z-20" // Adjusted positioning
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" /> {/* Reduced from w-8 h-8 to w-6 h-6 */}
                  </button>

                  <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-44 bg-white/50 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300 z-20" // Adjusted positioning
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" /> {/* Reduced from w-8 h-8 to w-6 h-6 */}
                  </button>
                </>
              )}
              
              {isMobile === 'tablet' && (
                <>
                  <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 z-20"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-800" />
                  </button>

                  <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 z-20"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-800" />
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
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </PageSection>
  );
};

export default FashionCategories;