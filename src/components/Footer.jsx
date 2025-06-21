import React from 'react'
import { assets } from '../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFacebookF, faLinkedinIn, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'
import PageSection from './pageSection'


const Footer = () => {
  return (
    <PageSection>
         {/* social icon */}
         <div className=" mt-4 mb-10 ">
            <div className="border-b border-black relative">
                <div className="absolute top-0 transform -translate-y-1/2 left-0 right-0 max-w-40 mx-auto">
                    <div className="bg-white text-lg text-center text-[#FF7272] space-x-3 ">
                        <FontAwesomeIcon icon={faWhatsapp} className='hover:text-green-400 cursor-pointer text-xl' />
                        <FontAwesomeIcon icon={faInstagram} className='hover:text-pink-400 cursor-pointer text-xl' />
                        <FontAwesomeIcon icon={faFacebookF} className='hover:text-sky-400 cursor-pointer text-xl' />
                        <FontAwesomeIcon icon={faXTwitter} className='hover:text-black cursor-pointer text-xl' />
                        <FontAwesomeIcon icon={faLinkedinIn} className='hover:text-blue-400 cursor-pointer text-xl' />
                    </div>
                </div>
            </div>
         </div>

          {/* content  */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 text-center md:text-start">
             {/* item 1  */}
             <div>
                <div className="text-7xl text-[#FF7272] text-center inline-block">
                    <i className="ri-leaf-fill"></i>
                    <p className="italiana-regular  text-xl sm:text-2xl">Fashion Store.</p>
                </div>
             </div>

              {/* item 2 */}
              <div>
                <p className="mb-5 font-bold text-xl instrument-sans-regular text-[--peach]">QUICK LINK</p>

                <div className="flex flex-col gap-1 ">
                  <a href="#" className='instrument-sans-regular hover:text-[--green]'>Topwear</a>
                  <a href="#" className='instrument-sans-regular hover:text-[--green]'>Bottomwear</a>
                  <a href="#" className='instrument-sans-regular hover:text-[--green]'>Footwear</a>
                  <a href="#" className='instrument-sans-regular hover:text-[--green]'>Bestsellers</a>
                  <a href="#" className='instrument-sans-regular hover:text-[--green]'>Accessories</a>
                  <a href="#" className='instrument-sans-regular hover:text-[--green]'>Collection</a>
                </div>
              </div>

            {/* item 3  */}
              <div>
                <p className="mb-5 font-bold text-xl instrument-sans-regular text-[--peach]">POPULAR SERVICES</p>

                <div className="flex flex-col gap-1 ">
                  <a href="#" className='instrument-sans-regular hover:text-[--green]'>Stores Near Me</a>
                  <a href="#" className='instrument-sans-regular hover:text-[--green]'>My Account</a>
                  <a href="#" className='instrument-sans-regular hover:text-[--green]'>My Orders</a>
                  <a href="#" className='instrument-sans-regular hover:text-[--green]'>Membership</a>
                  <a href="#" className='instrument-sans-regular hover:text-[--green]'>More</a>
                </div>
              </div>

              {/* item 4 */}
              <div>
                <p className="mb-5 font-bold text-xl instrument-sans-regular text-[--peach]">MORE INFO</p>

                <div className="flex flex-col gap-1 ">
                    <a href="#" className='instrument-sans-regular hover:text-[--green]'>About Us</a>
                    <a href="#" className='instrument-sans-regular hover:text-[--green]'>T&C</a>
                    <a href="#" className='instrument-sans-regular hover:text-[--green]'>Privacy policy</a>
                    <a href="#" className='instrument-sans-regular hover:text-[--green]'>Community Initiatives</a>
                </div>
              </div>
              

              {/* item 5  */}
              <div>
                <p className="mb-5 font-bold text-xl instrument-sans-regular text-[--peach]">STORE NEAR ME</p>

                <div className="flex flex-col gap-1">
                    <a href="#" className='instrument-sans-regular hover:text-[--green]'>Kolkata</a>
                    <a href="#" className='instrument-sans-regular hover:text-[--green]'>Mumbai</a>
                    <a href="#" className='instrument-sans-regular hover:text-[--green]'>Chennai</a>
                    <a href="#" className='instrument-sans-regular hover:text-[--green]'>Delhi</a>
                    <a href="#" className='instrument-sans-regular hover:text-[--green]'>Bangalore</a>
                    <a href="#" className='instrument-sans-regular hover:text-[--green]'>View More</a>
                     
                </div>
              </div>
              
         </div>

        <div className='mt-5'>
            <p className='instrument-sans-regular py-5 text-sm text-center mt-5 opacity-50'>Copyright 2024 @fashionstore.com - All Rights Reserved</p>
        </div>
    </PageSection>
  )
}

export default Footer
