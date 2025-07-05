import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import { assets } from '../../assets/assets'; // Adjust the path if needed

const OrderIcon = () => (
    <FontAwesomeIcon icon={faShoppingBag} />
)

const ProfileIcon = () => (
    <FontAwesomeIcon icon={faUser} />
)

const SignInComponent = ({ isScrolled, isHomePage }) => {
    const navigate = useNavigate();
    const { openSignIn, signOut } = useClerk();
    const { user } = useUser();

    // Handler for Orders navigation
    const handleOrdersClick = () => {
        navigate('/profile?section=orders', { replace: true });
    };

    // Handler for Profile navigation
    const handleProfileClick = () => {
        navigate('/profile?section=profile', { replace: true });
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleSignInClick = () => {
        openSignIn({
            appearance: {
                elements: {
                    formButtonPrimary: "font-['Instrument_Sans'] instrument-sans-regular",
                    formFieldInput: "font-['Instrument_Sans'] instrument-sans-regular",
                    formFieldLabel: "font-['Instrument_Sans'] instrument-sans-regular",
                    socialButtonsBlockButton: "font-['Instrument_Sans'] instrument-sans-regular",
                    socialButtonsBlockButtonText: "font-['Instrument_Sans'] instrument-sans-regular",
                    headerTitle: "font-['Instrument_Sans'] instrument-sans-regular",
                    headerSubtitle: "font-['Instrument_Sans'] instrument-sans-regular",
                    footerActionText: "font-['Instrument_Sans'] instrument-sans-regular",
                    footerActionLink: "font-['Instrument_Sans'] instrument-sans-regular",
                    card: "font-['Instrument_Sans'] instrument-sans-regular",
                    rootBox: "font-['Instrument_Sans'] instrument-sans-regular",
                    modalContent: "font-['Instrument_Sans'] instrument-sans-regular",
                    alternativeMethodsBlockButton: "font-['Instrument_Sans'] instrument-sans-regular",
                    alternativeMethodsBlockButtonText: "font-['Instrument_Sans'] instrument-sans-regular",
                    identityPreviewText: "font-['Instrument_Sans'] instrument-sans-regular",
                    identityPreviewEditButton: "font-['Instrument_Sans'] instrument-sans-regular",
                    phoneInputBox: "font-['Instrument_Sans'] instrument-sans-regular",
                    formFieldInputShowPasswordButton: "font-['Instrument_Sans'] instrument-sans-regular",
                    formFieldAction: "font-['Instrument_Sans'] instrument-sans-regular",
                    formFieldSuccessText: "font-['Instrument_Sans'] instrument-sans-regular",
                    formFieldErrorText: "font-['Instrument_Sans'] instrument-sans-regular",
                    formFieldHintText: "font-['Instrument_Sans'] instrument-sans-regular",
                    formResendCodeLink: "font-['Instrument_Sans'] instrument-sans-regular",
                    otpCodeFieldInput: "font-['Instrument_Sans'] instrument-sans-regular",
                }
            }
        });
    };

    return (
        <>
            {/* Profile section - Show UserButton if logged in, otherwise show profile icon */}
            {user ? (
                <div className='relative' style={{ transform: 'translateY(4px)' }}>
                    <UserButton 
                        appearance={{
                            elements: {
                                avatarBox: `w-8 h-8 transition-all duration-500 ${
                                    isScrolled || !isHomePage ? 'opacity-80' : 'opacity-100'
                                }`,
                                userButtonPopoverCard: "font-['Instrument_Sans'] instrument-sans-regular",
                                userButtonPopoverMain: "font-['Instrument_Sans'] instrument-sans-regular",
                                userButtonPopoverFooter: "font-['Instrument_Sans'] instrument-sans-regular",
                                userButtonPopoverActionButton: "font-['Instrument_Sans'] instrument-sans-regular hover:bg-gray-50",
                                userButtonPopoverActionButtonText: "font-['Instrument_Sans'] instrument-sans-regular",
                                userPreviewMainIdentifier: "font-['Instrument_Sans'] instrument-sans-regular",
                                userPreviewSecondaryIdentifier: "font-['Instrument_Sans'] instrument-sans-regular",
                            }
                        }}
                    >
                        <UserButton.MenuItems>
                            <UserButton.Action 
                                label="My Profile" 
                                labelIcon={<ProfileIcon />} 
                                onClick={handleProfileClick}
                            />
                            <UserButton.Action 
                                label="My Orders" 
                                labelIcon={<OrderIcon />} 
                                onClick={handleOrdersClick}
                            />
                        </UserButton.MenuItems>
                    </UserButton>
                </div>
            ) : (
                <div className='group relative'>
                    <img 
                        onClick={handleSignInClick}
                        src={assets.profile_icon} 
                        className={`w-5 cursor-pointer transition-all duration-500 ${
                            isScrolled || !isHomePage ? 'opacity-80 brightness-0' : 'brightness-0 invert'
                        }`}
                        alt="Profile" 
                    />
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className={`flex flex-col gap-2 py-3 px-5 w-36 bg-slate-100 text-gray-500 rounded transition-all duration-300 ${
                            isScrolled ? 'bg-white/90 backdrop-blur-sm' : 'bg-slate-100'
                        }`}>
                            <p 
                                className='cursor-pointer hover:text-black transition-colors duration-200'
                                onClick={handleSignInClick}
                            >
                                Sign In
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Export handlers for use in mobile menu
export const useAuthHandlers = () => {
    const navigate = useNavigate();
    
    const handleOrdersClick = () => {
        navigate('/profile?section=orders', { replace: true });
    };

    const handleProfileClick = () => {
        navigate('/profile?section=profile', { replace: true });
    };

    return { handleOrdersClick, handleProfileClick };
};

export default SignInComponent;