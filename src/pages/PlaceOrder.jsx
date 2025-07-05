import React, {useContext, useState} from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faMobileAlt, faMoneyBillWave, faUniversity, faWallet } from '@fortawesome/free-solid-svg-icons'
import { faCcAmex, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons'
import PageSection from '../components/pageSection'
import { toast } from 'react-toastify'; // Add this import

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const [showWallets, setShowWallets] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showNetbanking, setShowNetbanking] = useState(false);

  // Form state for delivery information
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: ''
  });

  const {navigate, placeOrder, getCartCount} = useContext(ShopContext);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleConfirmOrder = () => {
    // Basic validation
    if (!deliveryInfo.firstName || !deliveryInfo.lastName || !deliveryInfo.email || 
        !deliveryInfo.phone || !deliveryInfo.street || !deliveryInfo.city || 
        !deliveryInfo.state || !deliveryInfo.zipcode || !deliveryInfo.country) {
      toast.error('Please fill in all delivery information fields');
      return;
    }

    if (getCartCount() === 0) {
      toast.error('Your cart is empty! Add some items before placing an order.');
      return;
    }

    // Place the order
    const orderPlaced = placeOrder(deliveryInfo, method);
    
    if (orderPlaced) {
      // Navigate to orders page (lowercase to match route)
      navigate('/profile?section=orders');
    }
  };

  return (
    <>
      {/* Add FontAwesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      
      <PageSection>
      <div className='flex flex-col lg:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh]  mt-[60px]'>
        
        {/* Left Side - Enlarged */}
        <div className='flex flex-col gap-4 w-full lg:max-w-[65%] xl:max-w-[65%]'>

          <div className='text-xl sm:text-2xl mt-0'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          <div className='flex  gap-3 instrument-sans-regular -mt-2'>
            <input 
              className='border border-gray-300 rounded py-2 px-4 w-full' 
              type="text" 
              name="firstName"
              value={deliveryInfo.firstName}
              onChange={handleInputChange}
              placeholder='First Name' 
            />
            <input 
              className='border border-gray-300 rounded py-2 px-4 w-full' 
              type="text" 
              name="lastName"
              value={deliveryInfo.lastName}
              onChange={handleInputChange}
              placeholder='Last Name' 
            />
          </div>
          <div className='flex  gap-3 instrument-sans-regular'>
            <input 
              className='border border-gray-300 rounded py-2 px-4 w-full instrument-sans-regular' 
              type="email" 
              name="email"
              value={deliveryInfo.email}
              onChange={handleInputChange}
              placeholder='Email Address' 
            />
            <input 
              className='border border-gray-300 rounded py-2 px-4 w-full instrument-sans-regular' 
              type="text" 
              name="phone"
              value={deliveryInfo.phone}
              onChange={handleInputChange}
              placeholder='Phone Number' 
            />
          </div>
          <input 
            className='border border-gray-300 rounded py-2 px-4 w-full instrument-sans-regular' 
            type="text" 
            name="street"
            value={deliveryInfo.street}
            onChange={handleInputChange}
            placeholder='Street Address' 
          />
          
          <div className='flex gap-3 instrument-sans-regular'>
            <input 
              className='border border-gray-300 rounded py-2 px-4 w-full' 
              type="text" 
              name="city"
              value={deliveryInfo.city}
              onChange={handleInputChange}
              placeholder='City' 
            />
            <input 
              className='border border-gray-300 rounded py-2 px-4 w-full' 
              type="text" 
              name="state"
              value={deliveryInfo.state}
              onChange={handleInputChange}
              placeholder='State' 
            />
          </div>

          <div className='flex gap-3 instrument-sans-regular'>
            <input 
              className='border border-gray-300 rounded py-2 px-4 w-full' 
              type="number" 
              name="zipcode"
              value={deliveryInfo.zipcode}
              onChange={handleInputChange}
              placeholder='Zipcode' 
            />
            <input 
              className='border border-gray-300 rounded py-2 px-4 w-full' 
              type="text" 
              name="country"
              value={deliveryInfo.country}
              onChange={handleInputChange}
              placeholder='Country' 
            />
          </div>

          {/* Payment Options Section */}
          <div className='mt-4'>
            <div className='text-xl sm:text-2xl mb-2'>
              <Title text1={'PAYMENT'} text2={'OPTIONS'} />
            </div>
            
            {/* Main Payment Options Container */}
            <div className='border border-gray-300 rounded-lg bg-white shadow-sm'>
              
              {/* UPI Apps */}
              <div 
                className={`border-b border-gray-200 px-6 py-4 transition-colors cursor-pointer ${
                  method === 'upi' ? 'bg-green-50 border-l-4 border-l-[--green]' : 'hover:bg-green-50'
                }`}
                onClick={() => setMethod('upi')}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center'>
                      <FontAwesomeIcon icon={faMobileAlt} className='text-white text-sm' />
                    </div>
                    <span className='text-gray-700 font-medium instrument-sans-regular'>Pay with any UPI App</span>
                  </div>
                  <div className={`w-5 h-5 border-2 rounded-full ${
                    method === 'upi' ? 'bg-[--green] border-[--green]' : 'border-gray-300'
                  }`}></div>
                </div>
              </div>

              {/* Wallets Dropdown */}
              <div className='border-b border-gray-200'>
                <div 
                  className={`flex items-center justify-between cursor-pointer px-6 py-4 transition-colors ${
                    method.startsWith('wallet') ? 'bg-green-50 border-l-4 border-l-[--green]' : 'hover:bg-green-50'
                  }`}
                  onClick={() => setShowWallets(!showWallets)}
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
                      <FontAwesomeIcon icon={faWallet} className='text-white text-sm' />
                    </div>
                    <span className='text-gray-700 font-medium instrument-sans-regular'>Wallets</span>
                  </div>
                  <i className={`fas fa-chevron-${showWallets ? 'up' : 'down'} text-gray-500 transition-transform duration-200`}></i>
                </div>
                
                {showWallets && (
                  <div className='px-6 pb-4 bg-gray-50 border-t border-gray-100'>
                    <div className='space-y-3 mt-3'>
                      <div 
                        className='flex items-center justify-between py-3 hover:bg-white px-4 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-200'
                        onClick={() => setMethod('wallet-paytm')}
                      >
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center'>
                            <span className='text-white text-xs font-bold'>paytm</span>
                          </div>
                          <span className='font-medium instrument-sans-regular'>Paytm</span>
                        </div>
                        <div className={`w-5 h-5 border-2 rounded-full ${
                          method === 'wallet-paytm' ? 'bg-[--green] border-[--green]' : 'border-gray-300'
                        }`}></div>
                      </div>
                      
                      <div 
                        className='flex items-center justify-between py-3 hover:bg-white px-4 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-200'
                        onClick={() => setMethod('wallet-phonepe')}
                      >
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center'>
                            <span className='text-white text-sm font-bold'>Pe</span>
                          </div>
                          <span className='font-medium instrument-sans-regular'>PhonePe</span>
                        </div>
                        <div className={`w-5 h-5 border-2 rounded-full ${
                          method === 'wallet-phonepe' ? 'bg-[--green] border-[--green]' : 'border-gray-300'
                        }`}></div>
                      </div>
                      
                      <div 
                        className='flex items-center justify-between py-3 hover:bg-white px-4 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-200'
                        onClick={() => setMethod('wallet-freecharge')}
                      >
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center'>
                            <span className='text-white text-sm font-bold'>FC</span>
                          </div>
                          <span className='font-medium instrument-sans-regular'>FreeCharge</span>
                        </div>
                        <div className={`w-5 h-5 border-2 rounded-full ${
                          method === 'wallet-freecharge' ? 'bg-[--green] border-[--green]' : 'border-gray-300'
                        }`}></div>
                      </div>

                      <div 
                        className='flex items-center justify-between py-3 hover:bg-white px-4 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-200'
                        onClick={() => setMethod('wallet-googlepay')}
                      >
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center'>
                            <span className='text-white text-sm font-bold'>GP</span>
                          </div>
                          <span className='font-medium instrument-sans-regular'>Google Pay</span>
                        </div>
                        <div className={`w-5 h-5 border-2 rounded-full ${
                          method === 'wallet-googlepay' ? 'bg-[--green] border-[--green]' : 'border-gray-300'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Credit & Debit Cards Dropdown */}
              <div className='border-b border-gray-200'>
                <div 
                  className={`flex items-center justify-between cursor-pointer px-6 py-4 transition-colors ${
                    method === 'card' ? 'bg-green-50 border-l-4 border-l-[--green]' : 'hover:bg-green-50'
                  }`}
                  onClick={() => {
                    setShowCards(!showCards);
                    setMethod('card');
                  }}
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
                      <FontAwesomeIcon icon={faCreditCard} className='text-white text-sm' />
                    </div>
                    <span className='text-gray-700 font-medium instrument-sans-regular'>Credit & Debit Cards</span>
                  </div>
                  <i className={`fas fa-chevron-${showCards ? 'up' : 'down'} text-gray-500 transition-transform duration-200`}></i>
                </div>
                
                {showCards && (
                  <div className='px-6 pb-4 bg-gray-50 border-t border-gray-100'>
                    <div className='space-y-3 mt-3'>
                      <div className='bg-white p-4 rounded-lg border border-gray-200'>
                        <div className='flex items-center gap-3 mb-3'>  
                          <FontAwesomeIcon icon={faCcVisa} className='text-blue-600 text-2xl' />
                          <FontAwesomeIcon icon={faCcMastercard} className='text-red-500 text-2xl' />
                          <FontAwesomeIcon icon={faCcAmex} className='text-blue-600 text-2xl' />
                          <span className='text-sm text-gray-600 instrument-sans-regular'>& more</span>
                        </div>
                        <input className='w-full border border-gray-300 rounded py-2 px-3 mb-3 instrument-sans-regular' type="text" placeholder='Card Number' />
                        <div className='flex gap-3 instrument-sans-regular'>
                          <input className='w-full border border-gray-300 rounded py-2 px-3' type="text" placeholder='MM/YY' />
                          <input className='w-full border border-gray-300 rounded py-2 px-3' type="text" placeholder='CVV' />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Netbanking Dropdown */}
              <div className='border-b border-gray-200'>
                <div 
                  className={`flex items-center justify-between cursor-pointer px-6 py-4 transition-colors ${
                    method.startsWith('netbanking') ? 'bg-green-50 border-l-4 border-l-[--green]' : 'hover:bg-green-50'
                  }`}
                  onClick={() => setShowNetbanking(!showNetbanking)}
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center'>
                      <FontAwesomeIcon icon={faUniversity} className='text-white text-sm' />
                    </div>
                    <span className='text-gray-700 font-medium instrument-sans-regular'>Netbanking</span>
                  </div>
                  <i className={`fas fa-chevron-${showNetbanking ? 'up' : 'down'} text-gray-500 transition-transform duration-200`}></i>
                </div>
                
                {showNetbanking && (
                  <div className='px-6 pb-4 bg-gray-50 border-t border-gray-100'>
                    <div className='grid grid-cols-2 gap-3 mt-3'>
                      {['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Bank of Baroda', 'Canara Bank'].map((bank) => (
                        <div 
                          key={bank} 
                          className='flex items-center justify-between py-3 hover:bg-white px-4 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-200'
                          onClick={() => setMethod(`netbanking-${bank.toLowerCase().replace(/\s+/g, '-')}`)}
                        >
                          <span className='font-medium text-sm instrument-sans-regular'>{bank}</span>
                          <div className={`w-4 h-4 border-2 rounded-full ${
                            method === `netbanking-${bank.toLowerCase().replace(/\s+/g, '-')}` ? 'bg-[--green] border-[--green]' : 'border-gray-300'
                          }`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* COD Option */}
              <div 
                className={`px-6 py-4 transition-colors cursor-pointer ${
                  method === 'cod' ? 'bg-green-50 border-l-4 border-l-[--green]' : 'hover:bg-green-50'
                }`}
                onClick={() => setMethod('cod')}
              >
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center'>
                      <FontAwesomeIcon icon={faMoneyBillWave} className='text-white text-sm' />
                    </div>
                    <span className='text-gray-700 font-medium instrument-sans-regular'>Cash on Delivery</span>
                  </div>
                  <div className={`w-5 h-5 border-2 rounded-full ${
                    method === 'cod' ? 'bg-[--green] border-[--green]' : 'border-gray-300'
                  }`}></div>
                </div>
                <p className='text-sm text-gray-500 ml-11 instrument-sans-regular'>We recommend making prepaid payments to ensure your deliveries are contactless.</p>
              </div>
              
            </div>
          </div>
   
        </div>

        {/* Right Side - Reduced */}
        <div className='w-full lg:max-w-[30%] xl:max-w-[35%] mt-6 lg:mt-0'>
          <div className='sticky top-8'>
            <CartTotal /> 
            
            <div className='mt-4'>
              <h1 className='text-gray-500 instrument-sans-regular'>QUICK PAYMENT</h1>
              {/* Quick payment Method Selection */}
              <div className='flex gap-3 flex-col mt-4'> 
                <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border border-gray-300 p-3 px-4 cursor-pointer rounded-lg hover:border-[--green] transition-colors'>
                  <p className={`min-w-4 h-4 border-2 rounded-full ${method === 'stripe' ? 'bg-[--green] border-[--green]' : 'border-gray-300'}`}></p>
                  <img className='h-5' src={assets.stripe_logo} alt="Stripe" />
                </div>

                <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border border-gray-300 p-3 px-4 cursor-pointer rounded-lg hover:border-[--green] transition-colors'>
                  <p className={`min-w-4 h-4 border-2 rounded-full ${method === 'razorpay' ? 'bg-[--green] border-[--green]' : 'border-gray-300'}`}></p>
                  <img className='h-5' src={assets.razorpay_logo} alt="Razorpay" />
                </div>

                <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border border-gray-300 p-3 px-4 cursor-pointer rounded-lg hover:border-[--green] transition-colors'>
                  <p className={`min-w-4 h-4 border-2 rounded-full ${method === 'cod' ? 'bg-[--green] border-[--green]' : 'border-gray-300'}`}></p>
                  <p className='text-gray-600 text-sm font-medium'>CASH ON DELIVERY</p>
                </div>
              </div>

              <div className='w-full mt-8'>
                <button onClick={handleConfirmOrder} className='w-full bg-[--green] hover:opacity-90 rounded-lg text-white px-6 py-3 text-sm font-medium transition-colors duration-300'>
                  CONFIRM ORDER
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      </PageSection>
    </>
  )
}

export default PlaceOrder