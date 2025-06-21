import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({id, image, name, price, isWishlisted, onWishlistToggle}) => {

    const {currency, navigateToProduct} = useContext(ShopContext);

    const handleProductClick = () => {
        navigateToProduct(id);
    };

  return (
    <div className='relative group'>
      {/* Wishlist Icon */}
      <button
        onClick={onWishlistToggle}
        className='absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100'
      >
        <svg
          className={`w-5 h-5 transition-colors ${
            isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'
          }`}
          fill={isWishlisted ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <div className='text-gray-700 cursor-pointer' onClick={handleProductClick}>
          <div className='overflow-hidden'>
              <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
    
              <p className='pt-3 pb-1 text-sm instrument-sans-regular text-gray-800'>{name}</p>
              <hr className=' bg-gray-700' />
              <p className='text-sm font-medium instrument-sans-regular text-gray-500'>{currency} {price}</p>
          </div>
      </div>
    </div>
  )
}

export default ProductItem