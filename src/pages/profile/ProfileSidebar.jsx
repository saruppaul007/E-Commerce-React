import React from 'react';
import { User, Package, Gift, CreditCard, HelpCircle, UserCircle, Edit, X } from 'lucide-react';

const ProfileSidebar = ({ 
  user, 
  activeSection, 
  onSectionChange, 
  onDeleteAccount, 
  onLogout,
  isMobileMenuOpen,
  onCloseMobileMenu
}) => {
  const sidebarItems = [
    { id: 'orders', label: 'Orders', icon: Package, subtitle: '(Track your order here)' },
    { id: 'vouchers', label: 'Gift Vouchers', icon: Gift },
    { id: 'cards', label: 'Saved Cards', icon: CreditCard },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'profile', label: 'Profile', icon: UserCircle },
    { id: 'design', label: 'Submit Design', icon: Edit }
  ];

  const handleSectionChange = (sectionId) => {
    onSectionChange(sectionId);
    // Close mobile menu when section is selected
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] lg:hidden"
          onClick={onCloseMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        w-80 bg-white shadow-lg border-r border-gray-200 h-screen flex flex-col
        ${isMobileMenuOpen ? 'fixed left-0 top-0 z-[70] lg:relative lg:translate-x-0' : 'hidden lg:flex'}
        lg:block
      `}>
        {/* User Profile Section - Now at the very top */}
        <div className="p-6 bg-gradient-to-r from-[--peach-light] to-[--peach] text-white flex-shrink-0 relative">
          {/* Mobile Close Button - Now integrated into the peach section */}
          <div className="lg:hidden absolute top-4 right-4">
            <button
              onClick={onCloseMobileMenu}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              {user.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold instrument-sans-regular">
                {user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'}
              </h3>
              <p className="text-blue-100 text-sm mt-0 instrument-sans-regular">
                {user.primaryEmailAddress?.emailAddress || 'No email'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="py-4 flex-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full text-left px-6 py-4 flex items-center hover:bg-gray-50 transition-all duration-200 relative ${
                  isActive 
                    ? 'bg-[#fcebeb] text-blue-700 border-r-4 border-[--peach]' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[--peach] rounded-r"></div>
                )}
                <Icon className={`w-5 h-5 mr-4 flex-shrink-0 ${isActive ? 'text-[--peach]' : 'text-gray-500'}`} />
                <div className="flex-1">
                  <div className={`font-medium instrument-sans-regular ${isActive ? 'text-[--peach]' : 'text-gray-900'}`}>
                    {item.label}
                  </div>
                  {item.subtitle && (
                    <div className="text-xs text-gray-500 mt-0.5 instrument-sans-regular">{item.subtitle}</div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        <hr className='mx-8' />
        <div className="p-6 space-y-3">
          <button 
            onClick={onDeleteAccount}
            className="w-full px-4 py-3 text-[--peach] bg-white rounded-lg border border-[--peach] hover:bg-[--peach] hover:text-white transition-colors duration-200 font-medium text-sm instrument-sans-regular text-center"
          >
            Delete My Account
          </button>
          <button 
            onClick={onLogout}
            className="w-full px-4 py-3 text-[--peach] bg-white rounded-lg border border-[--peach] hover:bg-[--peach] hover:text-white transition-colors duration-200 font-medium text-sm instrument-sans-regular text-center"
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;