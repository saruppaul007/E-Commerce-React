import React, { useState, useEffect } from 'react';

const ProductSort = ({ products, onSortedProducts, className = '' }) => {
  const [sortType, setSortType] = useState('relavent');

  const sortProducts = (productsToSort, sortOption) => {
    if (!productsToSort || productsToSort.length === 0) return productsToSort;
    
    let sortedProducts = [...productsToSort];

    switch (sortOption) {
      case 'low-high':
        sortedProducts.sort((a, b) => (a.price - b.price));
        break;

      case 'high-low':
        sortedProducts.sort((a, b) => (b.price - a.price));
        break;

      case 'a-z':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'z-a':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case 'newest':
        // Assuming you have a date field or _id that can be used for sorting
        sortedProducts.sort((a, b) => new Date(b.date || b._id) - new Date(a.date || a._id));
        break;

      case 'popularity':
        // Assuming you have a popularity field or use some other metric
        sortedProducts.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;

      case 'relavent':
      default:
        // Return original order for 'relavent' or default
        break;
    }

    return sortedProducts;
  };

  const handleSortChange = (newSortType) => {
    setSortType(newSortType);
    const sortedProducts = sortProducts(products, newSortType);
    onSortedProducts(sortedProducts);
  };

  // Sort products whenever the products prop changes
  useEffect(() => {
    const sortedProducts = sortProducts(products, sortType);
    onSortedProducts(sortedProducts);
  }, [products]);

  return (
    <select 
      value={sortType}
      onChange={(e) => handleSortChange(e.target.value)} 
      className={`border border-gray-300 text-sm px-3 py-2 bg-white text-gray-500 focus:outline-none rounded-md pr-6 instrument-sans-regular ${className}`}
    >
      <option value="relavent" className='instrument-sans-regular'>Select Sorting Options</option>
      <option value="low-high" className='instrument-sans-regular'>Low to High</option>
      <option value="high-low" className='instrument-sans-regular'>High to Low</option>
      <option value="a-z" className='instrument-sans-regular'>A to Z</option>
      <option value="z-a" className='instrument-sans-regular'>Z to A</option>
      <option value="newest" className='instrument-sans-regular'>Newest</option>
      <option value="popularity" className='instrument-sans-regular'>Popularity</option>
    </select>
  );
};

export default ProductSort;