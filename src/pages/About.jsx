import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsletterBox from '../components/NewsLetterBox'
import PageSection from '../components/pageSection'
import WhyChooseUs from '../components/WhyChooseUs'

const About = () => {
  return (
    <>
      <div>
        <PageSection className='min-h-screen'>

          <div className='text-2xl  text-center pt-8 mt-[60px] '>
            <Title text1={'ABOUT'} text2={'US'} />
            <p className="text-sm justify-between instrument-sans-regular text-[--green]">Follow instruction for more</p>
          </div>

          <div className='my-10 flex flex-col md:flex-row gap-16 px-4 md:px-8'>
            <img className='w-full md:max-w-[450px] rounded-lg shadow-[--green] shadow-lg mx-auto md:mx-0' src={assets.about_img} alt="" />
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p className='instrument-sans-regular text-justify'>At Fashion Store, we believe fashion is more than just clothing—it's a form of self-expression. Our mission is to provide stylish, high-quality apparel that empowers you to embrace your unique personality and style. From timeless classics to modern trends, our collections are designed to fit your lifestyle effortlessly.

              Each piece in our collection is crafted with care, ensuring comfort, durability, and elegance. Whether you're dressing up for a special occasion or seeking everyday essentials, we're here to help you look and feel your best.

              </p>


              <p className='text-[--gray] italiana-regular'>Our Mission</p>
              <p className='instrument-sans-regular text-justify'>Our mission is to inspire confidence through ethical, stylish, and accessible fashion. We're committed to delivering premium clothing while building a community that values authenticity and sophistication.
              </p>
            </div>
          </div>

          <div className='text-2xl py-4 pt-8 text-center'>
            <Title text1={'DISCOVER'} text2={'YOUR STYLE'} />
          </div>

          <div className="max-w-6xl mx-auto px-4">
                {/* item 1 */}
                <div className="flex flex-col lg:flex-row items-center gap-8 py-8">
                    {/* image */}
                    <div className="w-full lg:w-1/2">
                        <img src={assets.about1} alt="about_image" className="w-full max-w-sm mx-auto rounded-lg shadow-[--green] shadow-lg"/>
                    </div>
                
                    {/* content */}
                    <div className="w-full lg:w-1/2 lg:pl-6">
                        <div className="space-y-4 text-center lg:text-left">
                            <h3 className='text-xl lg:text-2xl instrument-sans-regular leading-tight'>
                                Make your Style That<span className="text-[--peach] instrument-sans-regular"> Speaks for You</span>  
                            </h3>
                            <p className="text-slate-600 instrument-sans-regular leading-relaxed text-justify">
                            Discover a curated collection of modern and timeless fashion pieces designed to celebrate your individuality. From casual wear to statement outfits, we bring you styles that blend comfort, elegance, and confidence effortlessly.
                            </p>
                        </div>
                    </div>
                </div>

                <hr />

                {/* item 2 */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-8 py-8">
                    {/* image */}
                    <div className="w-full lg:w-1/2">
                        <img src={assets.about2} alt="about_image" className="w-full max-w-sm mx-auto rounded-lg shadow-[--green] shadow-lg"/>
                    </div>
                            
                    {/* content */}
                    <div className="w-full lg:w-1/2 lg:pr-6">
                        <div className="space-y-4 text-center lg:text-left">
                            <h3 className='text-xl lg:text-2xl instrument-sans-regular text-black leading-tight'>
                                Come with us, <span className="text-[--peach] instrument-sans-regular">Dress to Impress</span> 
                            </h3>
                            <p className="text-slate-600 instrument-sans-regular leading-relaxed text-justify">
                            Elevate your wardrobe with high-quality fabrics, vibrant designs, and pieces crafted to perfection. Whether you're dressing for work, play, or special occasions, we're here to make sure you look and feel your best.
                            </p>
                        </div>
                    </div>
                </div>

                <hr />

                {/* item 3 */}
                <div className="flex flex-col lg:flex-row items-center gap-8 py-8">
                    {/* image */}
                    <div className="w-full lg:w-1/2">
                        <img src={assets.about3} alt="about_image" className="w-full max-w-sm mx-auto rounded-lg shadow-[--green] shadow-lg"/>
                    </div>
                
                    {/* content */}
                    <div className="w-full lg:w-1/2 lg:pl-6">
                        <div className="space-y-4 text-center lg:text-left">
                            <h3 className='text-xl lg:text-2xl instrument-sans-regular leading-tight'>
                            Where Comfort<span className="text-[--peach] instrument-sans-regular"> Meets Elegance</span> 
                            </h3>
                            <p className="text-slate-600 instrument-sans-regular leading-relaxed text-justify">
                            Experience the perfect blend of comfort and sophistication with our thoughtfully designed apparel. Each piece is crafted with high-quality fabrics to ensure you feel as good as you look. Whether you're lounging at home or stepping out for an event, our collection keeps you effortlessly stylish and at ease.
                            </p>
                        </div>
                    </div>
                </div>

                <hr />
          </div>

        </PageSection>

        <WhyChooseUs />

      </div>

      {/* Full width section outside of PageSection */}
      <section className="w-full bg-[--peach] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="mb-8 text-2xl font-bold leading-tight text-white lg:text-3xl instrument-sans-regular">
              Why we're called 'The Fashion Store'
            </h3>
            
            <div className="space-y-6 text-white">
              <p className="text-base sm:text-md instrument-sans-regular text-justify leading-relaxed">
                It might seem obvious, but there's more to our name than meets the eye. Sure, we're about fashion - but we're about your fashion, not just what's trending. The Fashion Store was created because we believe that true style isn't about following every runway trend or wearing what influencers tell you to wear. It's about discovering pieces that make you feel authentically, unapologetically you.
              </p>

              <p className="text-base sm:text-md instrument-sans-regular text-justify leading-relaxed">
                We curate collections that speak to different personalities, lifestyles, and budgets because we know that fashion should be accessible to everyone. Whether you're a minimalist who loves clean lines, a maximalist who adores bold prints, or someone who switches between both depending on your mood - we've got you covered. Our philosophy is simple: fashion should empower, not intimidate. Every piece in our store is chosen with the belief that when you look good, you feel good, and when you feel good, you can conquer anything. So come as you are, leave as your best self, and let's redefine what fashion means together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div>

        <PageSection>
          <NewsletterBox />
        </PageSection>
          

        
      </div>
    </>
  );
}

export default About