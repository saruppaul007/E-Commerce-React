import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import ProductItem from '../../components/ProductItem';
import PageSection from '../../components/pageSection';
import Filters from '../../components/collections/Filters';
import ProductSort from '../../components/collections/ProductSort';

const CategoryPage = () => {
  const { category: categoryParam } = useParams(); // Get category from URL
  const { products, search, showSearch, addToWishlist, isInWishlist } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [mainCategory, setMainCategory] = useState([]);

  // Category mapping to match your product data structure
  const categoryMapping = {
    'shirts': 'T-Shirts',
    'oversized-t-shirts': 'Oversized T-Shirts', 
    'tops': 'Tops',
    'sneakers': 'Sneakers',
    'jumpsuits': 'Jumpsuits',
    'jackets': 'Jackets',
    'bottoms': 'Bottoms',
    'all-bottoms': 'All Bottoms',
    'accessories': 'Accessories'
  };

  // Get the display name for the current category
  const getCategoryDisplayName = () => {
    return categoryMapping[categoryParam] || categoryParam?.charAt(0).toUpperCase() + categoryParam?.slice(1) || 'All Products';
  };

  const handleWishlistToggle = (productId) => {
    addToWishlist(productId);
  }

  const handleSortedProducts = (sortedProducts) => {
    setDisplayProducts(sortedProducts);
  }

  // Helper function to check if product matches price range
  const isInPriceRange = (productPrice, priceRange) => {
    if (!priceRange) return true;
    
    const priceMatch = priceRange.match(/Rs\.\s*(\d+)\s*-\s*Rs\.\s*(\d+)/);
    if (!priceMatch) return true;
    
    const minPrice = parseInt(priceMatch[1]);
    const maxPrice = parseInt(priceMatch[2]);
    
    return productPrice >= minPrice && productPrice <= maxPrice;
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    // First filter by URL category parameter
    if (categoryParam && categoryParam !== 'all') {
      const mappedCategory = categoryMapping[categoryParam];
      if (mappedCategory) {
        productsCopy = productsCopy.filter(item => 
          item.subCategory === mappedCategory || 
          item.category === mappedCategory ||
          item.name.toLowerCase().includes(categoryParam.toLowerCase())
        );
      }
    }

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

    // Subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => 
        subCategory.includes(item.subCategory)
      )
    }

    // Size filter
    if (selectedSizes.length > 0) {
      productsCopy = productsCopy.filter(item => {
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

  // Apply filters when component mounts or dependencies change
  useEffect(() => {
    applyFilter();
  }, [categoryParam, mainCategory, category, subCategory, selectedSizes, selectedPriceRange, selectedThemes, search, showSearch, products])

  // Reset filters when category changes
  useEffect(() => {
    clearAllFilters();
  }, [categoryParam])

  return (
    <div className='flex flex-col sm:flex-row pt-10 min-h-screen mt-[60px]'>
      {/* Filter Component - Fixed sidebar */}
      <div className='w-full sm:w-64 sm:fixed sm:left-0 sm:top-20 sm:h-[calc(100vh-5rem)] sm:overflow-y-auto sm:bg-white sm:border-r sm:border-gray-200 sm:z-30 mt-[1px]'>
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
          currentCategory={categoryParam} // Pass current category to filter component
        />
      </div>

      {/* Main content section */}
      <div className='flex-1 sm:ml-64'>
        <PageSection className='min-h-screen'>
          {/* Category Header */}
          <div className='mb-6'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
              {getCategoryDisplayName()}
            </h1>
            <p className='text-gray-600'>
              {filterProducts.length} {filterProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          <div className='flex justify-end text-base sm:text-2xl mb-4'>
            {/* Product Sort Component */}
            <ProductSort 
              products={filterProducts} 
              onSortedProducts={handleSortedProducts}
            />
          </div>

          <hr />

          {/* Map Products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8 mt-2'>
            {
              displayProducts.map((item, index) => (
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

          {/* Show message when no products found */}
          {displayProducts.length === 0 && (
            <div className='text-center py-16'>
              <p className='text-gray-500 text-lg instrument-sans-regular'>
                No {getCategoryDisplayName().toLowerCase()} found matching your filters.
              </p>
              <button 
                onClick={clearAllFilters}
                className='mt-4 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors instrument-sans-regular'
              >
                Clear All Filters
              </button>
            </div>
          )}
        </PageSection>
      </div>
    </div>
  )
}

export default CategoryPage