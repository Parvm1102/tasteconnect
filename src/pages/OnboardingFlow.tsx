import React, { useState } from 'react';
import { User, Tag, Users, ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    name: '',
    avatar: '',
    location: '',
    preferences: {} as Record<string, number>,
    interests: [] as string[]
  });

  const totalSteps = 3;

  const preferenceCategories = [
    { key: 'spicy', label: 'Spicy Food', min: 'Mild', max: 'Fire' },
    { key: 'sweet', label: 'Sweet Treats', min: 'Subtle', max: 'Decadent' },
    { key: 'adventurous', label: 'Culinary Adventure', min: 'Classic', max: 'Experimental' },
    { key: 'healthy', label: 'Health Conscious', min: 'Indulgent', max: 'Nutritious' },
    { key: 'social', label: 'Dining Style', min: 'Intimate', max: 'Group' },
    { key: 'budget', label: 'Spending', min: 'Budget', max: 'Premium' }
  ];

  const suggestedCommunities = [
    { name: 'Local Food Explorers', members: 1247, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { name: 'Ramen Enthusiasts', members: 892, image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { name: 'Plant-Based Pioneers', members: 2156, image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' },
    { name: 'Coffee Connoisseurs', members: 1634, image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop' }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePreferenceChange = (category: string, value: number) => {
    setProfileData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [category]: value }
    }));
  };

  const toggleCommunity = (community: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(community)
        ? prev.interests.filter(i => i !== community)
        : [...prev.interests, community]
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return profileData.name.trim().length > 0 && profileData.location.trim().length > 0;
      case 2:
        return Object.keys(profileData.preferences).length >= 3;
      case 3:
        return profileData.interests.length >= 1;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F5] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-400">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-400">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-[#181818] rounded-3xl p-8 border border-gray-800 shadow-2xl">
          {currentStep === 1 && (
            <div className="text-center">
              <User className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Let's Get Started
              </h2>
              <p className="text-gray-400 mb-8">Tell us a bit about yourself</p>
              
              <div className="space-y-6 text-left">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#0E0E0E] border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#0E0E0E] border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    placeholder="City, State"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center">
              <Tag className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Taste Profile
              </h2>
              <p className="text-gray-400 mb-8">Adjust the sliders to reflect your preferences</p>
              
              <div className="space-y-8">
                {preferenceCategories.map(category => (
                  <div key={category.key} className="text-left">
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium">{category.label}</label>
                      <span className="text-xs text-gray-400">
                        {profileData.preferences[category.key] || 50}/100
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-gray-500 w-16 text-left">{category.min}</span>
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={profileData.preferences[category.key] || 50}
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

          {currentStep === 3 && (
            <div className="text-center">
              <Users className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Join Communities
              </h2>
              <p className="text-gray-400 mb-8">Select communities that match your interests</p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {suggestedCommunities.map(community => (
                  <div
                    key={community.name}
                    onClick={() => toggleCommunity(community.name)}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      profileData.interests.includes(community.name)
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-medium mb-1">{community.name}</h3>
                    <p className="text-sm text-gray-400">{community.members.toLocaleString()} members</p>
                    
                    {profileData.interests.includes(community.name) && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                currentStep === 1
                  ? 'opacity-50 cursor-not-allowed text-gray-500'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                canProceed()
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transform hover:scale-105'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentStep === totalSteps ? 'Complete Setup' : 'Next'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9333ea, #ec4899);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(147, 51, 234, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9333ea, #ec4899);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(147, 51, 234, 0.3);
        }
      `}</style>
    </div>
  );
};

export default OnboardingFlow;