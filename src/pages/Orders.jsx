import React, { useState, useContext } from 'react';
import { Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'; // Adjust path as needed

const Orders = () => {
  const navigate = useNavigate();
  
  // Get orders from ShopContext
  const { orders, currency } = useContext(ShopContext);
  
  // State to track ratings for each product
  const [ratings, setRatings] = useState({});
  const [hoveredRating, setHoveredRating] = useState({});

  const handleStarClick = (orderIndex, itemIndex, starValue) => {
    const ratingKey = `${orderIndex}-${itemIndex}`;
    if (!ratings[ratingKey]) {
      setRatings(prev => ({
        ...prev,
        [ratingKey]: starValue
      }));
    }
  };

  const handleStarHover = (orderIndex, itemIndex, starValue) => {
    const ratingKey = `${orderIndex}-${itemIndex}`;
    if (!ratings[ratingKey]) {
      setHoveredRating(prev => ({
        ...prev,
        [ratingKey]: starValue
      }));
    }
  };

  const handleStarLeave = (orderIndex, itemIndex) => {
    const ratingKey = `${orderIndex}-${itemIndex}`;
    if (!ratings[ratingKey]) {
      setHoveredRating(prev => ({
        ...prev,
        [ratingKey]: 0
      }));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 italiana-regular">Your Orders</h2>
      
      {/* If no orders, show empty state */}
      {!orders || orders.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 text-center">
          <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 instrument-sans-regular">No orders yet</h3>
          <p className="text-gray-500 mb-4 instrument-sans-regular text-sm sm:text-base">When you place orders, they'll appear here for easy tracking.</p>
          <button 
            onClick={() => navigate('/collection')}
            className="bg-[--green] hover:bg-[--green-2] text-white font-medium px-4 sm:px-6 py-2 rounded-lg instrument-sans-regular text-sm sm:text-base"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        /* If orders exist, show them */
        <div className="space-y-4">
          {orders.map((order, orderIndex) => (
            <div key={order.orderId} className='border border-gray-200 rounded-lg bg-gray-50 overflow-hidden'>
              {/* Header with Order ID, Date and Invoice */}
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-3 border-b border-gray-200 gap-2 sm:gap-4'>
                <span className='text-sm text-gray-600 instrument-sans-regular font-medium'>
                  Order ID: {order.orderId}
                </span>
                <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                  <span className='text-sm text-gray-600 instrument-sans-regular'>{order.date}</span>
                  <button className='text-[--green] text-sm  hover:underline self-start sm:self-auto instrument-sans-regular'>
                    Invoice
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-gray-200">
                {order.items.map((item, itemIndex) => (
                  <div key={`${item._id}-${item.size}-${itemIndex}`} className='p-4'>
                    {/* Mobile Layout */}
                    <div className='block sm:hidden space-y-4'>
                      {/* Product Info */}
                      <div className='flex gap-4'>
                        <img 
                          className='w-16 h-16 rounded-md shadow-md shadow-[--peach] flex-shrink-0 object-cover' 
                          src={item.image[0]} 
                          alt={item.name}
                        />
                        <div className='flex-1 min-w-0'>
                          <p className='font-medium text-gray-800 instrument-sans-regular text-sm line-clamp-2'>
                            {item.name}
                          </p>
                          <div className='flex flex-wrap items-center gap-2 mt-2 text-sm'>
                            <span className='text-[--peach] font-semibold instrument-sans-regular'>
                              {currency}{item.price}
                            </span>
                            <span className='text-gray-500 instrument-sans-regular'>
                              Qty: {item.quantity}
                            </span>
                            <span className='text-gray-500 instrument-sans-regular'>
                              Size: {item.size}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status and Track Button - only show for first item */}
                      {itemIndex === 0 && (
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-2'>
                            <div className={`w-2 h-2 rounded-full ${order.statusColor}`}></div>
                            <p className='text-sm font-medium instrument-sans-regular text-gray-700'>
                              {order.status}
                            </p>
                          </div>
                          <button className='border border-[--green] text-[--green] px-3 py-1.5 text-xs font-medium rounded hover:bg-gray-100 transition-colors instrument-sans-regular'>
                            TRACK ORDER
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Desktop Layout */}
                    <div className='hidden sm:flex items-center justify-between gap-6'>
                      <div className='flex items-center gap-4 flex-1'>
                        <img 
                          className='w-16 lg:w-20 h-16 lg:h-20 rounded-md shadow-md shadow-[--peach] flex-shrink-0 object-cover' 
                          src={item.image[0]} 
                          alt={item.name}
                        />
                        <div className='flex-1 min-w-0'>
                          <p className='font-medium text-gray-800 instrument-sans-regular text-sm lg:text-base line-clamp-2'>
                            {item.name}
                          </p>
                          <div className='flex flex-wrap items-center gap-3 mt-2'>
                            <span className='text-[--peach] font-semibold instrument-sans-regular text-sm lg:text-base'>
                              {currency}{item.price}
                            </span>
                            <span className='text-gray-500 instrument-sans-regular text-sm'>
                              Quantity: {item.quantity}
                            </span>
                            <span className='text-gray-500 instrument-sans-regular text-sm'>
                              Size: {item.size}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Status in the middle - only show for first item */}
                      {itemIndex === 0 && (
                        <div className='flex items-center gap-2 flex-shrink-0'>
                          <div className={`w-2 h-2 rounded-full ${order.statusColor}`}></div>
                          <p className='text-sm lg:text-base font-medium instrument-sans-regular text-gray-700'>
                            {order.status}
                          </p>
                        </div>
                      )}

                      {/* Track Order button on the right - only show for first item */}
                      {itemIndex === 0 && (
                        <button className='border border-[--green] text-[--green] px-3 lg:px-4 py-2 text-sm font-medium rounded hover:bg-gray-100 transition-colors instrument-sans-regular flex-shrink-0'>
                          TRACK ORDER
                        </button>
                      )}
                    </div>

                    {/* Feedback section for each item */}
                    <div className='mt-4 pt-3 border-t border-gray-200'>
                      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                        <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3'>
                          <span className='text-xs sm:text-sm text-gray-600 font-medium itim-regular-bold'>
                            RATE THIS PRODUCT
                          </span>
                          <div className='flex items-center gap-1'>
                            <div className='flex gap-1'>
                              {[1,2,3,4,5].map((star) => {
                                const ratingKey = `${orderIndex}-${itemIndex}`;
                                const currentRating = ratings[ratingKey] || 0;
                                const currentHover = hoveredRating[ratingKey] || 0;
                                const isActive = star <= Math.max(currentRating, currentHover);
                                const isClickable = !ratings[ratingKey];
                                
                                return (
                                  <span 
                                    key={star} 
                                    className={`text-xl sm:text-2xl transition-colors ${
                                      isActive 
                                        ? 'text-[--peach]' 
                                        : 'text-gray-300'
                                    } ${
                                      isClickable 
                                        ? 'cursor-pointer hover:scale-110' 
                                        : 'cursor-default'
                                    }`}
                                    onClick={() => handleStarClick(orderIndex, itemIndex, star)}
                                    onMouseEnter={() => handleStarHover(orderIndex, itemIndex, star)}
                                    onMouseLeave={() => handleStarLeave(orderIndex, itemIndex)}
                                  >
                                    ★
                                  </span>
                                );
                              })}
                            </div>
                            {ratings[`${orderIndex}-${itemIndex}`] && (
                              <span className='text-xs sm:text-sm text-gray-500 ml-2 instrument-sans-regular'>
                                Rated {ratings[`${orderIndex}-${itemIndex}`]} star{ratings[`${orderIndex}-${itemIndex}`] > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </div>
                        <button className='text-[--green] text-sm font-medium hover:underline instrument-sans-regular self-start sm:self-auto'>
                          Feedback
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total - shown at the bottom of each order */}
              <div className='mx-4 mb-4 p-3 sm:p-4 bg-gray-100 rounded-lg border-t border-gray-200'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm font-medium text-gray-700 instrument-sans-regular'>
                    Order Total:
                  </span>
                  <span className='text-base sm:text-lg font-bold text-[--peach] instrument-sans-regular'>
                    {currency}{order.total}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;