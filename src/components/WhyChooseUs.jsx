import React from 'react';
import Title from './Title';


const WhyChooseUs = () => {
  return (
    <div>
      <div className='text-center py-4 text-3xl'>
        <Title text1={'WHY CHOOSE'} text2={'US'} />
      </div>
      <section
         className="bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: 'url("src/assets/whyChooseUs.jpg")', height: "500px" }} 
      >
        <div className="bg-black bg-opacity-40 h-full flex flex-col items-center justify-center px-4">
          {/* Statistics Row */}
          <div className="max-w-6xl mx-auto flex items-center justify-center text-white mb-8">
            {/* Stat 1 */}
            <div className="text-left px-8">
              <h3 className="text-3xl md:text-5xl font-extrabold mb-2 itim-regular">15+</h3>
              <p className="text-lg md:text-xl instrument-sans-regular">Categories</p>
            </div>
            
            {/* Divider */}
            <div className="h-16 w-px bg-white opacity-100 mx-4"></div>
            
            {/* Stat 2 */}
            <div className="text-center px-8">
              <h3 className="text-3xl md:text-5xl font-extrabold mb-2 itim-regular text-left">50+</h3>
              <p className="text-lg md:text-xl instrument-sans-regular">Unique Prints</p>
              
            </div>
            
            {/* Divider */}
            <div className="h-16 w-px bg-white opacity-100 mx-4"></div>
            
            {/* Stat 3 */}
            <div className="text-center px-8">
              <h3 className="text-3xl md:text-5xl font-extrabold mb-2 itim-regular text-left">75+</h3>
              <p className="text-lg md:text-xl instrument-sans-regular">Colour Patterns</p>
            </div>
          </div>
          
          {/* Second Row of Statistics */}
          <div className="max-w-6xl mx-auto flex items-center justify-center text-white mb-8">
            {/* Stat 4 */}
            <div className="text-center px-8">
              <h3 className="text-3xl md:text-5xl font-extrabold mb-2 itim-regular">Versatile</h3>
              <p className="text-lg md:text-xl instrument-sans-regular text-left">Fabric</p>
            </div>
            
            {/* Divider */}
            <div className="h-16 w-px bg-white opacity-100 mx-4"></div>
            
            {/* Stat 5 */}
            <div className="text-center px-8">
              <h3 className="text-3xl md:text-5xl font-extrabold mb-2 itim-regular">14 Days</h3>
              <p className="text-lg md:text-xl instrument-sans-regular text-left">Exchange Policy</p>
            </div>
            
            {/* Divider */}
            <div className="h-16 w-px bg-white opacity-100 mx-4"></div>
            
            {/* Stat 6 */}
            <div className="text-center px-8">
              <h3 className="text-3xl md:text-5xl font-extrabold mb-2 itim-regular">1 Lacs+</h3>
              <p className="text-lg md:text-xl instrument-sans-regular text-left">Happy Customers</p>
            </div>
          </div>
          
          {/* Proudly Made in India */}
          <div className="text-center text-white">
            <p className="text-2xl md:text-2xl font-semibold instrument-sans-regular">Proudly Made in India</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;