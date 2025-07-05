import React, { useState } from 'react';
import { assets } from '../../assets/assets';

const Filters = ({ 
  category = [],
  subCategory = [],
  selectedSizes = [],
  selectedPriceRange = '',
  selectedThemes = [],
  mainCategory = [],
  onCategoryChange,
  onSubCategoryChange,
  onSizeChange,
  onPriceRangeChange,
  onThemeChange,
  onMainCategoryChange,
  onClearFilters
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllThemes, setShowAllThemes] = useState(false);
  
  // Search states
  const [categorySearch, setCategorySearch] = useState('');
  const [sizeSearch, setSizeSearch] = useState('');
  const [themeSearch, setThemeSearch] = useState('');

  const toggleCategory = (e) => {
    const value = e.target.value;
    let newCategory;
    if (category.includes(value)) {
      newCategory = category.filter(item => item !== value);
    } else {
      newCategory = [...category, value];
    }
    onCategoryChange(newCategory);
  }

  const toggleMainCategory = (e) => {
    const value = e.target.value;
    let newMainCategory;
    if (mainCategory.includes(value)) {
      newMainCategory = mainCategory.filter(item => item !== value);
    } else {
      newMainCategory = [...mainCategory, value];
    }
    onMainCategoryChange(newMainCategory);
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    let newSubCategory;
    if (subCategory.includes(value)) {
      newSubCategory = subCategory.filter(item => item !== value);
    } else {
      newSubCategory = [...subCategory, value];
    }
    onSubCategoryChange(newSubCategory);
  }

  const toggleSize = (size) => {
    let newSizes;
    if (selectedSizes.includes(size)) {
      newSizes = selectedSizes.filter(item => item !== size);
    } else {
      newSizes = [...selectedSizes, size];
    }
    onSizeChange(newSizes);
  }

  const toggleTheme = (e) => {
    const value = e.target.value;
    let newThemes;
    if (selectedThemes.includes(value)) {
      newThemes = selectedThemes.filter(item => item !== value);
    } else {
      newThemes = [...selectedThemes, value];
    }
    onThemeChange(newThemes);
  }

  const categories = [
    'Cotton Top', 'T-Shirts', 'Joggers', 'Cotton Linen Shirts', 'Denim Jackets', 'Denim Shirts', 'Drop Cut T-Shirts', 'Full Sleeve T-Shirts',
    'Easy Fit Vests', 'Half Sleeve Shirts', 'Sneakers', 'Women Cargo Jeans', 'Women Jeans', 'Denim Dresses', 'Women Dresses', 'Polo T-shirts',
    'Hoodies', 'Sweatshirts', 'Tank Tops', 'Crop Tops', 'Blazers', 'Cardigans', 'Sweaters', 'Jumpsuits', 'Shorts', 'Skirts',
    'Leggings', 'Track Pants', 'Formal Shirts', 'Casual Shirts', 'Graphic Tees', 'Plain Tees', 'V-Neck Tees', 'Round Neck Tees',
    'Button Down Shirts', 'Flannel Shirts', 'Henley Shirts', 'Long Sleeve Tees', 'Muscle Tees', 'Oversized Tees', 'Fitted Tees'
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
    'Weekend', 'Archie Comics', 'Avatar', 'Casual', 'BGMI',
    'Party Outfits', 'Office Suites', 'Berlin', 'Hang Outs', 'Brooklyn Nine-Nine', 'Disney',
    'Marvel', 'DC Comics', 'Anime', 'Retro', 'Vintage', 'Sports', 'Music', 'Travel', 'Nature', 'Abstract', 'Minimalist', 'Bohemian'
  ];

  const mainCategories = ['Men', 'Women', 'Kids'];

  // Filter functions based on search
  const filteredCategories = categories.filter(cat => 
    cat.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredSizes = sizes.filter(size => 
    size.toLowerCase().includes(sizeSearch.toLowerCase())
  );

  const filteredThemes = themes.filter(theme => 
    theme.toLowerCase().includes(themeSearch.toLowerCase())
  );

  // Determine how many categories and themes to show
  const categoriesToShow = showAllCategories ? filteredCategories : filteredCategories.slice(0, 8);
  const themesToShow = showAllThemes ? filteredThemes : filteredThemes.slice(0, 8);
  
  const remainingCategoriesCount = filteredCategories.length - 8;
  const remainingThemesCount = filteredThemes.length - 8;

  // Clear search function
  const clearSearch = (type) => {
    switch(type) {
      case 'category':
        setCategorySearch('');
        break;
      case 'size':
        setSizeSearch('');
        break;
      case 'theme':
        setThemeSearch('');
        break;
      default:
        break;
    }
  };

  return (
    <div className='w-full sm:w-64'>
      <div className='p-4 '>
        <div className='flex justify-between items-center mb-4'>
          <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 font-semibold italiana-regular'>
            FILTERS
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>
          
          {/* Clear All Filters Button */}
          <button 
            onClick={onClearFilters}
            className='text-xs text-gray-500 hover:text-gray-700 underline instrument-sans-regular'
          >
            Clear All
          </button>
        </div>
        
        {/* Main Categories Section (Men, Women, Kids) */}
        <div className={`border-b border-gray-200 py-4 ${showFilter ? '' :'hidden'} sm:block`}>
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
        <div className={`border-b border-gray-200 py-4 ${showFilter ? '' :'hidden'} sm:block`}>
          <h3 className='mb-3 text-sm font-semibold text-gray-800 uppercase instrument-sans-regular'>SUB CATEGORIES</h3>
          <div className='mb-3 relative'>
            <input 
              type="text" 
              placeholder="Search for Categories" 
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500 instrument-sans-regular pr-8'
            />
            {categorySearch && (
              <button
                onClick={() => clearSearch('category')}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                ✕
              </button>
            )}
          </div>
          <div>
            {categoriesToShow.length > 0 ? (
              categoriesToShow.map((cat, index) => (
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
              ))
            ) : (
              <p className='text-sm text-gray-400 py-2 instrument-sans-regular'>No categories found</p>
            )}
          </div>
          {remainingCategoriesCount > 0 && filteredCategories.length > 8 && (
            <button 
              onClick={() => setShowAllCategories(!showAllCategories)}
              className='text-[#69af6d] text-sm mt-2 hover:underline instrument-sans-regular'
            >
              {showAllCategories ? 'Show Less' : `+ ${remainingCategoriesCount} more`}
            </button>
          )}
        </div>

        {/* Size Section */}
        <div className={`border-b border-gray-200 py-4 ${showFilter ? '' :'hidden'} sm:block`}>
          <h3 className='mb-3 text-sm font-semibold text-gray-800 uppercase instrument-sans-regular'>SIZE</h3>
          <div className='mb-3 relative'>
            <input 
              type="text" 
              placeholder="Search for Size" 
              value={sizeSearch}
              onChange={(e) => setSizeSearch(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500 instrument-sans-regular pr-8'
            />
            {sizeSearch && (
              <button
                onClick={() => clearSearch('size')}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                ✕
              </button>
            )}
          </div>
          <div className='grid grid-cols-4 gap-2'>
            {filteredSizes.length > 0 ? (
              filteredSizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-2 border border-gray-300 rounded text-sm font-medium transition-colors instrument-sans-regular
                    ${selectedSizes.includes(size) 
                      ? 'bg-[--green] text-white border-[--green]' 
                      : 'bg-white text-gray-700 hover:border-gray-400'
                    }`}
                >
                  {size}
                </button>
              ))
            ) : (
              <p className='text-sm text-gray-400 py-2 col-span-4 instrument-sans-regular'>No sizes found</p>
            )}
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
                  onChange={(e) => onPriceRangeChange(e.target.value)}
                  className='w-4 h-4 border text-green-600 border-gray-300 focus:ring-green-600 accent-green-600 cursor-pointer'
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
          <div className='mb-3 relative'>
            <input 
              type="text" 
              placeholder="Search for Themes" 
              value={themeSearch}
              onChange={(e) => setThemeSearch(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500 instrument-sans-regular pr-8'
            />
            {themeSearch && (
              <button
                onClick={() => clearSearch('theme')}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                ✕
              </button>
            )}
          </div>
          <div>
            {themesToShow.length > 0 ? (
              themesToShow.map((theme, index) => (
                <label key={index} className='flex items-center gap-2 py-1 text-sm text-gray-600 hover:text-gray-800 cursor-pointer'>
                  <input 
                    type="checkbox" 
                    className='w-4 h-4 border border-gray-300 rounded'
                    onChange={toggleTheme}
                    value={theme}
                    checked={selectedThemes.includes(theme)}
                  />
                  <span className='instrument-sans-regular'>{theme}</span>
                </label>
              ))
            ) : (
              <p className='text-sm text-gray-400 py-2 instrument-sans-regular'>No themes found</p>
            )}
          </div>
          {remainingThemesCount > 0 && filteredThemes.length > 8 && (
            <button 
              onClick={() => setShowAllThemes(!showAllThemes)}
              className='text-[#69af6d] text-sm mt-2 hover:underline instrument-sans-regular'
            >
              {showAllThemes ? 'Show Less' : `+ ${remainingThemesCount} more`}
            </button>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Filters;