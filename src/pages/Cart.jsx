import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import PageSection from '../components/pageSection';
import CartSummary from '../components/CartSummary';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  
  // Initialize selected items from localStorage
  const [selectedItems, setSelectedItems] = useState(() => {
    try {
      const savedSelectedItems = localStorage.getItem('selectedCartItems');
      return savedSelectedItems ? JSON.parse(savedSelectedItems) : {};
    } catch (error) {
      console.error('Error loading selected items from localStorage:', error);
      return {};
    }
  });
  
  // Initialize gift wrap from localStorage
  const [giftWrapSelected, setGiftWrapSelected] = useState(() => {
    try {
      const savedGiftWrap = localStorage.getItem('giftWrapSelected');
      return savedGiftWrap ? JSON.parse(savedGiftWrap) : false;
    } catch (error) {
      console.error('Error loading gift wrap preference from localStorage:', error);
      return false;
    }
  });

  // Save selected items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('selectedCartItems', JSON.stringify(selectedItems));
    } catch (error) {
      console.error('Error saving selected items to localStorage:', error);
    }
  }, [selectedItems]);

  // Save gift wrap preference to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('giftWrapSelected', JSON.stringify(giftWrapSelected));
    } catch (error) {
      console.error('Error saving gift wrap preference to localStorage:', error);
    }
  }, [giftWrapSelected]);

  useEffect(() => {
    const tempdata = [];
    const newSelectedItems = { ...selectedItems };
    
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const itemKey = `${items}-${item}`;
          tempdata.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
            itemKey: itemKey
          });
          // Only set as selected if not already in selectedItems (for new items)
          if (!(itemKey in selectedItems)) {
            newSelectedItems[itemKey] = true;
          }
        }
      }
    }
    
    // Clean up selected items - remove items that are no longer in cart
    const currentItemKeys = new Set(tempdata.map(item => item.itemKey));
    const cleanedSelectedItems = {};
    Object.keys(newSelectedItems).forEach(itemKey => {
      if (currentItemKeys.has(itemKey)) {
        cleanedSelectedItems[itemKey] = newSelectedItems[itemKey];
      }
    });
    
    setCartData(tempdata);
    setSelectedItems(cleanedSelectedItems);
  }, [cartItems]);

  // Handle individual item selection
  const handleItemSelection = (itemKey, isSelected) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemKey]: isSelected
    }));
  };

  // Handle select all functionality
  const handleSelectAll = (selectAll) => {
    const newSelectedItems = {};
    cartData.forEach(item => {
      newSelectedItems[item.itemKey] = selectAll;
    });
    setSelectedItems(newSelectedItems);
  };

  // Calculate totals for selected items only
  const getSelectedCartSubtotal = () => {
    let totalAmount = 0;
    cartData.forEach((item) => {
      if (selectedItems[item.itemKey]) {
        const productData = products.find((product) => product._id === item._id);
        if (productData) {
          totalAmount += productData.price * item.quantity;
        }
      }
    });
    return totalAmount;
  };

  // Get count of selected items
  const getSelectedItemsCount = () => {
    return Object.values(selectedItems).filter(Boolean).length;
  };

  // Check if all items are selected
  const areAllItemsSelected = () => {
    return cartData.length > 0 && cartData.every(item => selectedItems[item.itemKey]);
  };

  const selectedSubtotal = getSelectedCartSubtotal();
  const selectedItemsCount = getSelectedItemsCount();

  const handleAddFromWishlist = () => {
    navigate('/favorite');
  };

  return (
    <PageSection>
    <div className="pt-7 mt-[60px]">
      {cartData.length === 0 ? (
        // Empty Cart UI
        <div className="text-center py-10 md:py-20 px-4">
          <img src={assets.empty_cart_icon} alt="Empty Cart" className="mx-auto mb-4 w-32 h-24 md:w-50 md:h-40" />
          <h2 className="text-xl md:text-2xl font-semibold mb-2 instrument-sans-regular">Your shopping cart is empty.</h2>
          <p className="text-gray-600 mb-5 instrument-sans-regular text-sm md:text-base">Please add something soon, carts have feelings too.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/collection')}
              className="bg-[#FF7272] text-white py-2 px-4 rounded hover:bg-[#FF4C4C] transition duration-300 instrument-sans-regular text-sm md:text-base"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-[--gray] text-white py-2 px-4 rounded hover:bg-[--black] transition duration-300 instrument-sans-regular text-sm md:text-base"
            >
              Login
            </button>
          </div>
          <div className="mt-6 md:mt-8">
            <h3 className="font-semibold mb-4 instrument-sans-regular text-base md:text-lg">Popular Categories</h3>
            <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
              {["Men's T-Shirts", "Women's T-Shirts", "Joggers", "Shorts", "Sneakers", "Full Sleeve T-Shirts", "Polos"].map((category) => (
                <span
                  key={category}
                  className="border px-2 md:px-3 py-1 rounded-full text-xs md:text-sm text-gray-700 hover:bg-gray-200 cursor-pointer instrument-sans-regular"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Populated Cart UI
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              {/* Select All Checkbox with item count and total */}
              <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 mb-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={areAllItemsSelected()}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                  />
                  <span className="text-xs md:text-sm text-gray-700 instrument-sans-regular">
                    Select All ({selectedItemsCount}/{cartData.length} items) 
                    {selectedItemsCount > 0 && (
                      <span className="font-semibold ml-1 instrument-sans-regular text-[--peach]">({currency} {selectedSubtotal.toFixed(0)})</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                {cartData.map((item, index) => {
                  const productData = products.find((product) => product._id === item._id);
                  const isSelected = selectedItems[item.itemKey] || false;

                  return (
                    <div
                      key={index}
                      className={`bg-white rounded-lg border p-3 md:p-4 transition-all duration-200 ${
                        isSelected ? 'border-[--green] bg-green-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        {/* Checkbox */}
                        <div className="flex-shrink-0 pt-1">
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={(e) => handleItemSelection(item.itemKey, e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>

                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img 
                            className={`w-16 h-20 md:w-24 md:h-32 object-cover rounded-lg transition-opacity duration-200 shadow-md shadow-[--green] ${
                              isSelected ? 'opacity-100' : 'opacity-60'
                            }`}
                            src={productData.image[0]} 
                            alt={productData.name} 
                          />
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-grow min-w-0">
                          {/* Product Name and Category */}
                          <div className="mb-3">
                            <h3 className={`font-semibold mb-1 instrument-sans-regular transition-colors duration-200 text-sm md:text-base ${
                              isSelected ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {productData.name}
                            </h3>
                            <p className={`text-xs md:text-sm instrument-sans-regular transition-colors duration-200 ${
                              isSelected ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              {productData.category || 'Cotton Linen Shirts'}
                            </p>
                          </div>
                          
                          {/* Size and Quantity */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs md:text-sm instrument-sans-regular transition-colors duration-200 ${
                                isSelected ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                Size:
                              </span>
                              <select 
                                className={`px-2 md:px-4 py-1 border rounded text-xs md:text-sm instrument-sans-regular cursor-pointer transition-colors duration-200 ${
                                  isSelected ? 'border-gray-300 text-gray-900' : 'border-gray-200 text-gray-400'
                                }`}
                                disabled={!isSelected}
                              >
                                <option value={item.size}>{item.size}</option>
                              </select>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs md:text-sm instrument-sans-regular transition-colors duration-200 ${
                                isSelected ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                Qty:
                              </span>
                              <select 
                                className={`px-2 md:px-4 py-1 border rounded text-xs md:text-sm cursor-pointer instrument-sans-regular transition-colors duration-200 ${
                                  isSelected ? 'border-gray-300 text-gray-900' : 'border-gray-200 text-gray-400'
                                }`}
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item._id, item.size, Number(e.target.value))}
                                disabled={!isSelected}
                              >
                                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                  <option key={num} value={num}>{num}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Price and Remove Button */}
                          <div className="flex items-center justify-between">
                            <div>
                              <div className={`text-base md:text-lg font-bold instrument-sans-regular transition-colors duration-200 ${
                                isSelected ? 'text-[--peach]' : 'text-gray-400'
                              }`}>
                                {currency} {productData.price}
                              </div>
                              <div className={`text-xs instrument-sans-regular transition-colors duration-200 ${
                                isSelected ? 'text-gray-500' : 'text-gray-300'
                              }`}>
                                MRP incl. of all taxes
                              </div>
                            </div>
                            <button
                              onClick={() => updateQuantity(item._id, item.size, 0)}
                              className={`px-2 md:px-3 py-1 text-xs md:text-sm border rounded transition-colors instrument-sans-regular bg-white ${
                                isSelected 
                                  ? 'text-gray-600 border-gray-300 hover:bg-gray-50' 
                                  : 'text-gray-400 border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Wishlist Button */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4">
                  <button 
                    onClick={handleAddFromWishlist}
                    className="flex items-center gap-2 text-xs md:text-sm text-[--gray] w-full hover:bg-gray-50 transition-colors"
                  >
                    <span className="w-4 h-4 flex-shrink-0">
                      <img src={assets.favorite_icon} alt="Add From Wishlist"  />
                    </span>
                    <span className='instrument-sans-regular'>ADD FROM WISHLIST</span>
                    <span className="ml-auto">›</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Cart Summary Section */}
            <div className="order-1 lg:order-2">
              <CartSummary 
                currency={currency}
                selectedItemsCount={selectedItemsCount}
                selectedSubtotal={selectedSubtotal}
                navigate={navigate}
                giftWrapSelected={giftWrapSelected}
                setGiftWrapSelected={setGiftWrapSelected}
              />
            </div>
          </div>
        </div>
      )}
    </div>
    </PageSection>
  );
};

export default Cart;