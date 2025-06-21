import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsletterBox from '../components/NewsLetterBox'
import PageSection from '../components/pageSection'
import WhyChooseUs from '../components/WhyChooseUs'

const About = () => {
  return (
    <div>
    <PageSection className='min-h-screen'>

      <div className='text-2xl  text-center pt-8 mt-[81px] '>
        <Title text1={'ABOUT'} text2={'US'} />
        <p className="text-sm justify-between instrument-sans-regular text-[--green]">Follow instruction for more</p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] rounded-lg shadow-[--green] shadow-xl' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>At Fashion Store, we believe fashion is more than just clothing—it's a form of self-expression. Our mission is to provide stylish, high-quality apparel that empowers you to embrace your unique personality and style. From timeless classics to modern trends, our collections are designed to fit your lifestyle effortlessly.

          Each piece in our collection is crafted with care, ensuring comfort, durability, and elegance. Whether you're dressing up for a special occasion or seeking everyday essentials, we're here to help you look and feel your best.

          </p>


          <p className='text-black itim-regular-bold'>Our Mission</p>
          <p>Our mission is to inspire confidence through ethical, stylish, and accessible fashion. We're committed to delivering premium clothing while building a community that values authenticity and sophistication.
          </p>
        </div>
      </div>

      <div className='text-xl py-4 pt-10'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="container space-y-10 xl:space-y-0 gap-y-5">
            {/* item 1 */}
            <div className="flex flex-col items-center lg:flex-row gap-5 pt-10">
                {/* <!-- image --> */}
                 <div className="about__item__1-img w-full lg:w-1/2">
                    <img src={assets.about1} alt="about_image" className="w-full sm:w-1/2 lg:w-full xl:w-2/3 mx-auto rounded-lg shadow-[--green] shadow-xl"/>
                </div>
             

             {/* <!-- content --> */}
              <div className="about__item__1-content w-full lg:w-1/2 ">
                <div className="space-y-5 ">
                    <h3 className='text-xl instrument-sans-regular'>
                        Make your Style That<span className="text-[--peach] instrument-sans-regular"> Speaks for You</span>  
                        
                    </h3>
                    <p className="text-slate-500 instrument-sans-regular">
                    Discover a curated collection of modern and timeless fashion pieces designed to celebrate your individuality. From casual wear to statement outfits, we bring you styles that blend comfort, elegance, and confidence effortlessly.
                    </p>
                </div>
              </div>
            </div>

            {/*  item 2  */}
            <div className="flex flex-col items-center lg:flex-row-reverse gap-5 pt-10 pb-10">
                {/* <!-- image --> */}
                <div className="about__item__2-img w-full lg:w-1/2">
                    <img src={assets.about2} alt="about_image" className="w-full sm:w-2/3 lg:w-full xl:w-2/3 mx-auto rounded-lg shadow-[--green] shadow-xl"/>
                </div>
                         
                {/* <!-- content --> */}
                <div className="about__item__2-content w-full lg:w-1/2 ">
                    <div className="space-y-5 ">
                        <h3 className='text-xl instrument-sans-regular text-black'>
                            Come with us, 
                            <span className="text-[--peach] instrument-sans-regular">      Dress to Impress</span> 
                            
                        </h3>
                        <p className="text-slate-500 instrument-sans-regular">
                        Elevate your wardrobe with high-quality fabrics, vibrant designs, and pieces crafted to perfection. Whether you're dressing for work, play, or special occasions, we're here to make sure you look and feel your best.
                        </p>
                        </div>
                    </div>
            </div>


            {/* item 3 */}
            <div className="flex flex-col items-center lg:flex-row gap-5 pt-10 pb-10">
                {/* <!-- image --> */}
                 <div className="about__item__1-img w-full lg:w-1/2">
                    <img src={assets.about3} alt="about_image" className="w-full sm:w-1/2 lg:w-full xl:w-2/3 mx-auto rounded-lg shadow-[--green] shadow-xl"/>
                </div>
             

             {/* <!-- content --> */}
              <div className="about__item__1-content w-full lg:w-1/2 ">
                <div className="space-y-5 ">
                    <h3 className='text-xl instrument-sans-regular'>
                    Where Comfort<span className="text-[--peach] instrument-sans-regular"> Meets Elegance  </span> 
                    </h3>
                    <p className="text-slate-500 instrument-sans-regular">
                    Experience the perfect blend of comfort and sophistication with our thoughtfully designed apparel. Each piece is crafted with high-quality fabrics to ensure you feel as good as you look. Whether you're lounging at home or stepping out for an event, our collection keeps you effortlessly stylish and at ease.
                    </p>
                </div>
              </div>
            </div>

            <section className="relative z-10 overflow-hidden bg-primary py-16 bg-[--peach] mx-[-135px] ">
            <div className="mx-auto px-4 sm:container">
                <div className="mx-4 flex justify-center flex-wrap align-center">
                <div className="w-full px-4 ">
                    <div className="mx-auto mb-10 max-w-[1200px] text-center lg:mb-0">
                    <h3 className="mb-4 text-xl font-bold leading-[1.2] text-white lg:text-3xl instrument-sans-regular"
                    >Why we're called 'The Fashion Store'</h3>
                    
                    <p className="text-base text-white sm:text-md instrument-sans-regular">
                        It might seem obvious, but there's more to our name than meets the eye. Sure, we're about fashion - but we're about your fashion, not just what's trending. The Fashion Store was created because we believe that true style isn't about following every runway trend or wearing what influencers tell you to wear. It's about discovering pieces that make you feel authentically, unapologetically you.
                    </p>

                    <br />

                    <p className="text-base text-white sm:text-md instrument-sans-regular">
                        We curate collections that speak to different personalities, lifestyles, and budgets because we know that fashion should be accessible to everyone. Whether you're a minimalist who loves clean lines, a maximalist who adores bold prints, or someone who switches between both depending on your mood - we've got you covered. Our philosophy is simple: fashion should empower, not intimidate. Every piece in our store is chosen with the belief that when you look good, you feel good, and when you feel good, you can conquer anything. So come as you are, leave as your best self, and let's redefine what fashion means together.
                    </p>

                    </div>
                </div>

                </div>
            </div>

            
            </section>

            <div>
              
            </div>
            

      </div>

      </PageSection>

      <WhyChooseUs />

      <PageSection>
        <NewsletterBox />
      </PageSection>
        

      
    </div>
  )
}

export default About