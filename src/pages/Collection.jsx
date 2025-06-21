import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import PageSection from '../components/pageSection';

const Collection = () => {

  const { products, search, showSearch, addToWishlist, isInWishlist } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType]= useState('relavent')
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [mainCategory, setMainCategory] = useState([]);
 

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleMainCategory = (e) => {
    if (mainCategory.includes(e.target.value)) {
      setMainCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setMainCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(prev => prev.filter(item => item !== size))
    }
    else{
      setSelectedSizes(prev => [...prev, size])
    }
  }

  const toggleTheme = (e) => {
    if (selectedThemes.includes(e.target.value)) {
      setSelectedThemes(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setSelectedThemes(prev => [...prev, e.target.value])
    }
  }

  const handleWishlistToggle = (productId) => {
    addToWishlist(productId);
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (mainCategory.length > 0) {
      productsCopy = productsCopy.filter(item => mainCategory.includes(item.category));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
      break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [mainCategory, category, subCategory, search, showSearch])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  const categories = [
    'Cotton Top', 'T-Shirts', 'Joggers', 'Cotton Linen Shirts',
    'Denim Jackets', 'Denim Shirts', 'Drop Cut T-Shirts', 'Easy Fit Full Sleeve T-Shirts',
    'Easy Fit Vests', 'Half Sleeve Shirts'
  ];

  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const priceRanges = [
    'Rs. 499 - Rs. 999',
    'Rs. 1000 - Rs. 1599',
    'Rs. 1600 - Rs. 1999',
    'Rs. 2000 - Rs. 2499',
    'Rs. 2500 - Rs. 2999',
    'Rs. 3000 - Rs. 3999'
  ];

  const themes = [
    'Weekend', 'Archie Comics', 'Avatar', 'Avatar: The Last Airbender', 'BGMI',
    'Babil Khan', 'Baki Hanma', 'Berlin', 'Breaking Bad', 'Brooklyn Nine-Nine'
  ];

  const mainCategories = ['Men', 'Women', 'Kids'];

  return (
    <div className='flex flex-col sm:flex-row pt-10 min-h-screen mt-[60px]'>

      {/* Filter options - Fixed sidebar with proper positioning */}
      <div className='w-full sm:w-64 sm:fixed sm:left-0 sm:top-20 sm:h-[calc(100vh-5rem)] sm:overflow-y-auto sm:bg-white sm:border-r sm:border-gray-200 sm:z-30 mt-[1px]'>
        <div className='p-4'>
          <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 font-semibold italiana-regular '>FILTERS
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>
          
          {/* Main Categories Section (Men, Women, Kids) */}
          <div className={`border-b border-gray-200 py-4  ${showFilter ? '' :'hidden'} sm:block`}>
            <h3 className='mb-3 text-sm font-semibold text-gray-800 uppercase instrument-sans-regular'>CATEGORIES</h3>
            <div className='space-y-2'>
              {mainCategories.map((cat, index) => (
                <label key={index} className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 cursor-pointer instrument-sans-regular'>
                  <input 
                    type="checkbox" 
                    className='w-4 h-4 border border-gray-300 rounded'
                    onChange={toggleMainCategory}
                    value={cat}
                    checked={mainCategory.includes(cat)}
                  />
                  <span className='instrument-sans-regular'>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sub Categories Section */}
          <div className={`border-b border-gray-200 py-4  ${showFilter ? '' :'hidden'} sm:block`}>
            <h3 className='mb-3 text-sm font-semibold text-gray-800 uppercase instrument-sans-regular'>SUB CATEGORIES</h3>
            <div className='mb-3'>
              <input 
                type="text" 
                placeholder="Search for Categories" 
                className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500 instrument-sans-regular'
              />
            </div>
            <div className='max-h-48 overflow-y-auto '>
              {categories.map((cat, index) => (
                <label key={index} className='flex items-center gap-2 py-1 text-sm text-gray-500 hover:text-gray-600 cursor-pointer instrument-sans-regular'>
                  <input 
                    type="checkbox" 
                    className='w-4 h-4 border border-gray-300 rounded'
                    onChange={toggleCategory}
                    value={cat}
                    checked={category.includes(cat)}
                  />
                  <span className='instrument-sans-regular'>{cat}</span>
                </label>
              ))}
            </div>
            <button className='text-[#69af6d] text-sm mt-2 hover:underline instrument-sans-regular'>+ 48 more</button>
          </div>

          {/* Size Section */}
          <div className={`border-b border-gray-200 py-4 ${showFilter ? '' :'hidden'} sm:block`}>
            <h3 className='mb-3 text-sm font-semibold text-gray-800 uppercase instrument-sans-regular'>SIZE</h3>
            <div className='mb-3'>
              <input 
                type="text" 
                placeholder="Search for Size" 
                className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500 instrument-sans-regular'
              />
            </div>
            <div className='grid grid-cols-4 gap-2'>
              {sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-2 border border-gray-300 rounded text-sm font-medium transition-colors instrument-sans-regular
                    ${selectedSizes.includes(size) 
                      ? 'bg-gray-800 text-white border-gray-800' 
                      : 'bg-white text-gray-700 hover:border-gray-400'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Section */}
          <div className={`border-b border-gray-200 py-4 ${showFilter ? '' :'hidden'} sm:block`}>
            <h3 className='mb-3 text-sm font-semibold text-gray-800 uppercase instrument-sans-regular'>PRICES</h3>
            <div className='space-y-2'>
              {priceRanges.map((range, index) => (
                <label key={index} className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 cursor-pointer'>
                  <input 
                    type="radio" 
                    name="priceRange"
                    value={range}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className='w-4 h-4 border border-gray-300'
                    checked={selectedPriceRange === range}
                  />
                  <span className='instrument-sans-regular'>{range}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Themes Section */}
          <div className={`py-4 ${showFilter ? '' :'hidden'} sm:block`}>
            <h3 className='mb-3 text-sm font-semibold text-gray-800 uppercase instrument-sans-regular'>THEMES</h3>
            <div className='mb-3'>
              <input 
                type="text" 
                placeholder="Search for Themes" 
                className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500 instrument-sans-regular'
              />
            </div>
            <div className='max-h-48 overflow-y-auto '>
              {themes.map((theme, index) => (
                <label key={index} className='flex items-center gap-2 py-1 text-sm text-gray-600 hover:text-gray-800 cursor-pointer '>
                  <input 
                    type="checkbox" 
                    className='w-4 h-4 border border-gray-300 rounded '
                    onChange={toggleTheme}
                    value={theme}
                    checked={selectedThemes.includes(theme)}
                  />
                  <span className='instrument-sans-regular'>{theme}</span>
                </label>
              ))}
            </div>
            <button className='text-[#69af6d] text-sm mt-2 hover:underline instrument-sans-regular'>+ 74 more</button>
          </div>
        </div>
      </div>

      {/* Main content section - Properly offset from sidebar with PageSection */}
      <div className='flex-1 sm:ml-64'>
        <PageSection className='min-h-screen'>
          <div className='flex justify-end text-base sm:text-2xl mb-4'>
            {/* Product Sort */}
            <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-300 text-sm px-3 py-2 bg-white text-gray-500 focus:outline-none rounded-md pr-6 '>
              <option value="" disabled selected hidden>Select Sorting Options</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
              <option value="a-z">A to Z</option>
              <option value="z-a">Z to A</option>
              <option value="newest">Newest</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>

          <hr />

          {/* Map Products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8 mt-2'>
            {
              filterProducts.map((item, index) => (
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
        </PageSection>
      </div>

    </div>
  )
}

export default Collection