import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import PageSection from '../components/pageSection';

const Orders = () => {

  const {products, currency} = useContext(ShopContext);
  
  // State to track ratings for each product
  const [ratings, setRatings] = React.useState({});
  const [hoveredRating, setHoveredRating] = React.useState({});

  // Sample order data with different statuses
  const orderData = [
    {
      orderId: "14683384",
      date: "30 Mar, 2025",
      status: "Out For Pickup",
      statusColor: "bg-green-500"
    },
    {
      orderId: "13587554", 
      date: "30 Nov, 2024",
      status: "Delivered",
      statusColor: "bg-green-500"
    },
    {
      orderId: "12456789",
      date: "21 March, 2025", 
      status: "Ready to ship",
      statusColor: "bg-blue-500"
    }
  ];

  const handleStarClick = (productIndex, starValue) => {
    if (!ratings[productIndex]) {
      setRatings(prev => ({
        ...prev,
        [productIndex]: starValue
      }));
    }
  };

  const handleStarHover = (productIndex, starValue) => {
    if (!ratings[productIndex]) {
      setHoveredRating(prev => ({
        ...prev,
        [productIndex]: starValue
      }));
    }
  };

  const handleStarLeave = (productIndex) => {
    if (!ratings[productIndex]) {
      setHoveredRating(prev => ({
        ...prev,
        [productIndex]: 0
      }));
    }
  };

  return (
    <PageSection>
    <div className=' pt-10 mt-[60px]'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          products.slice(1, 4).map((item, index) => (
            <div key={index} className='py-4 border border-gray-200 rounded-lg mb-4 bg-gray-50'>
              {/* Header with Order ID, Date and Invoice */}
              <div className='flex justify-between items-center px-4 pb-3 border-b border-gray-200'>
                <span className='text-sm text-gray-600 instrument-sans-regular'>Order ID: {orderData[index]?.orderId}</span>
                <div className='flex items-center gap-4 instrument-sans-regular'>
                  <span className='text-sm text-gray-600 instrument-sans-regular'>{orderData[index]?.date}</span>
                  <button className='text-[--green] text-sm font-medium hover:underline'>Invoice</button>
                </div>
              </div>

              {/* Main content */}
              <div className='px-4 pt-3'>
                <div className='flex items-center justify-between gap-6 text-sm'>
                  <div className='flex items-center gap-6'>
                    <img className='w-16 sm:w-20 rounded-md shadow-md shadow-[--peach]' src={item.image[0]} alt="" />
                    <div>
                      <p className='sm:text-base font-medium text-gray-800 instrument-sans-regular'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-2 text-base text-gray-700 '>
                        <p className='text-lg text-[--peach] font-semibold instrument-sans-regular'>{currency}{item.price}</p>
                        <p className='instrument-sans-regular text-gray-500'>Quantity: 1</p>
                        <p className='instrument-sans-regular text-gray-500'>Size: M</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status in the middle */}
                  <div className='flex items-center gap-2 flex-1 justify-center'>
                    <p className={`min-w-2 h-2 rounded-full ${orderData[index]?.statusColor}`}></p>
                    <p className='text-sm md:text-base font-medium itim-regular-bold text-gray-700'>{orderData[index]?.status}</p>
                  </div>

                  {/* Track Order button on the right */}
                  <button className='border border-[--green] text-[--green] px-4 py-2 text-sm font-medium rounded hover:bg-gray-100 transition-colors instrument-sans-regular'>
                    TRACK ORDER
                  </button>
                </div>

                {/* Feedback section at bottom */}
                <div className='mt-4 pt-3 border-t border-gray-200'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-gray-600 font-medium itim-regular-bold'>RATE THIS PRODUCT</span>
                      <div className='flex gap-1'>
                        {[1,2,3,4,5].map((star) => {
                          const currentRating = ratings[index] || 0;
                          const currentHover = hoveredRating[index] || 0;
                          const isActive = star <= Math.max(currentRating, currentHover);
                          const isClickable = !ratings[index];
                          
                          return (
                            <span 
                              key={star} 
                              className={`text-2xl transition-colors ${
                                isActive 
                                  ? 'text-[--peach]' 
                                  : 'text-gray-300'
                              } ${
                                isClickable 
                                  ? 'cursor-pointer hover:scale-110' 
                                  : 'cursor-default'
                              }`}
                              onClick={() => handleStarClick(index, star)}
                              onMouseEnter={() => handleStarHover(index, star)}
                              onMouseLeave={() => handleStarLeave(index)}
                            >
                              ★
                            </span>
                          );
                        })}
                      </div>
                      {ratings[index] && (
                        <span className='text-sm text-gray-500 ml-2 instrument-sans-regular'>
                          Rated {ratings[index]} star{ratings[index] > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <button className='text-[--green] text-sm font-medium hover:underline instrument-sans-regular'>
                      Feedback
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    
    </div>
    </PageSection>
  )
}

export default Orders