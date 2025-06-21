import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {ShopContext} from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PageSection from '../components/pageSection';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart, addToWishlist, isInWishlist} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  // Dropdown state
  const [openSections, setOpenSections] = useState({
    productDetails: true,
    productDescription: false,
    artistDetails: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId])
  
  const [pincode, setPincode] = useState('');

  const handleCheck = () => {
    console.log('Checking pincode:', pincode);
  }

  const handleAddToWishlist = () => {
    addToWishlist(productData._id);
  }

  const handleAddToCart = () => {
    addToCart(productData._id, size);
  }

  return productData ? (
    <PageSection>
    <div className=' pt-10 transition-opacity ease-in duration-500 opacity-100 mt-[55px]'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1 '>
            <h1 className='font-medium text-2xl mt-0 italiana-regular'>{productData.name}</h1>
            <p className=' text-gray-500 md:w-4/5 instrument-sans-regular'>{productData.description}</p>
            <hr />
            <p className='mt-3 text-3xl font-medium instrument-sans-regular'>{currency}{productData.price}</p>
            <p className='text-gray-400 text-xs instrument-sans-regular'>MRP incl. of all taxes</p>
            
            <div className='flex flex-col gap-4 my-4 '>
              <p className='font-bold instrument-sans-regular'>Please Select a Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className= {`border border-gray-500 py-2 px-4 bg-white rounded-lg instrument-sans-regular ${item === size ? 'border-green-500' :  ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
             <div className='flex items-center gap-4 my-4'>
              <p className='instrument-sans-regular'>Quantity</p>
              <select 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))}
                className='border border-gray-500 py-2 px-3 rounded-lg bg-white text-sm instrument-sans-regular focus:outline-none focus:border-green-500'
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {String(i + 1).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleAddToWishlist} 
              className={`px-8 py-3 text-sm mr-5 mb-5 rounded-md border instrument-sans-regular transition-colors ${
                isInWishlist(productData._id) 
                  ? 'bg-red-500 text-white hover:bg-red-600 border-red-500' 
                  : 'bg-[--peach] text-white hover:bg-[#ff4646] hover:text-white'
              }`}
            >
              {isInWishlist(productData._id) ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
            </button>

            <button 
              onClick={handleAddToCart} 
              className='bg-white text-black px-8 py-3 text-sm hover:bg-black hover:text-white border border-black rounded-md instrument-sans-regular'
            >
              ADD TO CART
            </button>
            
            <h3 className="text-lg font-medium text-gray-800 mb-4 instrument-sans-regular">Delivery Details</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm instrument-sans-regular placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={handleCheck}
                className="px-6 py-2 bg-[#69af6d]  text-white text-sm font-medium rounded-md instrument-sans-regular transition-colors"
              >
                CHECK
              </button>
            </div>

            <div className='flex items-center gap-2 '>
              <div className='border border-opacity-5 shadow-md rounded-md p-2 mt-3'>
                <p className='instrument-sans-regular text-gray-600'>This product is eligible for return or exchange under our 15-day return or exchange policy. No questions asked.</p>
              </div>
            </div>
        </div>
      </div>

      {/* Product Details Dropdown */}
      <div className="mt-16 mb-10 max-w-full">
        <div className="bg-white border border-gray-200 rounded-lg">
          {/* Product Details Section */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection('productDetails')}
              className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-800 instrument-sans-regular">Product Details</span>
              {openSections.productDetails ? (
                <FontAwesomeIcon icon={faChevronUp} className="w-5 h-5 text-gray-600" />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            {openSections.productDetails && (
              <div className="p-4 space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-800 instrument-sans-regular">Material & Care:</span>
                  <div className="mt-1 space-y-1">
                    <div className="text-gray-600 instrument-sans-regular">Premium Heavy Gauge Fabric</div>
                    <div className="text-gray-600 instrument-sans-regular">100% Cotton</div>
                    <div className="text-gray-600 instrument-sans-regular">Machine Wash</div>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-gray8700 instrument-sans-regular text-gray-800">Country of Origin: </span>
                  <span className="text-gray-600 instrument-sans-regular">India</span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-800 instrument-sans-regular">Manufactured & Sold By:</span>
                  <div className="mt-1 space-y-1 text-gray-600">
                    <div className="instrument-sans-regular">The Fashion Store Pvt. Ltd.</div>
                    <div className="instrument-sans-regular">Sarat Bose Lane, Kolkata</div>
                    <div className="instrument-sans-regular">Bhowanipur</div>
                    <div className="instrument-sans-regular">Road.12</div>
                    <div className="instrument-sans-regular">Kolkata - 700 011</div>
                    <div className="text-[#69af6d] instrument-sans-regular">connect@thefashionstore.com</div>
                    <div className="instrument-sans-regular">Customer care no. +91 22-69871257</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Description Section */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection('productDescription')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800 instrument-sans-regular">Product Description</span>
              {openSections.productDescription ? (
                <FontAwesomeIcon icon={faChevronUp} className="w-5 h-5 text-gray-600" />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            {openSections.productDescription && (
              <div className="p-4 text-sm text-gray-600">
                <p className="instrument-sans-regular">This premium quality cotton top is made from 100% cotton with heavy gauge fabric for durability and comfort. Perfect for casual wear with a modern fit that complements any style.</p>
              </div>
            )}
          </div>

          {/* Artist's Details Section */}
          <div>
            <button
              onClick={() => toggleSection('artistDetails')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800 instrument-sans-regular">Artist's Details</span>
              {openSections.artistDetails ? (
                <FontAwesomeIcon icon={faChevronUp} className="w-5 h-5 text-gray-600" />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            {openSections.artistDetails && (
              <div className="p-4 text-sm text-gray-600">
                <div className="space-y-2">
                  <div className="instrument-sans-regular"><span className="font-medium text-gray-800 instrument-sans-regular ">Artist:</span> Jyoti Rathi</div>
                  <div className="instrument-sans-regular"><span className="font-medium text-gray-800 instrument-sans-regular">Style:</span> Contemporary Art</div>
                  <div className="instrument-sans-regular"><span className="font-medium text-gray-800 instrument-sans-regular">About:</span> Award-winning designer with over 10 years of experience in graphic design and illustration.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      
    </div>
    </PageSection>
  ) : <div className='opacity-0'></div>
}

export default Product