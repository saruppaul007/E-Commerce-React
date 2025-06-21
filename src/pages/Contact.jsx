import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import { assets } from '../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHome, faPhoneVolume } from '@fortawesome/free-solid-svg-icons'
import PageSection from '../components/pageSection'

const Contact = () => {
  return (
    <div className=' text-center pt-8 mt-[81px]'>
      <PageSection>

      <div className='text-2xl'>
        <Title text1={'CONTACT'} text2={'US'} />
         {/* <p className="text-sm justify-between instrument-sans-regular text-[--green]">We'd love to hear from you</p> */}
      </div>

    <section className="relative z-10 overflow-hidden  py-20 lg:py-[120px] dark:bg-dark -mt-24 -mb-10">
    <div className="container mx-auto ">
      <div className="-mx-4 flex flex-wrap lg:justify-between">
        <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
          <div className="mb-12 max-w-[570px] lg:mb-0">
            
            <h2
              className="mb-5 text-xl font-bold uppercase  sm:text-[20px] lg:text-[25px] xl:text-[28px] text-[--peach] italiana-regular ">
              GET IN TOUCH WITH US
            </h2>
            <p className="mb-9 leading-relaxed text-body-color instrument-sans-regular text-md">
            We’re here to assist you with any questions or concerns you may have. Whether you’re looking for product details, need support, or just want to share feedback, our team is ready to help. Don’t hesitate to get in touch – we value your input and are committed to providing the best experience possible
            </p>

            <div className="mb-8 flex w-full max-w-[370px]">
              <div
                className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded-sm bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                <FontAwesomeIcon icon={faHome} className='text-3xl text-[--peach]' />
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-xl font-bold text-dark text-[--peach] italiana-regular">
                  Our Location
                </h4>
                <p className="text-sm text-body-color  instrument-sans-regular">
                  99 S.t Jomblo Park Pekanbaru 28292. Indonesia
                </p>
              </div>
            </div>

            <div className="mb-8 flex w-full max-w-[370px]">
              <div
                className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded-sm bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                <FontAwesomeIcon icon={faPhoneVolume} className='text-3xl text-[--peach]' />
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-xl font-bold text-dark text-[--peach] italiana-regular">
                  Phone Number
                </h4>
                <p className="text-sm text-body-color dark:text-dark-6 instrument-sans-regular">
                  (+62)81 414 257 9980
                </p>
              </div>
            </div>

            <div className="mb-8 flex w-full max-w-[370px]">
              <div
                className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded-sm bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
                <FontAwesomeIcon icon={faEnvelope} className='text-3xl text-[--peach]' />
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-xl font-bold text-dark text-[--peach] italiana-regular">
                  Email Address
                </h4>
                <p className="text-sm text-body-color dark:text-dark-6 instrument-sans-regular">
                  info@yourdomain.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
          <div className="relative rounded-lg bg-white p-8 shadow-lg sm:p-12 dark:bg-dark-2">
            <form>
              <div className="mb-6 flex gap-3">
                <input type="text" placeholder="Your Name"
                  className="w-full rounded-lg border border-stroke px-[14px] py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6" />
                  <input type="text" placeholder="Your Phone"
                  className="w-full rounded-lg border border-stroke px-[14px] py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6" />
              </div>
              <div className="mb-6">
                <input type="email" placeholder="Your Email"
                  className="w-full rounded-lg border border-stroke px-[14px] py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6" />
              </div>
              
              <div className="mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 instrument-sans-regular block text-left">Gender</label>
                  <div className="flex gap-6 justify-start">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="male" 
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-600 accent-green-600 cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 instrument-sans-regular">Male</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="female" 
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-600 accent-green-600 cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 instrument-sans-regular">Female</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="other" 
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-600 accent-green-600 cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 instrument-sans-regular">Other</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <textarea rows="5" placeholder="Your Message"
                  className="w-full resize-none rounded-lg border border-stroke px-[14px] py-3 text-base text-body-color outline-hidden focus:border-primary "></textarea>
              </div>
              <div>
                <button type="submit"
                  className="w-full rounded-lg border border-primary bg-primary p-3 text-white transition bg-[--green] hover:bg-[--gray] instrument-sans-regular">
                  Send Message
                </button>
              </div>
            </form>
            <div>
              

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <hr className='mb-4' />
  <NewsLetterBox />
  
  </PageSection>
  </div>
  )
}

export default Contact
