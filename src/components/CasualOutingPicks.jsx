import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import PageSection from './pageSection'
import Title from './Title'

// Import all casual images
import casual_1 from '../assets/casual_1.jpg' // or .png depending on your file extension
import casual_2 from '../assets/casual_2.jpg'
import casual_3 from '../assets/casual_3.jpg'
import casual_4 from '../assets/casual_4.webp'
import casual_5 from '../assets/casual_5.webp'
import casual_6 from '../assets/casual_6.webp'
import casual_7 from '../assets/casual_7.jpg'
import casual_8 from '../assets/casual_8.jpg'
import casual_9 from '../assets/casual_9.jpg'

const CasualOutingPicks = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const items = [
    { name: "Casual Linen", image: casual_1 },
    { name: "Oversized", image: casual_2 },
    { name: "Textured", image: casual_3 },
    { name: "Striped", image: casual_4 },
    { name: "Vintage", image: casual_5 },
    { name: "Premium", image: casual_6 },
    { name: "Classic", image: casual_7 },
    { name: "Polos", image: casual_8 },
    { name: "Solids", image: casual_9 }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3) % items.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 3 + items.length) % items.length)
  }

  const getVisibleItems = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      visible.push(items[(currentIndex + i) % items.length])
    }
    return visible
  }

  return (
    <PageSection>
      <div className="max-w-7xl mx-auto px-4 bg-white pt-2">
        <div className="text-center text-3xl mb-2">
          <Title text1={'CASUAL OUTING'} text2={'PICKS'} />
        </div>
        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className='text-gray-700 text-2xl hover:text-gray-900'/>
          </button>
         
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded transition-colors"
          >
            <FontAwesomeIcon icon={faChevronRight} className='text-gray-700 text-2xl hover:text-gray-900'/>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500 ease-in-out">
            {getVisibleItems().map((item, index) => (
              <div key={`${item.name}-${currentIndex}-${index}`} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/5]">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/20"></div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-light text-white italiana-regular drop-shadow-lg">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(items.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  Math.floor(currentIndex / 3) === index
                    ? 'bg-gray-800'
                    : 'bg-gray-300 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  )
}

export default CasualOutingPicks