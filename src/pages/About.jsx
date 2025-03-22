import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsletterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores est alias nemo ex nulla saepe soluta eos atque, vitae earum magni odit molestias, facilis rem, rerum ut sed eaque possimus. Beatae nam repellendus iure!</p>

          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur officiis, cumque dicta consectetur ipsa quos aliquid minima. Qui harum voluptate doloribus, fugiat maxime accusantium?</p>

          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo repellat? Obcaecati voluptatum reiciendis minus laboriosam omnis recusandae, libero illo, autem inventore saepe impedit facilis ab dolorem nesciunt eos error, ipsam assumenda.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci quisquam harum optio vero cupiditate, dolorum neque recusandae totam aut placeat voluptates eos veritatis consectetur temporibus error et ex dolore iure atque amet nobis. Quos, laborum.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci quisquam harum optio vero cupiditate, dolorum neque recusandae totam aut placeat voluptates eos veritatis consectetur temporibus error et ex dolore iure atque amet nobis. Quos, laborum.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service </b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci quisquam harum optio vero cupiditate, dolorum neque recusandae totam aut placeat voluptates eos veritatis consectetur temporibus error et ex dolore iure atque amet nobis. Quos, laborum.</p>
        </div>
      </div>

      <NewsletterBox />

      
    </div>
  )
}

export default About
