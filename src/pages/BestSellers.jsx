import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Filters from '../components/collections/Filters';
import BestSellersMain from '../components/BestSellersMain';

const BestSellers = () => {
  const { products, search, showSearch, addToWishlist, isInWishlist } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [mainCategory, setMainCategory] = useState([]);

  const handleWishlistToggle = (productId) => {
    addToWishlist(productId);
  }

  const handleSortedProducts = (sortedProducts) => {
    setDisplayProducts(sortedProducts);
  }

  // Helper function to check if product matches price range
  const isInPriceRange = (productPrice, priceRange) => {
    if (!priceRange) return true;
    
    // Extract min and max from price range string like "Rs. 499 - Rs. 999"
    const priceMatch = priceRange.match(/Rs\.\s*(\d+)\s*-\s*Rs\.\s*(\d+)/);
    if (!priceMatch) return true;
    
    const minPrice = parseInt(priceMatch[1]);
    const maxPrice = parseInt(priceMatch[2]);
    
    return productPrice >= minPrice && productPrice <= maxPrice;
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    // FIRST FILTER: Only show bestseller products
    productsCopy = productsCopy.filter(item => item.bestseller === true);

    // Search filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Main category filter (Men, Women, Kids)
    if (mainCategory.length > 0) {
      productsCopy = productsCopy.filter(item => 
        mainCategory.includes(item.category)
      );
    }

    // Sub-category filter (T-Shirts, Joggers, etc.)
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => 
        category.includes(item.subCategory)
      );
    }

    // Subcategory filter (if you have a separate subCategory field)
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => 
        subCategory.includes(item.subCategory)
      )
    }

    // Size filter
    if (selectedSizes.length > 0) {
      productsCopy = productsCopy.filter(item => {
        // Assuming each product has a 'sizes' array
        if (item.sizes && Array.isArray(item.sizes)) {
          return selectedSizes.some(size => item.sizes.includes(size));
        }
        return false;
      });
    }

    // Price range filter
    if (selectedPriceRange) {
      productsCopy = productsCopy.filter(item => 
        isInPriceRange(item.price, selectedPriceRange)
      );
    }

    // Theme filter
    if (selectedThemes.length > 0) {
      productsCopy = productsCopy.filter(item => {
        // Assuming each product has a 'themes' array or 'theme' string
        if (item.themes && Array.isArray(item.themes)) {
          return selectedThemes.some(theme => item.themes.includes(theme));
        } else if (item.theme) {
          return selectedThemes.includes(item.theme);
        }
        return false;
      });
    }

    setFilterProducts(productsCopy);
  }

  const clearAllFilters = () => {
    setMainCategory([]);
    setCategory([]);
    setSubCategory([]);
    setSelectedSizes([]);
    setSelectedPriceRange('');
    setSelectedThemes([]);
  }

  // Update useEffect to include all filter dependencies
  useEffect(() => {
    applyFilter();
  }, [mainCategory, category, subCategory, selectedSizes, selectedPriceRange, selectedThemes, search, showSearch, products])

  return (
    <div className='flex flex-col sm:flex-row pt-10 min-h-screen mt-[60px]'>
      {/* Filter Component - Fixed sidebar with proper positioning */}
      <div className='w-full sm:w-64 sm:sticky sm:top-20 sm:self-start sm:max-h-[calc(100vh-5rem)] sm:overflow-y-auto bg-white border-b sm:border-r sm:border-b-0 border-gray-200'>
        <Filters
          category={category}
          subCategory={subCategory}
          selectedSizes={selectedSizes}
          selectedPriceRange={selectedPriceRange}
          selectedThemes={selectedThemes}
          mainCategory={mainCategory}
          onCategoryChange={setCategory}
          onSubCategoryChange={setSubCategory}
          onSizeChange={setSelectedSizes}
          onPriceRangeChange={setSelectedPriceRange}
          onThemeChange={setSelectedThemes}
          onMainCategoryChange={setMainCategory}
          onClearFilters={clearAllFilters}
        />
      </div>

      {/* Main BestSellers Component */}
      <div className='flex-1 min-w-0'>
      <BestSellersMain
        filterProducts={filterProducts}
        displayProducts={displayProducts}
        handleSortedProducts={handleSortedProducts}
        handleWishlistToggle={handleWishlistToggle}
        isInWishlist={isInWishlist}
        clearAllFilters={clearAllFilters}
      />
      </div>
    </div>
  )
}

export default BestSellers