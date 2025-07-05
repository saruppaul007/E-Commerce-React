import React, { useState, useRef, useEffect } from 'react'
import { assets } from '../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones, faCoins, faShirt, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import PageSection from './pageSection'

const OurPolicy = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTabIndex, setCurrentTabIndex] = useState(0)
  const scrollContainerRef = useRef(null)
  const tabScrollContainerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isTabHovered, setIsTabHovered] = useState(false)
  const totalCards = 4
  const totalTabSlides = 2 // 2 slides for tablet (2 cards per slide)

  // Auto-scroll functionality for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && scrollContainerRef.current) {
        const nextIndex = (currentIndex + 1) % totalCards
        scrollToCard(nextIndex)
      }
    }, 3000) // Auto-scroll every 3 seconds

    return () => clearInterval(interval)
  }, [currentIndex, isHovered, totalCards])

  // Auto-scroll functionality for tablet
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTabHovered && tabScrollContainerRef.current) {
        const nextIndex = (currentTabIndex + 1) % totalTabSlides
        scrollToTabSlide(nextIndex)
      }
    }, 3000) // Auto-scroll every 3 seconds

    return () => clearInterval(interval)
  }, [currentTabIndex, isTabHovered, totalTabSlides])

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft
      const cardWidth = scrollContainerRef.current.offsetWidth
      const newIndex = Math.round(scrollLeft / cardWidth)
      setCurrentIndex(newIndex)
    }
  }

  const scrollToCard = (index) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const handleTabScroll = () => {
    if (tabScrollContainerRef.current) {
      const scrollLeft = tabScrollContainerRef.current.scrollLeft
      const slideWidth = tabScrollContainerRef.current.offsetWidth
      const newIndex = Math.round(scrollLeft / slideWidth)
      setCurrentTabIndex(newIndex)
    }
  }

  const scrollToTabSlide = (index) => {
    if (tabScrollContainerRef.current) {
      const slideWidth = tabScrollContainerRef.current.offsetWidth
      tabScrollContainerRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      })
      setCurrentTabIndex(index)
    }
  }

  const cardData = [
    {
      icon: faTruckFast,
      title: "Fast Delivery",
      description: "Get your orders delivered in record time! We ensure speed and reliability for your convenience."
    },
    {
      icon: faHeadphones,
      title: "Great Customer Service",
      description: "Our dedicated team is here to assist you 24/7. Your satisfaction is our top priority."
    },
    {
      icon: faShirt,
      title: "Original Threads",
      description: "Discover unique and stylish designs crafted to make you stand out from the crowd."
    },
    {
      icon: faCoins,
      title: "Affordable Price",
      description: "Enjoy premium quality products at prices that won't break the bank. Value for every dollar!"
    }
  ]

  return (
    <PageSection>
    <div className="bg-white text-[--peach] pt-0 pb-16 mb-12">
        <div className="container w-full">
          {/* Mobile horizontal scroll container */}
          <div className="sm:hidden">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              onScroll={handleScroll}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsHovered(true)}
              onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {cardData.map((card, index) => (
                <div key={index} className="w-full flex-shrink-0 snap-center px-2">
                  <div className="service__card border border-[--peach] p-5 cursor-pointer rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 space-y-5 mx-1">
                    <div className="flex items-center gap-5">
                      <FontAwesomeIcon icon={card.icon} className="text-3xl"></FontAwesomeIcon>
                      <p className="itim-regular-bold whitespace-pre-line">
                        {card.title.replace(' ', '\n')}
                      </p>
                    </div>
                    <p className="instrument-sans-regular">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Dot indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalCards }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-[--peach] scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Tablet view - 2x2 grid */}
          <div className="hidden sm:block lg:hidden">
            <div className="grid grid-cols-2 gap-4">
              {cardData.map((card, index) => (
                <div key={index} className="service__card border border-[--peach] p-4 cursor-pointer rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 space-y-4">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={card.icon} className="text-2xl md:text-3xl"></FontAwesomeIcon>
                    <p className="text-sm md:text-base itim-regular-bold whitespace-pre-line">
                      {card.title.replace(' ', '\n')}
                    </p>
                  </div>
                  <p className="instrument-sans-regular text-sm md:text-base">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop grid - hidden on mobile and tablet */}
          <div className="hidden lg:grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cardData.map((card, index) => (
              <div key={index} className="service__card border border-[--peach] p-5 cursor-pointer rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 space-y-5">
                <div className="flex items-center gap-5">
                  <FontAwesomeIcon icon={card.icon} className="text-3xl md:text-4xl xl:text-5xl"></FontAwesomeIcon>
                  <p className="md:text-lg lg:text-xl itim-regular-bold whitespace-pre-line">
                    {card.title.replace(' ', '\n')}
                  </p>
                </div>
                <p className="instrument-sans-regular">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
    </div>
    <hr />
    </PageSection>
  )
}

export default OurPolicy