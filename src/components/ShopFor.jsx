import React from 'react';
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
  return (
    <PageSection>
      <hr />
      <div className="pb-8">
        {/* Header */}
        <div className="text-center py-6 text-3xl">
          <Title text1={'SHOP'} text2={'FOR'} />
        </div>

        {/* Main Layout Container */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row h-auto lg:h-[420px] gap-8">
            
            {/* Left Section - Men */}
            <div className="flex flex-1">
              <div className="flex-1 relative overflow-hidden group cursor-pointer rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 z-10"></div>
                
                {/* Background Images */}
                <div className="absolute inset-0">
                  <img 
                    src={shopFor_1} 
                    alt="Men's Collection"
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  />
                  <img 
                    src={shopFor_1_hover} 
                    alt="Men's Collection Hover"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500"></div>
                </div>
                
                <div className="relative h-full flex flex-col justify-between p-8 lg:p-10">
                  {/* Product Area */}
                  <div className="flex-1 flex items-center justify-center">
                  </div>
                  
                  {/* Label */}
                  <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg transform transition-all duration-300 group-hover:bg-white group-hover:scale-105 w-32 mx-auto">
                    <h2 className="text-[--gray] text-xl font-bold text-center tracking-wider instrument-sans-regular">MEN</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section - Women */}
            <div className="flex flex-1">
              <div className="flex-1 relative overflow-hidden group cursor-pointer rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 z-10"></div>
                
                {/* Background Images */}
                <div className="absolute inset-0">
                  <img 
                    src={shopFor_2} 
                    alt="Women's Collection"
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  />
                  <img 
                    src={shopFor_2_hover} 
                    alt="Women's Collection Hover"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-rose-500/20 to-transparent group-hover:from-rose-900/70 transition-all duration-500"></div>
                </div>
                
                <div className="relative h-full flex flex-col justify-between p-8 lg:p-10">
                  {/* Product Area */}
                  <div className="flex-1 flex items-center justify-center">
                  </div>
                  
                  {/* Label */}
                  <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg transform transition-all duration-300 group-hover:bg-white group-hover:scale-105 w-32 mx-auto">
                    <h2 className="text-[--gray] text-xl font-bold text-center tracking-wider instrument-sans-regular">WOMEN</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Kids */}
            <div className="flex flex-1">
              <div className="flex-1 relative overflow-hidden group cursor-pointer rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 z-10"></div>
                
                {/* Background Images */}
                <div className="absolute inset-0">
                  <img 
                    src={shopFor_3} 
                    alt="Kids Collection"
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  />
                  <img 
                    src={shopFor_3_hover} 
                    alt="Kids Collection Hover"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-500/20 to-transparent group-hover:from-blue-900/70 transition-all duration-500"></div>
                </div>
                
                <div className="relative h-full flex flex-col justify-between p-8 lg:p-10">
                  {/* Product Area */}
                  <div className="flex-1 flex items-center justify-center">
                  </div>
                  
                  {/* Label */}
                  <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg transform transition-all duration-300 group-hover:bg-white group-hover:scale-105 w-32 mx-auto">
                    <h2 className="text-[--gray] text-xl font-bold text-center tracking-wider instrument-sans-regular">KIDS</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Horizontal rule below the divs */}
        <hr className="mt-8" />
        
      </div>
      
    </PageSection>
  );
};

export default ShopFor;