import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import PageSection from '../components/PageSection';

const Favorite = () => {
  const { products, currency, wishlistItems, removeFromWishlist, addToCart, navigate } = useContext(ShopContext);
  const [wishlistData, setWishlistData] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({}); // Track selected sizes for each product

  useEffect(() => {
    const tempdata = [];
    for (const itemId in wishlistItems) {
      if (wishlistItems[itemId]) {
        tempdata.push({
          _id: itemId,
        });
      }
    }
    setWishlistData(tempdata);
  }, [wishlistItems]);

  // Handle size selection for a specific product
  const handleSizeSelection = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  // Add to cart with size validation
  const handleAddToCart = (productId) => {
    const selectedSize = selectedSizes[productId];
    if (!selectedSize) {
      // This will trigger the toast error from ShopContext
      addToCart(productId, null);
      return;
    }
    // Add to cart with selected size
    addToCart(productId, selectedSize);
  };

  // Move to cart (add to cart but keep in wishlist)
  const handleMoveToCart = (productId) => {
    const selectedSize = selectedSizes[productId];
    if (!selectedSize) {
      // This will trigger the toast error from ShopContext
      addToCart(productId, null);
      return;
    }
    // Add to cart with selected size but DON'T remove from wishlist
    addToCart(productId, selectedSize);
    // Clear the selected size after successful add
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: ''
    }));
  };

  return (
    <PageSection >
    <div className=" pt-20 ">
      <div className="max-w-7xl mx-auto px-2">
        {wishlistData.length === 0 ? (
          // Empty Wishlist UI
          <div className="text-center py-7 bg-white rounded-lg shadow-sm">
            <div className="mx-auto mb-6 w-30 h-40 flex items-center justify-center">
              {/* Empty Wishlist Icon as placeholder */}
              
              <img src={assets.empty_wishlist_icon} alt="Empty Wishlist" className="mx-auto mb-6 w-30 h-40" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-[--gray] instrument-sans-regular">Your wishlist is lonely and looking for love.</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto instrument-sans-regular">Add products to your wishlist, review them anytime and easily move to cart.</p>
            
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => navigate('/collection')}
                className="border border-[#FF7272] text-[#FF7272] py-2 px-4 rounded font-semibold hover:bg-[#FF7272] hover:text-white transition duration-300 instrument-sans-regular"
              >
                CONTINUE SHOPPING
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-[--gray] text-white py-2 px-4 rounded font-semibold hover:bg-gray-800 transition duration-300 instrument-sans-regular"
              >
                LOGIN
              </button>
            </div>
          </div>
        ) : (
          // Populated Wishlist UI
          <div className="bg-white rounded-lg shadow-sm p-1">
            <div className="text-2xl mb-3 text-center">
              <Title text1="YOUR" text2="WISHLIST" />
              <p className="text-sm text-gray-600 mt-0 instrument-sans-regular">{wishlistData.length} item{wishlistData.length !== 1 ? 's' : ''} in your wishlist</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                
                if (!productData) return null;

                const selectedSize = selectedSizes[item._id] || '';

                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <img 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer" 
                        src={productData.image[0]} 
                        alt={productData.name}
                        onClick={() => navigate(`/product/${productData._id}`)}
                      />
                      {/* Remove from wishlist button */}
                      <button
                        onClick={() => removeFromWishlist(item._id)}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                        title="Remove from wishlist"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <h3 
                        className="font-medium text-gray-800 mb-1 -mt-1  line-clamp-2 cursor-pointer hover:text-gray-600 instrument-sans-regular"
                        onClick={() => navigate(`/product/${productData._id}`)}
                      >
                        {productData.name}
                        <hr />
                      </h3>
                      <p className="text-lg font-semibold text-gray-900 mb-0 instrument-sans-regular">
                        {currency}{productData.price}
                      </p>

                      {/* Size Selection - Hidden on mobile (sm and below) */}
                      {productData.sizes && productData.sizes.length > 0 && (
                        <div className="mb-4 hidden sm:block">
                          <p className="text-sm text-gray-600 mb-2 instrument-sans-regular">Select Size:</p>
                          <div className="flex flex-wrap gap-1">
                            {productData.sizes.map((size, sizeIndex) => (
                              <button
                                key={sizeIndex}
                                onClick={() => handleSizeSelection(item._id, size)}
                                className={`px-[9px] py-1 border rounded text-xs cursor-pointer instrument-sans-regular transition-all duration-200 ${
                                  selectedSize === size
                                    ? 'border-[--green] bg-[--green] text-white'
                                    : 'border-gray-300 hover:border-[--green] hover:text-[--green]'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                          {/* Size selection indicator */}
                          <div className="mt-2 min-h-[20px] -mb-4">
                            {selectedSize ? (
                              <p className="text-xs text-[--green] instrument-sans-regular">
                                Size {selectedSize} selected
                              </p>
                            ) : (
                              <p className="text-xs text-gray-400 instrument-sans-regular ">
                                Please select a size
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons - Hidden on mobile (sm and below) */}
                      <div className="flex gap-2 hidden sm:flex">
                        <button
                          onClick={() => handleMoveToCart(item._id)}
                          className={`flex-1 py-2 px-4 rounded text-md font-bold transition duration-300 instrument-sans-regular ${
                            selectedSize
                              ? 'bg-[--green] text-white hover:bg-white hover:text-[--green] hover:border hover:border-[--green]'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!selectedSize}
                        >
                          Move to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue Shopping */}
            {/* <div className="text-center mt-8">
              <button
                onClick={() => navigate('/collection')}
                className="border-2 border-teal-600 text-teal-600 py-3 px-8 rounded font-semibold hover:bg-teal-50 transition duration-300"
              >
                CONTINUE SHOPPING
              </button>
            </div> */}
          </div>
        )}
      </div>
    </div>

    </PageSection>
  );
};

export default Favorite;