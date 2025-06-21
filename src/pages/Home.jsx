import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'

import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import Stats from '../components/Stats'
import Categories from '../components/Categories'
import CreatedForYou from '../components/CreatedForYou'
import StyleOfTheWeek from '../components/StylesOfTheWeek'
import CasualOutingPicks from '../components/CasualOutingPicks'
import ShopFor from '../components/ShopFor'

const Home = () => {
  return (
    <div>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Hero />
      </div>
      <LatestCollection />
      <Categories />
      <CreatedForYou />
      <StyleOfTheWeek />
      <CasualOutingPicks />
      <ShopFor />
      <OurPolicy />
      <Stats />
      <NewsLetterBox />
      
    </div>
  )
}

export default Home
