import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import PageSection from './pageSection';

const LatestCollection = () => {
  const { products, addToWishlist, isInWishlist } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setLatestProducts(products.slice(0, 12)); // Fetch first 12 products
  }, [products]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(latestProducts.length / 4));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(latestProducts.length / 4)) % Math.ceil(latestProducts.length / 4));
  };

  const handleWishlistToggle = (itemId) => {
    addToWishlist(itemId);
  };

  return (
    <PageSection>
      <div className="my-0 pt-4">
        {/* Title Section */}
        <div className="text-center text-3xl">
          <Title text1="LATEST" text2="COLLECTION" />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 instrument-sans-regular mb-3">
            Discover the latest trends and styles in our newest collection.
          </p>
        </div>
        {/* Carousel Section */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Products Carousel */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array(Math.ceil(latestProducts.length / 4))
                .fill()
                .map((_, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-shrink-0 w-full px-4"
                  >
                    {latestProducts
                      .slice(pageIndex * 4, pageIndex * 4 + 4)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="border rounded-md p-3 shadow-md bg-white"
                        >
                          <ProductItem
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            isWishlisted={isInWishlist(item._id)}
                            onWishlistToggle={() => handleWishlistToggle(item._id)}
                          />
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </PageSection>
  );
};

export default LatestCollection;