import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react'; // Import useUser from Clerk

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = `$`;
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    
    const { user, isLoaded } = useUser(); // Get user and isLoaded from Clerk

    // Initialize cart from localStorage, keyed by userId
    const [cartItems, setCartItems] = useState(() => {
        if (!isLoaded || !user) { // If user is not loaded or not logged in, return empty cart
            return {};
        }
        try {
            const savedCart = localStorage.getItem(`cartItems_${user.id}`); // Use user.id as key
            return savedCart ? JSON.parse(savedCart) : {};
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return {};
        }
    });
    
    // Initialize wishlist from localStorage, keyed by userId
    const [wishlistItems, setWishlistItems] = useState(() => {
        if (!isLoaded || !user) { // If user is not loaded or not logged in, return empty wishlist
            return {};
        }
        try {
            const savedWishlist = localStorage.getItem(`wishlistItems_${user.id}`); // Use user.id as key
            return savedWishlist ? JSON.parse(savedWishlist) : {};
        } catch (error) {
            console.error('Error loading wishlist from localStorage:', error);
            return {};
        }
    });

    // Initialize orders from localStorage, keyed by userId
    const [orders, setOrders] = useState(() => {
        if (!isLoaded || !user) { // If user is not loaded or not logged in, return empty orders
            return [];
        }
        try {
            const savedOrders = localStorage.getItem(`orders_${user.id}`); // Use user.id as key
            return savedOrders ? JSON.parse(savedOrders) : [];
        } catch (error) {
            console.error('Error loading orders from localStorage:', error);
            return [];
        }
    });
    
    const navigate = useNavigate();

    // Effect to load data when user or isLoaded changes
    useEffect(() => {
        if (isLoaded && user) {
            try {
                const savedCart = localStorage.getItem(`cartItems_${user.id}`);
                setCartItems(savedCart ? JSON.parse(savedCart) : {});

                const savedWishlist = localStorage.getItem(`wishlistItems_${user.id}`);
                setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : {});

                const savedOrders = localStorage.getItem(`orders_${user.id}`);
                setOrders(savedOrders ? JSON.parse(savedOrders) : []);
            } catch (error) {
                console.error('Error reloading user data from localStorage:', error);
                setCartItems({});
                setWishlistItems({});
                setOrders([]);
            }
        } else if (isLoaded && !user) {
            // User is signed out, clear current state to reflect empty cart/wishlist
            setCartItems({});
            setWishlistItems({});
            setOrders([]);
        }
    }, [isLoaded, user]);

    // Save cart to localStorage whenever it changes, keyed by userId
    useEffect(() => {
        if (isLoaded && user) {
            try {
                localStorage.setItem(`cartItems_${user.id}`, JSON.stringify(cartItems));
            } catch (error) {
                console.error('Error saving cart to localStorage:', error);
            }
        }
    }, [cartItems, isLoaded, user]);

    // Save wishlist to localStorage whenever it changes, keyed by userId
    useEffect(() => {
        if (isLoaded && user) {
            try {
                localStorage.setItem(`wishlistItems_${user.id}`, JSON.stringify(wishlistItems));
            } catch (error) {
                console.error('Error saving wishlist to localStorage:', error);
            }
        }
    }, [wishlistItems, isLoaded, user]);

    // Save orders to localStorage whenever it changes, keyed by userId
    useEffect(() => {
        if (isLoaded && user) {
            try {
                localStorage.setItem(`orders_${user.id}`, JSON.stringify(orders));
            } catch (error) {
                console.error('Error saving orders to localStorage:', error);
            }
        }
    }, [orders, isLoaded, user]);

    // ... (rest of your existing ShopContextProvider code) ...

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

    // Generate order ID
    const generateOrderId = () => {
        return Math.floor(Math.random() * 90000000) + 10000000;
    }

    // Generate order date
    const generateOrderDate = () => {
        const date = new Date();
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    }

    // Place order function
    const placeOrder = (deliveryInfo, paymentMethod) => {
        if (Object.keys(cartItems).length === 0) {
            toast.error('Your cart is empty!');
            return false;
        }

        // Convert cart items to order items
        const orderItems = [];
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        orderItems.push({
                            ...itemInfo,
                            size: size,
                            quantity: cartItems[itemId][size]
                        });
                    }
                }
            }
        }

        // Create new order
        const newOrder = {
            orderId: generateOrderId().toString(),
            date: generateOrderDate(),
            status: "Ready to ship",
            statusColor: "bg-blue-500",
            items: orderItems,
            deliveryInfo: deliveryInfo,
            paymentMethod: paymentMethod,
            total: getCartAmount() + delivery_fee,
            createdAt: new Date().toISOString()
        };

        // Add order to orders array
        setOrders(prevOrders => [newOrder, ...prevOrders]);

        // Clear cart after successful order
        setCartItems({});

        // Show success message
        toast.success('Order placed successfully!');

        return true;
    }

    // Update order status (for demonstration purposes)
    const updateOrderStatus = (orderId, newStatus, newStatusColor) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.orderId === orderId 
                    ? { ...order, status: newStatus, statusColor: newStatusColor }
                    : order
            )
        );
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
        orders, // Add orders to context
        addToCart, 
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getCartCount, 
        getWishlistCount,
        updateQuantity, 
        getCartAmount, 
        navigate,
        navigateToProduct,
        placeOrder, // Add placeOrder function
        updateOrderStatus, // Add updateOrderStatus function
        clearCart,
        clearWishlist
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;