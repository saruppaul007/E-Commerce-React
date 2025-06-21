import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = `$`;
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    // Initialize cart from localStorage or empty object
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : {};
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return {};
        }
    });
    
    // Initialize wishlist from localStorage or empty object
    const [wishlistItems, setWishlistItems] = useState(() => {
        try {
            const savedWishlist = localStorage.getItem('wishlistItems');
            return savedWishlist ? JSON.parse(savedWishlist) : {};
        } catch (error) {
            console.error('Error loading wishlist from localStorage:', error);
            return {};
        }
    });
    
    const navigate = useNavigate();

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cartItems]);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
        } catch (error) {
            console.error('Error saving wishlist to localStorage:', error);
        }
    }, [wishlistItems]);

    // Navigate to product and scroll to top
    const navigateToProduct = (productId) => {
        navigate(`/product/${productId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const addToCart = async (itemId, size) => {
        // Check if size is selected
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        // Clone the current cart items
        let cartData = structuredClone(cartItems);

        // Add item to cart
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        // Update cart state
        setCartItems(cartData);
        
        // Show success message
        toast.success('Product Added to Cart');
    }

    const addToWishlist = async (itemId) => {
        let wishlistData = structuredClone(wishlistItems);
        
        if (wishlistData[itemId]) {
            // If already in wishlist, remove it
            delete wishlistData[itemId];
            toast.info('Product Removed from Wishlist');
        } else {
            // Add to wishlist
            wishlistData[itemId] = true;
            toast.success('Product Added to Wishlist');
        }
        
        setWishlistItems(wishlistData);
    }

    const removeFromWishlist = async (itemId) => {
        let wishlistData = structuredClone(wishlistItems);
        delete wishlistData[itemId];
        setWishlistItems(wishlistData);
        toast.info('Product Removed from Wishlist');
    }

    const isInWishlist = (itemId) => {
        return !!wishlistItems[itemId];
    }

    const getWishlistCount = () => {
        return Object.keys(wishlistItems).length;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.error('Error calculating cart amount:', error);
                }
            }
        }
        return totalAmount;
    }
    
    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error('Error calculating cart count:', error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);
    }

    // Optional: Clear cart function
    const clearCart = () => {
        setCartItems({});
        toast.info('Cart cleared');
    }

    // Optional: Clear wishlist function
    const clearWishlist = () => {
        setWishlistItems({});
        toast.info('Wishlist cleared');
    }

    const value = {
        products, 
        currency, 
        delivery_fee, 
        search, 
        setSearch, 
        showSearch, 
        setShowSearch, 
        cartItems, 
        wishlistItems,
        addToCart, 
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getCartCount, 
        getWishlistCount,
        updateQuantity, 
        getCartAmount, 
        navigate,
        navigateToProduct, // Add this new function
        clearCart, // Optional: if you want to add a clear cart feature
        clearWishlist // Optional: if you want to add a clear wishlist feature
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;