import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const { user, isLoaded } = useUser();
  
  // Profile form state - initialize with user data or defaults
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    mobileNumber: '',
    gender: 'Male',
    address: ''
  });

  // Load user data when component mounts or user changes
  useEffect(() => {
    if (isLoaded && user) {
      // Get data from Clerk user object and public metadata
      const metadata = user.publicMetadata || {};
      
      setProfileForm({
        firstName: user.firstName || metadata.firstName || '',
        lastName: user.lastName || metadata.lastName || '',
        dateOfBirth: metadata.dateOfBirth || '',
        mobileNumber: metadata.mobileNumber || '',
        gender: metadata.gender || 'Male',
        address: metadata.address || ''
      });
    }
  }, [isLoaded, user]);

  const handleInputChange = (field, value) => {
    setProfileForm(prev => ({ ...prev, [field]: value }));
  };

  // Save profile changes to Clerk
  const handleSaveChanges = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setSaveMessage('');
    
    try {
      // Update Clerk user profile
      await user.update({
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
      });

      // Update public metadata with additional fields
      await user.update({
        publicMetadata: {
          ...user.publicMetadata,
          dateOfBirth: profileForm.dateOfBirth,
          mobileNumber: profileForm.mobileNumber,
          gender: profileForm.gender,
          address: profileForm.address,
          firstName: profileForm.firstName,
          lastName: profileForm.lastName
        }
      });

      setSaveMessage('Profile updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveMessage('Error updating profile. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded || !user) {
    return (
      <div className="max-w-4xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[--peach] mx-auto mb-4"></div>
          <p className="text-gray-600 instrument-sans-regular">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Welcome Message */}
      <div className="bg-[#e5f8e6] border border-[--green] rounded-lg p-4 mb-8">
        <p className="text-[--green] text-sm instrument-sans-regular">
          You are now an Exclusive member. Welcome to your profile dashboard!
        </p>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`rounded-lg p-4 mb-8 ${
          saveMessage.includes('Error') 
            ? 'bg-red-50 border border-red-200 text-red-700' 
            : 'bg-green-50 border border-green-200 text-green-700'
        }`}>
          <p className="text-sm instrument-sans-regular">{saveMessage}</p>
        </div>
      )}

      {/* Edit Profile Button */}
      <button className="mb-4 text-gray-400 font-semibold text-sm tracking-wide uppercase instrument-sans-regular">
        EDIT PROFILE
      </button>

      <div className="space-y-6 border p-8 rounded-lg">
        {/* Email Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 instrument-sans-regular">
            Email Id
          </label>
          <input
            type="email"
            value={user.primaryEmailAddress?.emailAddress || ''}
            disabled
            className="w-full max-w-lg px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-medium instrument-sans-regular"
          />
        </div>

        <hr />
        
        {/* General Information */}
        <div>
          <h3 className="text-lg font-semibold text-[--peach] mb-6 instrument-sans-regular">General Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 instrument-sans-regular">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={profileForm.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[--green] bg-gray-50 instrument-sans-regular"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 instrument-sans-regular">
                Last Name
              </label>
              <input
                type="text"
                value={profileForm.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[--green] bg-gray-50 instrument-sans-regular"
              />
            </div>

            

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 instrument-sans-regular">
                Date of Birth
              </label>
              <input
                type="date"
                value={profileForm.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                placeholder="DD-MM-YYYY"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[--green] bg-gray-50 instrument-sans-regular"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 instrument-sans-regular">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={profileForm.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[--green] bg-gray-50 instrument-sans-regular"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 instrument-sans-regular">
                Gender
              </label>
              <div className="flex space-x-6">
                {['Male', 'Female', 'Other'].map((gender) => (
                  <label key={gender} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={profileForm.gender === gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-600 accent-green-600 cursor-pointer"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 instrument-sans-regular">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 instrument-sans-regular">
                Default Address
                <button 
                  type="button"
                  className="ml-3 text-[--green] hover:text-blue-900 text-sm font-medium instrument-sans-regular"
                >
                  Change/Edit
                </button>
              </label>
              <textarea
                value={profileForm.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[--green] bg-gray-50 resize-none instrument-sans-regular"
                placeholder="Enter your address"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <button 
              onClick={handleSaveChanges}
              disabled={isLoading}
              className="bg-[--green] hover:bg-[--green-2] text-white font-medium px-8 py-3 rounded-lg transition-colors instrument-sans-regular disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;