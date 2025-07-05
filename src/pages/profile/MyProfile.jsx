import React, { useState, useEffect, useContext } from 'react';
import { Gift, CreditCard, Edit, Menu } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import PageSection from '../../components/pageSection';
import Orders from '../Orders';
import Profile from './Profile';
import ProfileSidebar from './ProfileSidebar';

const ProfileDashboard = () => {
  const [activeSection, setActiveSection] = useState('orders');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get orders from ShopContext
  const { orders, currency } = useContext(ShopContext);

  // Handle URL parameters for section navigation
  useEffect(() => {
    const section = searchParams.get('section');
    if (section && ['orders', 'vouchers', 'cards', 'faqs', 'profile', 'design'].includes(section)) {
      setActiveSection(section);
    }
  }, [searchParams]);

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      await signOut();
      setShowLogoutModal(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      setErrorMessage('There was an error logging out. Please try again.');
      setShowErrorModal(true);
      setShowLogoutModal(false);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (deleteConfirmText.toLowerCase() !== 'delete my account') {
      setErrorMessage('Please type "DELETE MY ACCOUNT" to confirm deletion.');
      setShowErrorModal(true);
      return;
    }

    setIsDeleting(true);
    
    try {
      // Use Clerk's user.delete() method
      await user.delete();
      
      // Close modal and redirect
      setShowDeleteModal(false);
      setDeleteConfirmText('');
      
      // Sign out and redirect
      await signOut();
      navigate('/');
      
    } catch (error) {
      console.error('Error deleting account:', error);
      
      // Handle different types of errors
      let message = 'There was an error deleting your account. Please try again or contact support if the problem persists.';
      
      if (error.code === 'session_expired') {
        message = 'Your session has expired. Please log in again to delete your account.';
      } else if (error.code === 'user_locked') {
        message = 'Your account is temporarily locked. Please contact support for assistance.';
      }
      
      setErrorMessage(message);
      setShowErrorModal(true);
      setShowDeleteModal(false);
      setDeleteConfirmText('');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle section change and update URL
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    // Update URL without causing a full page reload
    const newUrl = `/profile?section=${sectionId}`;
    window.history.pushState({}, '', newUrl);
  };

  // Get section title for mobile
  const getSectionTitle = (section) => {
    const sectionMap = {
      'orders': 'Orders',
      'vouchers': 'Gift Vouchers',
      'cards': 'Saved Cards',
      'faqs': 'FAQs',
      'profile': 'Profile',
      'design': 'Submit Design'
    };
    return sectionMap[section] || 'Dashboard';
  };

  // Show loading state if user data is not loaded yet
  if (!isLoaded) {
    return (
      <PageSection>
        <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--peach] mx-auto mb-4"></div>
            <p className="text-gray-600 instrument-sans-regular">Loading profile...</p>
          </div>
        </div>
      </PageSection>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <PageSection>
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Mobile Menu Bar */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg mr-3"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 instrument-sans-regular">
            {getSectionTitle(activeSection)}
          </h1>
        </div>

        <div className="flex">
          {/* Sidebar Component */}
          <ProfileSidebar
            user={user}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onDeleteAccount={() => setShowDeleteModal(true)}
            onLogout={() => setShowLogoutModal(true)}
            isMobileMenuOpen={isMobileMenuOpen}
            onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-8 bg-white h-screen overflow-y-auto">
            {/* Orders Section */}
            {activeSection === 'orders' && <Orders /> }

            {/* Profile Section - Now using the Profile component */}
            {activeSection === 'profile' && <Profile />}

            {/* Gift Vouchers */}
            {activeSection === 'vouchers' && (
              <div className="max-w-4xl">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 italiana-regular hidden lg:block">Gift Vouchers</h2>
                <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 text-center">
                  <Gift className="w-12 h-12 lg:w-16 lg:h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2 instrument-sans-regular">No gift vouchers</h3>
                  <p className="text-gray-500 instrument-sans-regular">Your gift vouchers will appear here when available.</p>
                </div>
              </div>
            )}

            {/* Saved Cards */}
            {activeSection === 'cards' && (
              <div className="max-w-4xl">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 italiana-regular hidden lg:block">Saved Cards</h2>
                <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 text-center">
                  <CreditCard className="w-12 h-12 lg:w-16 lg:h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2 instrument-sans-regular">No saved cards</h3>
                  <p className="text-gray-500 mb-4 instrument-sans-regular">Save your payment methods for faster checkout.</p>
                  <button className="bg-[--green] hover:bg-[--green-2] text-white font-medium px-4 lg:px-6 py-2 rounded-lg instrument-sans-regular">
                    Add Card
                  </button>
                </div>
              </div>
            )}

            {/* FAQs */}
            {activeSection === 'faqs' && (
              <div className="max-w-4xl">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 italiana-regular hidden lg:block">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                    <h3 className="font-semibold text-gray-900 mb-2 instrument-sans-regular">How do I track my order?</h3>
                    <p className="text-gray-500 instrument-sans-regular">You can track your order by visiting the Orders section in your dashboard.</p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                    <h3 className="font-semibold text-gray-900 mb-2 instrument-sans-regular">How do I update my profile information?</h3>
                    <p className="text-gray-500 instrument-sans-regular">Go to the Profile section and click "Edit Profile" to update your information.</p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
                    <h3 className="font-semibold text-gray-900 mb-2 instrument-sans-regular">How do I contact customer support?</h3>
                    <p className="text-gray-500 instrument-sans-regular">You can reach our customer support team through the contact form or call our helpline.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Design */}
            {activeSection === 'design' && (
              <div className="max-w-4xl">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 italiana-regular hidden lg:block">Submit Design</h2>
                <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-8">
                  <div className="mb-4 lg:mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 lg:mb-3 instrument-sans-regular">
                      Design Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[--green] instrument-sans-regular"
                      placeholder="Enter your design title"
                    />
                  </div>
                  <div className="mb-4 lg:mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 lg:mb-3 instrument-sans-regular">
                      Design Description
                    </label>
                    <textarea
                      rows="4"
                      className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[--green] resize-none instrument-sans-regular"
                      placeholder="Describe your design"
                    />
                  </div>
                  <div className="mb-4 lg:mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 lg:mb-3 instrument-sans-regular">
                      Upload Design File
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 lg:p-8 text-center">
                      <Edit className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-2 instrument-sans-regular">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-400 instrument-sans-regular">PNG, JPG, PDF up to 10MB</p>
                    </div>
                  </div>
                  <button className="w-full lg:w-auto bg-[--green] hover:bg-[--green-2] text-white font-medium px-6 lg:px-8 py-2 lg:py-3 rounded-lg instrument-sans-regular">
                    Submit Design
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Modal */}
        {showErrorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 instrument-sans-regular mb-2">Error</h3>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700 instrument-sans-regular">
                    {errorMessage}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setShowErrorModal(false)}
                    className="px-6 py-2 bg-[--peach] text-white rounded-lg hover:bg-[--peach] hover:opacity-90 transition-colors duration-200 font-medium text-sm instrument-sans-regular"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 instrument-sans-regular mb-2">Confirm Logout</h3>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700 instrument-sans-regular">
                    Are you sure you want to log out of your account?
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    disabled={isLoggingOut}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium text-sm instrument-sans-regular disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex-1 px-4 py-2 bg-[--peach] text-white rounded-lg hover:bg-[--peach] hover:opacity-90 transition-colors duration-200 font-medium text-sm instrument-sans-regular disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingOut ? 'Logging out...' : 'Log Out'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 instrument-sans-regular mb-2">Delete Account</h3>
                  <p className="text-sm text-gray-500 instrument-sans-regular">This action cannot be undone</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700 mb-4 instrument-sans-regular">
                    Are you sure you want to delete your account? This will permanently remove all your data.
                  </p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 instrument-sans-regular">
                      Type "DELETE MY ACCOUNT" to confirm:
                    </label>
                    <input
                      type="text"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[--peach] instrument-sans-regular"
                      placeholder="DELETE MY ACCOUNT"
                      disabled={isDeleting}
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteConfirmText('');
                    }}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium text-sm instrument-sans-regular disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting || deleteConfirmText.toLowerCase() !== 'delete my account'}
                    className="flex-1 px-4 py-2 bg-[--peach] text-white rounded-lg hover:bg-[--peach] hover:opacity-90 transition-colors duration-200 font-medium text-sm instrument-sans-regular disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete Account'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageSection>
  );
};

export default ProfileDashboard;