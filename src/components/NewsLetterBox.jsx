import React from 'react'
import PageSection from './pageSection';

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <PageSection>
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800 italiana-regular'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3 instrument-sans-regular text-sm'>Join our community and stay updated with the latest offers, exclusive deals, and product updates. Sign up today and enjoy a 20% discount on your first purchase. <br />
      <span className="text-[--peach] instrument-sans-regular text-md">Don’t miss out !!!</span></p>
      
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-l-lg'>
        <input className='w-full sm:flex-1 outline-none instrument-sans-regular' type="email" placeholder="Enter your email" required/>
        <button type='submit' className='bg-black text-white text-sm px-10 py-4 rounded-r-lg itim-regular-bold'>SUBSCRIBE</button>
      </form>

    </div>
    </PageSection>
  )
}

export default NewsLetterBox
