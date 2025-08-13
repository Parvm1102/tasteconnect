import React, { useState } from 'react';
import { 
  User, Lock, Bell, Palette, Globe, Shield, Download, 
  Upload, Eye, EyeOff, Save, Camera
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const SettingsPage: React.FC = () => {
  const { user, updateUser } = useUser();
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'privacy' | 'notifications' | 'account'>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    bio: '',
    website: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState(user?.preferences || {});
  const [notifications, setNotifications] = useState({
    email: {
      newFollowers: true,
      comments: true,
      likes: false,
      recommendations: true,
      events: true
    },
    push: {
      newFollowers: true,
      comments: true,
      likes: false,
      recommendations: false,
      events: true
    }
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    preferencesVisibility: 'followers',
    activityVisibility: 'public',
    allowMessages: true,
    showLocation: true
  });

  const tabs = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'preferences', label: 'Preferences', icon: Palette },
    { key: 'privacy', label: 'Privacy', icon: Shield },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'account', label: 'Account', icon: Lock }
  ];

  const preferenceCategories = [
    { key: 'spicy', label: 'Spicy Food', min: 'Mild', max: 'Fire' },
    { key: 'sweet', label: 'Sweet Treats', min: 'Subtle', max: 'Decadent' },
    { key: 'adventurous', label: 'Culinary Adventure', min: 'Classic', max: 'Experimental' },
    { key: 'healthy', label: 'Health Conscious', min: 'Indulgent', max: 'Nutritious' },
    { key: 'social', label: 'Dining Style', min: 'Intimate', max: 'Group' },
    { key: 'budget', label: 'Spending', min: 'Budget', max: 'Premium' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (category: string, value: number) => {
    setPreferences(prev => ({ ...prev, [category]: value }));
  };

  const handleSaveProfile = () => {
    if (user) {
      updateUser({
        name: formData.name,
        location: formData.location
      });
    }
  };

  const handleSavePreferences = () => {
    if (user) {
      updateUser({ preferences });
    }
  };

  const handleDataExport = () => {
    // Mock data export
    const userData = {
      profile: user,
      preferences,
      posts: 'post_data_here',
      interactions: 'interaction_data_here'
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'tasteconnect-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F5]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-400">Manage your account preferences and privacy settings</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-[#181818] rounded-2xl border border-gray-800 p-4">
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                        activeTab === tab.key
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-[#181818] rounded-3xl border border-gray-800 p-8">
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Profile Information</h2>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-semibold"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <img
                          src={user?.avatar}
                          alt="Profile"
                          className="w-24 h-24 rounded-full ring-4 ring-gray-700"
                        />
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:from-purple-500 hover:to-pink-500 transition-colors">
                          <Camera className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Profile Photo</h3>
                        <p className="text-gray-400 text-sm mb-3">
                          Upload a photo to help others recognize you
                        </p>
                        <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm">
                          Change Photo
                        </button>
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Display Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-3 bg-[#0E0E0E] border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full px-4 py-3 bg-[#0E0E0E] border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                          placeholder="City, State"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="w-full px-4 py-3 bg-[#0E0E0E] border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                        rows={4}
                        placeholder="Tell others about your taste preferences and food interests..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Website</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full px-4 py-3 bg-[#0E0E0E] border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Taste Preferences</h2>
                    <button
                      onClick={handleSavePreferences}
                      className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-semibold"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="space-y-8">
                    {preferenceCategories.map(category => (
                      <div key={category.key}>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-sm font-medium">{category.label}</label>
                          <span className="text-xs text-gray-400">
                            {preferences[category.key] || 50}/100
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-gray-500 w-16 text-left">{category.min}</span>
                          <div className="flex-1">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={preferences[category.key] || 50}
                              onChange={(e) => handlePreferenceChange(category.key, parseInt(e.target.value))}
                              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-16 text-right">{category.max}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold">Privacy & Visibility</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Profile Visibility</label>
                      <select
                        value={privacy.profileVisibility}
                        onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
                        className="w-full px-4 py-3 bg-[#0E0E0E] border border-gray-700 rounded-xl focus:border-purple-500 transition-colors"
                      >
                        <option value="public">Public - Anyone can see your profile</option>
                        <option value="followers">Followers Only - Only followers can see your full profile</option>
                        <option value="private">Private - Only you can see your profile</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Taste Preferences Visibility</label>
                      <select
                        value={privacy.preferencesVisibility}
                        onChange={(e) => setPrivacy(prev => ({ ...prev, preferencesVisibility: e.target.value }))}
                        className="w-full px-4 py-3 bg-[#0E0E0E] border border-gray-700 rounded-xl focus:border-purple-500 transition-colors"
                      >
                        <option value="public">Public</option>
                        <option value="followers">Followers Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={privacy.allowMessages}
                          onChange={(e) => setPrivacy(prev => ({ ...prev, allowMessages: e.target.checked }))}
                          className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">Allow direct messages from other users</span>
                      </label>

                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={privacy.showLocation}
                          onChange={(e) => setPrivacy(prev => ({ ...prev, showLocation: e.target.checked }))}
                          className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">Show location on posts and profile</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold">Notification Preferences</h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        {Object.entries(notifications.email).map(([key, value]) => (
                          <label key={key} className="flex items-center justify-between py-2">
                            <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => setNotifications(prev => ({
                                ...prev,
                                email: { ...prev.email, [key]: e.target.checked }
                              }))}
                              className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
                      <div className="space-y-4">
                        {Object.entries(notifications.push).map(([key, value]) => (
                          <label key={key} className="flex items-center justify-between py-2">
                            <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => setNotifications(prev => ({
                                ...prev,
                                push: { ...prev.push, [key]: e.target.checked }
                              }))}
                              className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold">Account Settings</h2>

                  <div className="space-y-8">
                    {/* Password Change */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={formData.currentPassword}
                              onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                              className="w-full px-4 py-3 bg-[#0E0E0E] border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 pr-12"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">New Password</label>
                            <input
                              type="password"
                              value={formData.newPassword}
                              onChange={(e) => handleInputChange('newPassword', e.target.value)}
                              className="w-full px-4 py-3 bg-[#0E0E0E] border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                            <input
                              type="password"
                              value={formData.confirmPassword}
                              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                              className="w-full px-4 py-3 bg-[#0E0E0E] border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                            />
                          </div>
                        </div>

                        <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-semibold">
                          Update Password
                        </button>
                      </div>
                    </div>

                    {/* Data Management */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Data Management</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl">
                          <div>
                            <h4 className="font-medium">Export Your Data</h4>
                            <p className="text-sm text-gray-400">Download all your posts, preferences, and activity data</p>
                          </div>
                          <button
                            onClick={handleDataExport}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl">
                          <div>
                            <h4 className="font-medium">Import Data</h4>
                            <p className="text-sm text-gray-400">Import your data from another platform</p>
                          </div>
                          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors">
                            <Upload className="w-4 h-4" />
                            <span>Import</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="border-t border-red-800 pt-8">
                      <h3 className="text-lg font-semibold mb-4 text-red-400">Danger Zone</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-red-900/20 border border-red-800 rounded-xl">
                          <h4 className="font-medium text-red-400 mb-2">Delete Account</h4>
                          <p className="text-sm text-gray-400 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                          <button className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors font-semibold">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9333ea, #ec4899);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(147, 51, 234, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9333ea, #ec4899);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(147, 51, 234, 0.3);
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;