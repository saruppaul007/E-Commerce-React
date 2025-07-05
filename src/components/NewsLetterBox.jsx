import React from 'react'
import PageSection from './pageSection';

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <PageSection>
    <div className='text-center px-4 sm:px-6 lg:px-8'>
      {/* Main Heading - Responsive Typography */}
      <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 italiana-regular'>
        Subscribe now & get 20% off
      </p>
      
      {/* Description Text - Responsive Typography and Spacing */}
      <p className='text-gray-400 mt-2 sm:mt-3 lg:mt-4 instrument-sans-regular text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed'>
        Join our community and stay updated with the latest offers, exclusive deals, and product updates. Sign up today and enjoy a 20% discount on your first purchase.
        <br className="hidden sm:block" />
        <span className="block sm:inline mt-1 sm:mt-0">
          <span className="text-[--peach] instrument-sans-regular text-sm sm:text-md font-medium">
            Don't miss out !!!
          </span>
        </span>
      </p>
      
      {/* Form - Responsive Layout */}
      <form 
        onSubmit={onSubmitHandler} 
        className='w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto mt-4 sm:mt-6 lg:mt-8'
      >
        {/* Mobile: Stacked Layout, Desktop: Side-by-side */}
        <div className='flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0'>
          <input 
            className='w-full sm:flex-1 outline-none instrument-sans-regular px-4 py-4 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-sm sm:text-base h-12 sm:h-14' 
            type="email" 
            placeholder="Enter your email" 
            required
          />
          <button 
            type='submit' 
            className='bg-black text-white text-sm font-medium px-6 lg:px-10 py-4 rounded-lg sm:rounded-l-none sm:rounded-r-lg instrument-sans-regular hover:bg-[--gray] transition-colors duration-200 whitespace-nowrap h-12 sm:h-14'
          >
            SUBSCRIBE
          </button>
        </div>

        <p className='text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 lg:mt-6 max-w-lg mx-auto leading-relaxed instrument-sans-regular'>
            By subscribing, you agree to our 
            <a href="#" className='text-[--peach] underline ml-1 instrument-sans-regular'>
              Privacy Policy
            </a> and 
            <a href="#" className='text-[--peach] underline ml-1 instrument-sans-regular'>
              Terms of Service
            </a>.
          </p>
      </form>

    </div>
    </PageSection>
  )
}

export default NewsLetterBox