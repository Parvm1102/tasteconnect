import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingFlow from './pages/OnboardingFlow';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DiscoveryPage from './pages/DiscoveryPage';
import CommunitiesPage from './pages/CommunitiesPage';
import PostDetailPage from './pages/PostDetailPage';
import SettingsPage from './pages/SettingsPage';
import Navigation from './components/Navigation';
import { UserProvider } from './context/UserContext';

function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('onboarding-complete');
    if (onboardingComplete) {
      setIsOnboarded(true);
      setShowLanding(false);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
    setShowLanding(false);
    localStorage.setItem('onboarding-complete', 'true');
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  if (showLanding && !isOnboarded) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (!isOnboarded) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F5]">
          <Navigation />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile/:id?" element={<ProfilePage />} />
              <Route path="/discovery" element={<DiscoveryPage />} />
              <Route path="/communities" element={<CommunitiesPage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;