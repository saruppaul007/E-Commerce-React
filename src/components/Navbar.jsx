import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets'; // Adjust the path if needed
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Check if current page is home
    const isHomePage = location.pathname === '/';

    // Extracting context values - FIXED: Use correct function name
    const {
        setShowSearch = () => {}, // Provide a fallback if not defined
        getCartCount = () => 0,
        getWishlistCount = () => 0, // Changed from getFavCount to getWishlistCount
    } = useContext(ShopContext);

    // Scroll effect handler
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Explicit navigation handlers
    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Favorite clicked!'); // Debug log
        navigate('/favorite');
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Cart clicked!'); // Debug log
        navigate('/cart');
    };

    // Handler for Orders navigation
    const handleOrdersClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/orders');
    };

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled || !isHomePage ? 'bg-white/80 shadow-md backdrop-blur-lg border-b border-gray-200' : 'bg-transparent'
        }`}>
            <div className='flex justify-between items-center py-5 px-4 sm:px-6 lg:px-8 font-medium max-w-7xl mx-auto mt-2'>
                <Link to='/'>
                <div className='flex gap-3'>
                    <img 
                        src={assets.logoShort} 
                        className={`w-12 transition-all duration-500 ${
                            isScrolled || !isHomePage ? 'brightness-0 opacity-80' : ''
                        }`} 
                        alt="Logo" 
                    />
                    <h3 className={`italiana-regular mt-1 text-3xl transition-all duration-500 hidden lg:block ${
                        isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'
                    }`}>Fashion Store</h3>
                </div>
                </Link>
                

                {/* Navbar links */}
                <ul className='hidden sm:flex gap-5 text-sm text-black'>
                    <NavLink to='/' className='group flex flex-col items-center gap-1'>
                        {({ isActive }) => (
                            <>
                                <p className={`transition-all duration-300 italiana-regular ${isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'}`}>HOME</p>
                                <div className={`${isScrolled || !isHomePage ? 'bg-gray-700' : 'bg-white'} bg-[#ff5f5f] h-0.5 transition-all duration-300 ${
                                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                }`} />
                            </>
                        )}
                    </NavLink>
                    <NavLink to='/collection' className='group flex flex-col items-center gap-1 '>
                        {({ isActive }) => (
                            <>
                                <p className={`transition-all duration-300 italiana-regular ${isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'}`}>COLLECTION</p>
                                <div className={`${isScrolled || !isHomePage ? 'bg-gray-700' : 'bg-white'} bg-[#ff5f5f] h-0.5 transition-all duration-300 ${
                                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                }`} />
                            </>
                        )}
                    </NavLink>
                    <NavLink to='/about' className='group flex flex-col items-center gap-1'>
                        {({ isActive }) => (
                            <>
                                <p className={`transition-all duration-300 italiana-regular ${isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'}`}>ABOUT</p>
                                <div className={`${isScrolled || !isHomePage ? 'bg-gray-700' : 'bg-white'} bg-[#ff5f5f] h-0.5 transition-all duration-300 ${
                                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                }`} />
                            </>
                        )}
                    </NavLink>
                    <NavLink to='/contact' className='group flex flex-col items-center gap-1'>
                        {({ isActive }) => (
                            <>
                                <p className={`transition-all duration-300 italiana-regular ${isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'}`}>CONTACT</p>
                                <div className={`${isScrolled || !isHomePage ? 'bg-gray-700' : 'bg-white'} bg-[#ff5f5f] h-0.5 transition-all duration-300 ${
                                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                }`} />
                            </>
                        )}
                    </NavLink>
                    <NavLink to='/bestsellers' className='group flex flex-col items-center gap-1'>
                        {({ isActive }) => (
                            <>
                                <p className={`transition-all duration-300 italiana-regular ${isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'}`}>BESTSELLERS</p>
                                <div className={`${isScrolled || !isHomePage ? 'bg-gray-700' : 'bg-white'} bg-[#ff5f5f] h-0.5 transition-all duration-300 ${
                                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                }`} />
                            </>
                        )}
                    </NavLink>
                </ul>

                {/* Icons and menu */}
                <div className='flex gap-6 items-center'>
                    <img
                        onClick={() => setShowSearch(true)}
                        src={assets.search_icon}
                        className={`w-5 cursor-pointer transition-all duration-500 ${
                            isScrolled || !isHomePage ? 'opacity-80 brightness-0' : 'brightness-0 invert'
                        }`}
                        alt="Search"
                    />
                    
                    {/* Favorite icon with navigation - FIXED: Use correct function name */}
                    <div 
                        className='relative cursor-pointer select-none transition-all duration-500' 
                        onClick={handleFavoriteClick}
                        style={{ minWidth: '20px', minHeight: '20px', padding: '2px' }}
                    >
                        <img 
                            src={assets.favorite_icon} 
                            className={`w-5 min-w-5 pointer-events-none transition-all duration-500 ${
                                isScrolled || !isHomePage ? 'opacity-80 brightness-0' : 'brightness-0 invert'
                            }`}
                            alt="Favorites"
                            draggable={false}
                        />
                        {getWishlistCount() > 0 && (
                            <span className='absolute -right-1 -bottom-1 w-4 h-4 text-center bg-red-600 text-white rounded-full text-[8px] flex items-center justify-center pointer-events-none'>
                                {getWishlistCount()}
                            </span>
                        )}
                    </div>

                    {/* Cart icon with navigation */}
                    <div 
                        className='relative cursor-pointer select-none transition-all duration-500' 
                        onClick={handleCartClick}
                        style={{ minWidth: '20px', minHeight: '20px', padding: '2px' }}
                    >
                        <img 
                            src={assets.cart_icon} 
                            className={`w-5 min-w-5 pointer-events-none transition-all duration-500 ${
                                isScrolled || !isHomePage ? 'opacity-80 brightness-0' : 'brightness-0 invert'
                            }`}
                            alt="Cart"
                            draggable={false}
                        />
                        {getCartCount() > 0 && (
                            <span className='absolute -right-1 -bottom-1 w-4 h-4 text-center bg-red-600 text-white rounded-full text-[8px] flex items-center justify-center pointer-events-none'>
                                {getCartCount()}
                            </span>
                        )}
                    </div>

                    <div className='group relative'>
                        <Link to="/login">
                            <img 
                                src={assets.profile_icon} 
                                className={`w-5 cursor-pointer transition-all duration-500 ${
                                    isScrolled || !isHomePage ? 'opacity-80 brightness-0' : 'brightness-0 invert'
                                }`}
                                alt="Profile" 
                            />
                            
                            
                        </Link>
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className={`flex flex-col gap-2 py-3 px-5 w-36 bg-slate-100 text-gray-500 rounded transition-all duration-300 ${
                                isScrolled ? 'bg-white/90 backdrop-blur-sm' : 'bg-slate-100'
                            }`}>
                                <p className='cursor-pointer hover:text-black transition-colors duration-200'>My Profile</p>
                                <p 
                                    className='cursor-pointer hover:text-black transition-colors duration-200'
                                    onClick={handleOrdersClick}
                                >
                                    My Orders
                                </p>
                                <p className='cursor-pointer hover:text-black transition-colors duration-200'>Log Out</p>
                            </div>
                        </div>
                    </div>
                    <img
                        onClick={() => setVisible(true)}
                        src={assets.menu_icon}
                        className={`w-5 cursor-pointer sm:hidden transition-all duration-500 ${
                            isScrolled || !isHomePage ? 'opacity-80 brightness-0' : 'brightness-0 invert'
                        }`}
                        alt="Menu"
                    />
                </div>

                {/* Sidebar menu for small screens */}
                <div
                    className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white/95 backdrop-blur-lg transition-all z-60 ${
                        visible ? 'w-full' : 'w-0'
                    }`}
                >
                    <div className='flex flex-col text-gray-600'>
                        <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200'>
                            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Back" />
                            <p>Back</p>
                        </div>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border hover:bg-gray-50 transition-colors duration-200' to='/'>
                            HOME
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border hover:bg-gray-50 transition-colors duration-200' to='/collection'>
                            COLLECTION
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border hover:bg-gray-50 transition-colors duration-200' to='/about'>
                            ABOUT
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border hover:bg-gray-50 transition-colors duration-200' to='/contact'>
                            CONTACT
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border hover:bg-gray-50 transition-colors duration-200' to='/favorite'>
                            FAVORITES
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border hover:bg-gray-50 transition-colors duration-200' to='/cart'>
                            CART
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border hover:bg-gray-50 transition-colors duration-200' to='/orders'>
                            MY ORDERS
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;