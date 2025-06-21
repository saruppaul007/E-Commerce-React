import React from 'react'
import { assets } from '../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones, faCoins, faShirt, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import PageSection from './pageSection'

const OurPolicy = () => {
  return (
    <PageSection>
    <div className="bg-white text-[#FF7272] pt-0 pb-16 mb-12">
        <div className="container w-full grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* card 1 */}
             <div className="service__card border border-[#FF7272] p-5 cursor-pointer rounded-lg hover:shadow-2xl hover:-translate-y-1 duration-300 space-y-5">
                <div className="flex items-center gap-5">
                    <FontAwesomeIcon icon={faTruckFast} className=" ri-truck-line text-3xl md:text-4xl xl:text-5xl"></FontAwesomeIcon>
                    <p className="md:text-lg itim-regular-bold">
                        Fast <br/>
                        Delivery
                    </p>
                </div>
                <p className="instrument-sans-regular ">
                Get your orders delivered in record time! We ensure speed and reliability for your convenience.
                </p>
             </div>
              {/* card 2  */}
              <div className="service__card border border-[#FF7272] p-5 cursor-pointer rounded-lg hover:shadow-2xl hover:-translate-y-1 duration-300 space-y-5">
                <div className="flex items-center gap-5">
                    <FontAwesomeIcon icon={faHeadphones} className="ri-customer-service-line text-3xl md:text-4xl xl:text-5xl"></FontAwesomeIcon>
                    <p className="md:text-lg itim-regular-bold">
                        Great Customer <br/>
                        Service                        
                    </p>
                </div>
                <p className="instrument-sans-regular ">
                Our dedicated team is here to assist you 24/7. Your satisfaction is our top priority.
                </p>
             </div>
               {/* card 3  */}
              <div className="service__card border border-[#FF7272] p-5 cursor-pointer rounded-lg hover:shadow-2xl hover:-translate-y-1 duration-300 space-y-5">
                <div className="flex items-center gap-5">
                    <FontAwesomeIcon icon={faShirt} className="ri-plant-line text-3xl md:text-4xl xl:text-5xl"></FontAwesomeIcon>
                    <p className="md:text-lg itim-regular-bold">
                        Original <br/>
                        Threads
                    </p>
                </div>
                <p className="instrument-sans-regular ">
                Discover unique and stylish designs crafted to make you stand out from the crowd.
                </p>
             </div>
               {/* card 4  */}
              <div className="service__card border border-[#FF7272] p-5 cursor-pointer rounded-lg hover:shadow-2xl hover:-translate-y-1 duration-300 space-y-5">
                <div className="flex items-center gap-5">
                    <FontAwesomeIcon icon={faCoins} className="ri-money-dollar-circle-line text-3xl md:text-4xl xl:text-5xl"></FontAwesomeIcon>
                    <p className="md:text-lg itim-regular-bold">
                        Affordable <br/>
                        Price
                    </p>
                </div>
                <p className="instrument-sans-regular ">
                Enjoy premium quality products at prices that won't break the bank. Value for every dollar!
                </p>
             </div>
        </div>
    </div>
    <hr />
    </PageSection>
  )
}

export default OurPolicy