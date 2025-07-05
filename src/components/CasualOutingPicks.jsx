import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  
  const items = [
    { name: "Casual Linen", image: casual_1, category: "casual-linen" },
    { name: "Oversized", image: casual_2, category: "oversized" },
    { name: "Textured", image: casual_3, category: "textured" },
    { name: "Striped", image: casual_4, category: "striped" },
    { name: "Vintage", image: casual_5, category: "vintage" },
    { name: "Premium", image: casual_6, category: "premium" },
    { name: "Classic", image: casual_7, category: "classic" },
    { name: "Polos", image: casual_8, category: "polos" },
    { name: "Solids", image: casual_9, category: "solids" }
  ]

  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 4; // xl screens - 4 items
      if (window.innerWidth >= 1024) return 3; // lg screens - 3 items
      if (window.innerWidth >= 640) return 3;  // sm tablets - 3 items
      return 1.5; // mobile - 1.5 items (1 full + 0.5 on each side)
    }
    return 3; // default fallback
  }

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView())

  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextSlide = () => {
    const slideAmount = itemsPerView === 1.5 ? 1 : Math.floor(itemsPerView);
    setCurrentIndex((prev) => (prev + slideAmount) % items.length)
  }

  const prevSlide = () => {
    const slideAmount = itemsPerView === 1.5 ? 1 : Math.floor(itemsPerView);
    setCurrentIndex((prev) => (prev - slideAmount + items.length) % items.length)
  }

  const getVisibleItems = () => {
    const visible = []
    const visibleCount = itemsPerView === 1.5 ? 3 : Math.floor(itemsPerView); // Show 3 items for 1.5 view
    for (let i = 0; i < visibleCount; i++) {
      visible.push(items[(currentIndex + i) % items.length])
    }
    return visible
  }

  const handleMainImageClick = (item) => {
    // Navigate to collection page with the category
    navigate(`/collection?category=${item.category}`)
  }

  return (
    <PageSection>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 bg-white pt-2">
        <div className="text-center text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4">
          <Title text1={'CASUAL OUTING'} text2={'PICKS'} />
        </div>
        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-1 sm:left-2 lg:left-4 top-1/2 transform -translate-y-1/2 z-10 p-1 sm:p-2 rounded transition-colors"
          >
            <FontAwesomeIcon icon={faChevronLeft} className='text-gray-700 text-lg sm:text-xl lg:text-2xl hover:text-gray-900'/>
          </button>
         
          <button
            onClick={nextSlide}
            className="absolute right-1 sm:right-2 lg:right-4 top-1/2 transform -translate-y-1/2 z-10 p-1 sm:p-2 rounded transition-colors"
          >
            <FontAwesomeIcon icon={faChevronRight} className='text-gray-700 text-lg sm:text-xl lg:text-2xl hover:text-gray-900'/>
          </button>

          <div className={`${
            itemsPerView === 1.5 
              ? 'flex overflow-hidden' 
              : 'grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'
          } gap-3 sm:gap-4 lg:gap-6 xl:gap-8 transition-all duration-500 ease-in-out px-4 sm:px-4 lg:px-0`}>
            {getVisibleItems().map((item, index) => (
              <div 
                key={`${item.name}-${currentIndex}-${index}`} 
                className={`group cursor-pointer ${
                  itemsPerView === 1.5 
                    ? `flex-shrink-0 ${index === 0 ? 'w-4/6 mx-2' : 'w-2/6'} ${index === 1 ? 'opacity-60' : ''} ${index === 2 ? 'opacity-60' : ''}` 
                    : ''
                }`}
                onClick={() => {
                  if (itemsPerView === 1.5 && index === 0) {
                    // Only navigate when clicking the main (big) image on mobile
                    handleMainImageClick(item)
                  } else if (itemsPerView !== 1.5) {
                    // Navigate for all items on larger screens
                    handleMainImageClick(item)
                  }
                }}
              >
                <div className={`relative overflow-hidden rounded-lg bg-gray-100 ${
                  itemsPerView === 1.5 ? 'aspect-[3/4]' : 'aspect-[1/1] sm:aspect-[3/4] lg:aspect-[4/5]'
                }`}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/20"></div>
                  <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 xl:bottom-6 left-2 sm:left-3 lg:left-4 xl:left-6">
                    <h3 className="text-sm sm:text-base lg:text-xl xl:text-2xl font-light text-white italiana-regular drop-shadow-lg">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {Array.from({ length: Math.ceil(items.length / (itemsPerView === 1.5 ? 1 : Math.floor(itemsPerView))) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * (itemsPerView === 1.5 ? 1 : Math.floor(itemsPerView)))}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  Math.floor(currentIndex / (itemsPerView === 1.5 ? 1 : Math.floor(itemsPerView))) === index
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