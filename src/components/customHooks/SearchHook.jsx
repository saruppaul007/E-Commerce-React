// useSearch.js - Custom hook for search functionality
import { useState, useMemo } from 'react';

export const useSearch = (products) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Search function
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    
    return products.filter(product => {
      // Search in product name
      const nameMatch = product.name.toLowerCase().includes(query);
      
      // Search in product description
      const descriptionMatch = product.description.toLowerCase().includes(query);
      
      // Search in category
      const categoryMatch = product.category.toLowerCase().includes(query);
      
      // Search in subcategory
      const subCategoryMatch = product.subCategory.toLowerCase().includes(query);
      
      // Search in common terms
      const commonTerms = {
        'shirt': ['t-shirt', 'tshirt', 'shirt', 'top'],
        'jacket': ['jacket', 'coat', 'outerwear'],
        'pant': ['trouser', 'pant', 'jogger', 'bottom'],
        'top': ['top', 'shirt', 't-shirt', 'blouse'],
        'men': ['men', 'man', 'male', 'boy'],
        'women': ['women', 'woman', 'female', 'girl', 'lady'],
        'kids': ['kids', 'kid', 'child', 'children'],
        'cotton': ['cotton', 'soft', 'comfortable'],
        'denim': ['denim', 'jean', 'jeans'],
        'winter': ['winter', 'warm', 'cold', 'winterwear'],
        'casual': ['casual', 'relaxed', 'comfortable'],
        'fit': ['slim', 'relaxed', 'fit', 'fitted', 'loose']
      };
      
      // Check if query matches any common terms
      const termMatch = Object.entries(commonTerms).some(([key, synonyms]) => {
        if (query.includes(key) || synonyms.some(synonym => query.includes(synonym))) {
          return synonyms.some(synonym => 
            product.name.toLowerCase().includes(synonym) ||
            product.description.toLowerCase().includes(synonym) ||
            product.category.toLowerCase().includes(synonym) ||
            product.subCategory.toLowerCase().includes(synonym)
          );
        }
        return false;
      });

      return nameMatch || descriptionMatch || categoryMatch || subCategoryMatch || termMatch;
    });
  }, [products, searchQuery]);

  const isSearchActive = searchQuery.trim().length > 0;

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchActive
  };
};