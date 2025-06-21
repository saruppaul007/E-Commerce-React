import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PageSection from '../components/pageSection';

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
  
  const [couponExpanded, setCouponExpanded] = useState(false);
  const [giftVoucherExpanded, setGiftVoucherExpanded] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  
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
  const giftWrapPrice = 25;
  const giftWrapTotal = giftWrapSelected ? giftWrapPrice : 0;
  const shippingFee = selectedSubtotal > 0 ? 10 : 0;
  const gst = selectedSubtotal * 0.18;
  const total = selectedSubtotal + gst + giftWrapTotal;

  const handleApplyCoupon = () => {
    console.log('Applying coupon:', couponCode);
  };

  const handleApplyVoucher = () => {
    console.log('Applying voucher:', voucherCode);
  };

  const handleAddFromWishlist = () => {
    navigate('/favorite');
  };

  const handleGiftWrapChange = (e) => {
    setGiftWrapSelected(e.target.checked);
  };

  return (
    <PageSection>
    <div className="pt-7 mt-[60px]">
      {cartData.length === 0 ? (
        // Empty Cart UI
        <div className="text-center py-20">
          <img src={assets.empty_cart_icon} alt="Empty Cart" className="mx-auto mb-4 w-50 h-40" />
          <h2 className="text-2xl font-semibold mb-2 instrument-sans-regular">Your shopping cart is empty.</h2>
          <p className="text-gray-600 mb-5 instrument-sans-regular">Please add something soon, carts have feelings too.</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/collection')}
              className="bg-[#FF7272] text-white py-2 px-4 rounded hover:bg-[#FF4C4C] transition duration-300 instrument-sans-regular"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-[--gray] text-white py-2 px-4 rounded hover:bg-[--black] transition duration-300 instrument-sans-regular"
            >
              Login
            </button>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold mb-4 instrument-sans-regular">Popular Categories</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Men's T-Shirts", "Women's T-Shirts", "Joggers", "Shorts", "Sneakers", "Full Sleeve T-Shirts", "Polos"].map((category) => (
                <span
                  key={category}
                  className="border px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-gray-200 cursor-pointer instrument-sans-regular"
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              {/* Select All Checkbox with item count and total */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={areAllItemsSelected()}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 instrument-sans-regular">
                    Select All ({selectedItemsCount}/{cartData.length} items) 
                    {selectedItemsCount > 0 && (
                      <span className="font-semibold ml-1 instrument-sans-regular text-[--peach]">({currency} {selectedSubtotal.toFixed(0)})</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {cartData.map((item, index) => {
                  const productData = products.find((product) => product._id === item._id);
                  const isSelected = selectedItems[item.itemKey] || false;

                  return (
                    <div
                      key={index}
                      className={`bg-white rounded-lg border p-4 transition-all duration-200 ${
                        isSelected ? 'border-[--green] bg-green-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-4">
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
                            className={`w-24 h-32 object-cover rounded-lg transition-opacity duration-200 shadow-md shadow-[--green] ${
                              isSelected ? 'opacity-100' : 'opacity-60'
                            }`}
                            src={productData.image[0]} 
                            alt={productData.name} 
                          />
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-grow">
                          <h3 className={`font-semibold mb-1 instrument-sans-regular transition-colors duration-200 ${
                            isSelected ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {productData.name}
                          </h3>
                          <p className={`text-sm mb-3 instrument-sans-regular transition-colors duration-200 ${
                            isSelected ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {productData.category || 'Cotton Linen Shirts'}
                          </p>
                          
                          {/* Size and Quantity */}
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm instrument-sans-regular transition-colors duration-200 ${
                                isSelected ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                Size:
                              </span>
                              <select 
                                className={`px-4 py-1 border rounded text-sm instrument-sans-regular cursor-pointer transition-colors duration-200 ${
                                  isSelected ? 'border-gray-300 text-gray-900' : 'border-gray-200 text-gray-400'
                                }`}
                                disabled={!isSelected}
                              >
                                <option value={item.size}>{item.size}</option>
                              </select>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm instrument-sans-regular transition-colors duration-200 ${
                                isSelected ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                Qty:
                              </span>
                              <select 
                                className={`px-4 py-1 border rounded text-sm cursor-pointer instrument-sans-regular transition-colors duration-200 ${
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
                        </div>

                        {/* Price and Remove Button */}
                        <div className="flex-shrink-0 text-right">
                          <div className="mb-3">
                            <div className={`text-lg font-bold instrument-sans-regular transition-colors duration-200 ${
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
                            className={`px-3 py-1 text-sm border rounded transition-colors instrument-sans-regular bg-white ${
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
                  );
                })}

                {/* Wishlist Button */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <button 
                    onClick={handleAddFromWishlist}
                    className="flex items-center gap-2 text-sm text-[--gray] w-full hover:bg-gray-50 transition-colors"
                  >
                    <span className="w-4 h-4">
                      <img src={assets.favorite_icon} alt="Add From Wishlist"  />
                    </span>
                    <span className='instrument-sans-regular'>ADD FROM WISHLIST</span>
                    <span className="ml-auto">›</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Cart Totals Section */}
            <div className="lg:col-span-1">
              {/* Place Order Button */}
              <button
                onClick={() => navigate('/place-order')}
                disabled={selectedItemsCount === 0}
                className={`w-full py-3 px-6 font-semibold transition-colors rounded-lg mb-2 instrument-sans-regular ${
                  selectedItemsCount > 0 
                    ? 'bg-[--green] text-white hover:bg-[#509954] ' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                PLACE ORDER {selectedItemsCount > 0 }
              </button>

              <div className="bg-white border border-gray-200 p-0 top-4">
                {/* Apply Coupon */}
                <div className="border-b">
                  <button 
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setCouponExpanded(!couponExpanded)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">🏷️</span>
                      <span className="text-gray-700 instrument-sans-regular">Apply Coupon</span>
                    </div>
                    {couponExpanded ? (
                      <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4 text-gray-600" />
                    ) : (
                      <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                  {couponExpanded && (
                    <div className="px-4 pb-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter Code Here"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 instrument-sans-regular"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="px-4 py-2 bg-white border border-[--green] text-[--green] rounded-lg text-sm font-semibold hover:bg-[--green] hover:text-white duration-300 transition-colors instrument-sans-regular"
                        >
                          APPLY
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Gift Voucher */}
                <div className="border-b">
                  <button 
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setGiftVoucherExpanded(!giftVoucherExpanded)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">🎁</span>
                      <span className="text-gray-700 instrument-sans-regular">Gift Voucher</span>
                    </div>
                    {giftVoucherExpanded ? (
                      <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4 text-gray-600" />
                    ) : (
                      <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                  {giftVoucherExpanded && (
                    <div className="px-4 pb-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter Code Here"
                          value={voucherCode}
                          onChange={(e) => setVoucherCode(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 instrument-sans-regular"
                        />
                        <button
                          onClick={handleApplyVoucher}
                          className="px-4 py-2 bg-white border border-[--green] text-[--green] rounded-lg text-sm font-semibold hover:bg-[--green] hover:text-white duration-300 transition-colors instrument-sans-regular"
                        >
                          APPLY
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Gift Wrap */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">🎁</span>
                      <span className="text-gray-700 instrument-sans-regular">Gift Wrap ({currency} {giftWrapPrice})</span>
                    </div>
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 cursor-pointer"
                      checked={giftWrapSelected}
                      onChange={handleGiftWrapChange}
                    />
                  </div>
                </div>
              </div>
                
              {/* Billing Details */}
              <div className="p-4">
                <h3 className="text-gray-400 text-sm font-semibold mb-4 instrument-sans-regular">BILLING DETAILS</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 instrument-sans-regular">Cart Total (Excl. of all taxes)</span>
                    <span className="font-semibold instrument-sans-regular">{currency} {selectedSubtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 instrument-sans-regular">GST</span>
                    <span className="font-semibold instrument-sans-regular">{currency} {gst.toFixed(2)}</span>
                  </div>
                  
                  {giftWrapSelected && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 instrument-sans-regular">Gift Wrap</span>
                      <span className="font-semibold instrument-sans-regular">{currency} {giftWrapPrice.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 instrument-sans-regular">Shipping Charges</span>
                    <div className="text-right">
                      <span className="text-green-600 font-semibold instrument-sans-regular">Free</span>
                      {giftWrapSelected && (
                        <div className="text-xs text-gray-500 instrument-sans-regular">Gift wrap will be applied</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t font-bold text-lg">
                    <span className='instrument-sans-regular'>Total Amount</span>
                    <span className='instrument-sans-regular'>{currency} {total.toFixed(2)}</span>
                  </div>

                  {selectedItemsCount === 0 && (
                    <div className="text-center text-gray-500 text-sm mt-4 instrument-sans-regular">
                      Please select items to see total amount
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Place Order Button */}
              <button
                onClick={() => navigate('/place-order')}
                disabled={selectedItemsCount === 0}
                className={`w-full py-3 px-6 font-semibold transition-colors mt-2 rounded-lg instrument-sans-regular ${
                  selectedItemsCount > 0 
                    ? 'bg-[--green] text-white hover:bg-[#509954]' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                PLACE ORDER {selectedItemsCount > 0 }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </PageSection>
  );
};

export default Cart;