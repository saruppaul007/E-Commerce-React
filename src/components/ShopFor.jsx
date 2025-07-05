import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageSection from './pageSection';
import Title from "./Title";

// Import images
import shopFor_1 from '../assets/shopFor_1.jpg'; // Men
import shopFor_1_hover from '../assets/shopFor_1_hover.jpg'; // Men hover
import shopFor_2 from '../assets/shopFor_2.jpg'; // Women
import shopFor_2_hover from '../assets/shopFor_2_hover.jpg'; // Women hover
import shopFor_3 from '../assets/shopFor_3.jpg'; // Kids
import shopFor_3_hover from '../assets/shopFor_3_hover.jpg'; // Kids hover

const ShopFor = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // Navigate to collection page with category filter
    navigate(`/collection?category=${category.toLowerCase()}`);
  };

  return (
    <PageSection>
      <hr />
      <div className="pb-4 sm:pb-2 md:pb-4 lg:pb-4">
        {/* Header */}
        <div className="text-center py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6">
          <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl">
            <Title text1={'SHOP'} text2={'FOR'} />
          </div>
        </div>

        {/* Main Layout Container */}
        <div className="w-full max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">
          {/* Mobile First - Stacked Layout (xs to sm) */}
          <div className="flex flex-col sm:hidden gap-3 xs:gap-4">
            {/* Men - Mobile */}
            <div className="w-full h-[220px] xs:h-[250px]">
              <div 
                className="relative w-full h-full overflow-hidden group cursor-pointer rounded-lg shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
                onClick={() => handleCategoryClick('men')}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 z-10"></div>
                
                {/* Background Images */}
                <div className="absolute inset-0">
                  <img 
                    src={shopFor_1} 
                    alt="Men's Collection"
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                    loading="lazy"
                  />
                  <img 
                    src={shopFor_1_hover} 
                    alt="Men's Collection Hover"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500"></div>
                </div>
                
                <div className="relative h-full flex flex-col justify-between p-3 xs:p-4">
                  {/* Product Area */}
                  <div className="flex-1 flex items-center justify-center">
                  </div>
                  
                  {/* Label */}
                  <div className="bg-white/90 backdrop-blur-md p-2 xs:p-2.5 rounded-lg shadow-lg transform transition-all duration-300 group-hover:bg-white group-hover:scale-105 w-16 xs:w-20 mx-auto">
                    <h2 className="text-[--gray] text-sm xs:text-base font-bold text-center tracking-wider italiana-regular">Men</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Women - Mobile */}
            <div className="w-full h-[220px] xs:h-[250px]">
              <div 
                className="relative w-full h-full overflow-hidden group cursor-pointer rounded-lg shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
                onClick={() => handleCategoryClick('women')}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 z-10"></div>
                
                {/* Background Images */}
                <div className="absolute inset-0">
                  <img 
                    src={shopFor_2} 
                    alt="Women's Collection"
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                    loading="lazy"
                  />
                  <img 
                    src={shopFor_2_hover} 
                    alt="Women's Collection Hover"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-rose-500/20 to-transparent group-hover:from-rose-900/70 transition-all duration-500"></div>
                </div>
                
                <div className="relative h-full flex flex-col justify-between p-3 xs:p-4">
                  {/* Product Area */}
                  <div className="flex-1 flex items-center justify-center">
                  </div>
                  
                  {/* Label */}
                  <div className="bg-white/90 backdrop-blur-md p-2 xs:p-2.5 rounded-lg shadow-lg transform transition-all duration-300 group-hover:bg-white group-hover:scale-105 w-20 xs:w-24 mx-auto">
                    <h2 className="text-[--gray] text-sm xs:text-base font-bold text-center tracking-wider italiana-regular">Women</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Kids - Mobile */}
            <div className="w-full h-[220px] xs:h-[250px]">
              <div 
                className="relative w-full h-full overflow-hidden group cursor-pointer rounded-lg shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
                onClick={() => handleCategoryClick('kids')}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 z-10"></div>
                
                {/* Background Images */}
                <div className="absolute inset-0">
                  <img 
                    src={shopFor_3} 
                    alt="Kids Collection"
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                    loading="lazy"
                  />
                  <img 
                    src={shopFor_3_hover} 
                    alt="Kids Collection Hover"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-500/20 to-transparent group-hover:from-blue-900/70 transition-all duration-500"></div>
                </div>
                
                <div className="relative h-full flex flex-col justify-between p-3 xs:p-4">
                  {/* Product Area */}
                  <div className="flex-1 flex items-center justify-center">
                  </div>
                  
                  {/* Label */}
                  <div className="bg-white/90 backdrop-blur-md p-2 xs:p-2.5 rounded-lg shadow-lg transform transition-all duration-300 group-hover:bg-white group-hover:scale-105 w-16 xs:w-20 mx-auto">
                    <h2 className="text-[--gray] text-sm xs:text-base font-bold text-center tracking-wider italiana-regular">Kids</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet and Desktop Layout (sm and up) */}
          <div className="hidden sm:flex sm:flex-row h-[280px] sm:h-[300px] md:h-[350px] lg:h-[420px] xl:h-[450px] gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
            
            {/* Left Section - Men */}
            <div className="flex flex-1">
              <div 
                className="flex-1 relative overflow-hidden group cursor-pointer rounded-lg shadow-lg sm:shadow-xl md:shadow-xl lg:shadow-2xl transform transition-all duration-500 hover:scale-[1.02] sm:hover:scale-[1.03] md:hover:scale-[1.04] lg:hover:scale-[1.05] hover:shadow-xl sm:hover:shadow-2xl md:hover:shadow-2xl lg:hover:shadow-3xl"
                onClick={() => handleCategoryClick('men')}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 z-10"></div>
                
                {/* Background Images */}
                <div className="absolute inset-0">
                  <img 
                    src={shopFor_1} 
                    alt="Men's Collection"
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                    loading="lazy"
                  />
                  <img 
                    src={shopFor_1_hover} 
                    alt="Men's Collection Hover"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500"></div>
                </div>
                
                <div className="relative h-full flex flex-col justify-between p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7">
                  {/* Product Area */}
                  <div className="flex-1 flex items-center justify-center">
                  </div>
                  
                  {/* Label */}
                  <div className="bg-white/90 backdrop-blur-md p-2 sm:p-2.5 md:p-3 lg:p-3.5 xl:p-4 rounded-lg sm:rounded-xl shadow-lg transform transition-all duration-300 group-hover:bg-white group-hover:scale-105 w-18 sm:w-20 md:w-24 lg:w-28 xl:w-32 mx-auto">
                    <h2 className="text-[--gray] text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl font-bold text-center tracking-wider italiana-regular">Men</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section - Women */}
            <div className="flex flex-1">
              <div 
                className="flex-1 relative overflow-hidden group cursor-pointer rounded-lg shadow-lg sm:shadow-xl md:shadow-xl lg:shadow-2xl transform transition-all duration-500 hover:scale-[1.02] sm:hover:scale-[1.03] md:hover:scale-[1.04] lg:hover:scale-[1.05] hover:shadow-xl sm:hover:shadow-2xl md:hover:shadow-2xl lg:hover:shadow-3xl"
                onClick={() => handleCategoryClick('women')}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 z-10"></div>
                
                {/* Background Images */}
                <div className="absolute inset-0">
                  <img 
                    src={shopFor_2} 
                    alt="Women's Collection"
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                    loading="lazy"
                  />
                  <img 
                    src={shopFor_2_hover} 
                    alt="Women's Collection Hover"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-rose-500/20 to-transparent group-hover:from-rose-900/70 transition-all duration-500"></div>
                </div>
                
                <div className="relative h-full flex flex-col justify-between p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7">
                  {/* Product Area */}
                  <div className="flex-1 flex items-center justify-center">
                  </div>
                  
                  {/* Label */}
                  <div className="bg-white/90 backdrop-blur-md p-2 sm:p-2.5 md:p-3 lg:p-3.5 xl:p-4 rounded-lg sm:rounded-xl shadow-lg transform transition-all duration-300 group-hover:bg-white group-hover:scale-105 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 mx-auto">
                    <h2 className="text-[--gray] text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl font-bold text-center tracking-wider italiana-regular">Women</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Kids */}
            <div className="flex flex-1">
              <div 
                className="flex-1 relative overflow-hidden group cursor-pointer rounded-lg shadow-lg sm:shadow-xl md:shadow-xl lg:shadow-2xl transform transition-all duration-500 hover:scale-[1.02] sm:hover:scale-[1.03] md:hover:scale-[1.04] lg:hover:scale-[1.05] hover:shadow-xl sm:hover:shadow-2xl md:hover:shadow-2xl lg:hover:shadow-3xl"
                onClick={() => handleCategoryClick('kids')}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 z-10"></div>
                
                {/* Background Images */}
                <div className="absolute inset-0">
                  <img 
                    src={shopFor_3} 
                    alt="Kids Collection"
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                    loading="lazy"
                  />
                  <img 
                    src={shopFor_3_hover} 
                    alt="Kids Collection Hover"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                    loading="lazy"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-500/20 to-transparent group-hover:from-blue-900/70 transition-all duration-500"></div>
                </div>
                
                <div className="relative h-full flex flex-col justify-between p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7">
                  {/* Product Area */}
                  <div className="flex-1 flex items-center justify-center">
                  </div>
                  
                  {/* Label */}
                  <div className="bg-white/90 backdrop-blur-md p-2 sm:p-2.5 md:p-3 lg:p-3.5 xl:p-4 rounded-lg sm:rounded-xl shadow-lg transform transition-all duration-300 group-hover:bg-white group-hover:scale-105 w-18 sm:w-20 md:w-24 lg:w-28 xl:w-32 mx-auto">
                    <h2 className="text-[--gray] text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl font-bold text-center tracking-wider italiana-regular">Kids</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Horizontal rule below the divs */}
        <hr className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12" />
        
      </div>
      
    </PageSection>
  );
};

export default ShopFor;