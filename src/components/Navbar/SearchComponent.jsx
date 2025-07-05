import React, { useState, useEffect, useRef, useContext } from 'react';
import { assets, products } from '../../assets/assets'; // Adjust the path if needed
import { ShopContext } from '../../context/ShopContext'; // Import ShopContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SearchComponent = ({ isScrolled, isHomePage, onSearchResults }) => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    
    // Get search context and navigate function
    const { search, setSearch, setShowSearch } = useContext(ShopContext);
    const navigate = useNavigate();
    
    const searchRef = useRef(null);
    const resultsRef = useRef(null);

    // Sync local searchQuery with global search state
    useEffect(() => {
        setSearchQuery(search);
    }, [search]);

    // Close search results and search bar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
                setSelectedIndex(-1);
                // Close search bar if no search query
                if (!searchQuery.trim()) {
                    setShowSearchBar(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [searchQuery]);

    // Handler for search functionality
    const handleSearchClick = () => {
        setShowSearchBar(!showSearchBar);
        if (!showSearchBar) {
            // Focus on input when search bar opens
            setTimeout(() => {
                const searchInput = document.querySelector('.search-input');
                if (searchInput) searchInput.focus();
            }, 100);
        } else {
            // Clear search when closing
            setSearchQuery('');
            setSearchResults([]);
            setShowResults(false);
            setSelectedIndex(-1);
            // Clear global search state
            setSearch('');
            setShowSearch(false);
        }
    };

    // Search through products
    const searchProducts = (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        const searchTerm = query.toLowerCase();
        
        // Search through product names, categories, subcategories, and descriptions
        const results = products.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(searchTerm);
            const categoryMatch = product.category.toLowerCase().includes(searchTerm);
            const subCategoryMatch = product.subCategory.toLowerCase().includes(searchTerm);
            const descriptionMatch = product.description.toLowerCase().includes(searchTerm);
            
            return nameMatch || categoryMatch || subCategoryMatch || descriptionMatch;
        });

        // Create unique suggestions for categories and subcategories
        const categoryResults = [...new Set(
            products
                .filter(product => 
                    product.category.toLowerCase().includes(searchTerm) ||
                    product.subCategory.toLowerCase().includes(searchTerm)
                )
                .map(product => ({
                    type: 'category',
                    value: product.category,
                    subCategory: product.subCategory,
                    id: `cat-${product.category}-${product.subCategory}`
                }))
                .map(item => JSON.stringify(item))
        )].map(item => JSON.parse(item));

        // Combine and limit results
        const combinedResults = [
            ...results.slice(0, 5).map(product => ({ type: 'product', ...product })),
            ...categoryResults.slice(0, 3)
        ];

        setSearchResults(combinedResults);
        setShowResults(true);
        setSelectedIndex(-1);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Hide dropdown
            setShowResults(false);
            
            // Update global search state
            setSearch(searchQuery.trim());
            setShowSearch(true);
            
            // If there's a selected result, use it
            if (selectedIndex >= 0 && searchResults[selectedIndex]) {
                const selectedResult = searchResults[selectedIndex];
                if (selectedResult.type === 'product') {
                    // Navigate to product page
                    navigate(`/product/${selectedResult._id}`);
                    return;
                } else if (selectedResult.type === 'category') {
                    // Set search to subcategory name for filtering
                    setSearch(selectedResult.subCategory);
                }
            }
            
            // Navigate to collection page to show search results
            navigate('/collection');
            
            // Call parent callback if provided (for cases where search is used on collection page itself)
            if (onSearchResults) {
                const filteredProducts = products.filter(product => {
                    const searchTerm = searchQuery.toLowerCase();
                    return product.name.toLowerCase().includes(searchTerm) ||
                           product.category.toLowerCase().includes(searchTerm) ||
                           product.subCategory.toLowerCase().includes(searchTerm) ||
                           product.description.toLowerCase().includes(searchTerm);
                });
                onSearchResults(filteredProducts, searchQuery);
            }
        }
    };

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        searchProducts(value);
        
        // Auto-close search bar if input becomes empty
        if (!value.trim()) {
            setTimeout(() => {
                if (!value.trim()) { // Double check after timeout
                    setShowSearchBar(false);
                }
            }, 2000); // Close after 2 seconds of empty input
        }
    };

    const handleKeyDown = (e) => {
        if (!showResults || searchResults.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < searchResults.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev > 0 ? prev - 1 : searchResults.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    const selectedResult = searchResults[selectedIndex];
                    if (selectedResult.type === 'product') {
                        setSearchQuery(selectedResult.name);
                        // Navigate directly to product
                        navigate(`/product/${selectedResult._id}`);
                        setShowResults(false);
                        return;
                    } else if (selectedResult.type === 'category') {
                        setSearchQuery(selectedResult.subCategory);
                    }
                }
                handleSearchSubmit(e);
                break;
            case 'Escape':
                setShowResults(false);
                setSelectedIndex(-1);
                break;
            default:
                break;
        }
    };

    const handleResultClick = (result) => {
        if (result.type === 'product') {
            // Navigate directly to product page
            navigate(`/product/${result._id}`);
            setShowResults(false);
            setShowSearchBar(false); // Close search bar after selecting
        } else if (result.type === 'category') {
            setSearchQuery(result.subCategory);
            setSearch(result.subCategory);
            setShowSearch(true);
            setShowResults(false);
            setShowSearchBar(false); // Close search bar after selecting
            
            // Navigate to collection page
            navigate('/collection');
        }
        
        // Call parent callback if provided
        if (onSearchResults) {
            let filteredProducts;
            if (result.type === 'product') {
                filteredProducts = products.filter(p => p._id === result._id);
            } else if (result.type === 'category') {
                filteredProducts = products.filter(p => 
                    p.category === result.value && p.subCategory === result.subCategory
                );
            }
            onSearchResults(filteredProducts, result.type === 'product' ? result.name : result.subCategory);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setShowResults(false);
        setSelectedIndex(-1);
        // Clear global search state
        setSearch('');
        setShowSearch(false);
        // Close search bar after clearing
        setShowSearchBar(false);
    };

    const highlightText = (text, query) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) => 
            part.toLowerCase() === query.toLowerCase() ? 
                <span key={index} className="font-semibold text-[--green]">{part}</span> : 
                part
        );
    };

    return (
        <div className='flex items-center gap-2 relative' ref={searchRef}>
            {/* Search input - slides in from right */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out relative ${
                showSearchBar ? 'w-48 sm:w-64' : 'w-0'
            }`}>
                <form onSubmit={handleSearchSubmit} className='w-full'>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products, categories..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            onKeyDown={handleKeyDown}
                            onFocus={() => searchQuery && setShowResults(true)}
                            onBlur={(e) => {
                                // Prevent closing if clicking on results
                                if (!e.relatedTarget || !resultsRef.current?.contains(e.relatedTarget)) {
                                    setTimeout(() => {
                                        setShowResults(false);
                                        // Close search bar if empty after losing focus
                                        if (!searchQuery.trim()) {
                                            setShowSearchBar(false);
                                        }
                                    }, 150);
                                }
                            }}
                            className={`search-input w-full px-3 py-1.5 pr-16 text-sm border rounded-lg outline-none transition-all duration-300 instrument-sans-regular ${
                                isScrolled || !isHomePage 
                                    ? 'border-gray-300 bg-white/90 text-gray-700 placeholder-gray-400' 
                                    : 'border-white/50 bg-white/20 text-white placeholder-white/70 backdrop-blur-sm'
                            } focus:border-[--gray] focus:ring-1 focus:ring-red-200`}
                        />
                        
                        {/* Right side icons container */}
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                            {/* Clear search button */}
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className={`hover:scale-110 transition-transform ${
                                        isScrolled || !isHomePage ? 'text-gray-400 hover:text-gray-600' : 'text-white/70 hover:text-white'
                                    }`}
                                >
                                    ✕
                                </button>
                            )}
                            
                            {/* Search icon inside input (hidden on mobile, only show when search bar is fully open) */}
                            {showSearchBar && (
                                <img
                                    onClick={handleSearchSubmit}
                                    src={assets.search_icon}
                                    className={`hidden sm:block w-4 h-4 cursor-pointer transition-all duration-300 ${
                                        isScrolled || !isHomePage ? 'opacity-80 brightness-0' : 'brightness-0 invert'
                                    } hover:scale-110`}
                                    alt="Search"
                                />
                            )}
                        </div>
                    </div>
                </form>

                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                    <div 
                        ref={resultsRef}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
                    >
                        {searchResults.map((result, index) => (
                            <div
                                key={result.type === 'product' ? result._id : result.id}
                                onClick={() => handleResultClick(result)}
                                className={`px-3 py-2 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                                    selectedIndex === index 
                                        ? 'bg-gray-100' 
                                        : 'hover:bg-gray-50'
                                }`}
                            >
                                {result.type === 'product' ? (
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={result.image[0]} 
                                            alt={result.name}
                                            className="w-8 h-8 object-cover rounded"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-gray-900 truncate instrument-sans-regular">
                                                {highlightText(result.name, searchQuery)}
                                            </div>
                                            <div className="text-xs text-gray-500 instrument-sans-regular">
                                                {result.category} • {result.subCategory} • Rs. {result.price}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                                            <span className="text-xs font-semibold text-gray-600">
                                                {result.value.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-900 instrument-sans-regular">
                                                {highlightText(result.subCategory, searchQuery)}
                                            </div>
                                            <div className="text-xs text-gray-500 instrument-sans-regular">
                                                in {result.value}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {/* Show all results option */}
                        <div
                            onClick={() => handleSearchSubmit({ preventDefault: () => {} })}
                            className="px-3 py-2 text-sm text-[--green] hover:bg-gray-50 cursor-pointer border-t border-gray-200 font-medium instrument-sans-regular"
                        >
                            Search for "{searchQuery}" in all products
                        </div>
                    </div>
                )}

                {/* No results message */}
                {showResults && searchQuery && searchResults.length === 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
                        <div className="text-sm text-gray-500 text-center instrument-sans-regular">
                            No products found for "{searchQuery}"
                        </div>
                    </div>
                )}
            </div>
            
            {/* Search icon - outside input (visible when search bar is closed) */}
            {!showSearchBar && (
                <img
                    onClick={handleSearchClick}
                    src={assets.search_icon}
                    className={`w-5 cursor-pointer transition-all duration-500 ${
                        isScrolled || !isHomePage ? 'opacity-80 brightness-0' : 'brightness-0 invert'
                    } hover:scale-110`}
                    alt="Search"
                />
            )}
        </div>
    );
};

export default SearchComponent;