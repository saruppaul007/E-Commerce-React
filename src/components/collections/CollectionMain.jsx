import React from 'react';
import ProductItem from '../ProductItem';
import PageSection from '../pageSection';
import ProductSort from './ProductSort';

const CollectionMain = ({ 
  filterProducts, 
  displayProducts, 
  handleSortedProducts, 
  handleWishlistToggle, 
  isInWishlist, 
  clearAllFilters 
}) => {
  return (
    <div className='w-full'>
      <PageSection className='min-h-screen'>
        <div className='flex justify-end text-base sm:text-2xl mb-4'>
          {/* Product Sort Component */}
          <ProductSort 
            products={filterProducts} 
            onSortedProducts={handleSortedProducts}
          />
        </div>

        <hr />

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8 mt-2'>
          {
            displayProducts.map((item, index) => (
              <ProductItem 
                key={index} 
                name={item.name} 
                id={item._id} 
                price={item.price} 
                image={item.image}
                isWishlisted={isInWishlist(item._id)}
                onWishlistToggle={() => handleWishlistToggle(item._id)}
              />            
            ))           
          }
        </div>

        {/* Show message when no products found */}
        {displayProducts.length === 0 && (
          <div className='text-center py-16'>
            <p className='text-gray-500 text-lg instrument-sans-regular'>No products found matching your filters.</p>
            <button 
              onClick={clearAllFilters}
              className='mt-4 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors instrument-sans-regular'
            >
              Clear All Filters
            </button>
          </div>
        )}
      </PageSection>
    </div>
  );
};

export default CollectionMain;