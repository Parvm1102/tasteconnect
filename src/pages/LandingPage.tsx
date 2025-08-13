import React from 'react';
import { Play, Users, MapPin, TrendingUp, Star, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Preference Graph",
      description: "Discover through shared taste, not follower counts"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Personalized Feed",
      description: "Content curated based on your unique preferences"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Taste Communities",
      description: "Connect with people who share your specific interests"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Local Discovery",
      description: "Find hidden gems and local favorites near you"
    }
  ];

  const communityPreviews = [
    {
      name: "Sofia Chen",
      avatar: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      specialty: "Authentic Ramen Explorer",
      post: "Found this incredible tonkotsu spot hidden in Chinatown..."
    },
    {
      name: "Marcus Johnson",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      specialty: "Coffee Roasting Enthusiast",
      post: "Single-origin Ethiopian beans with notes of blueberry..."
    },
    {
      name: "Isabella Rodriguez",
      avatar: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      specialty: "Plant-Based Pioneer",
      post: "This cashew-based 'cheese' plate changed everything..."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F5] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 z-0"></div>
        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Discover Through
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Taste
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with people who share your unique preferences. From hidden food gems to niche interests,
            find your tribe through authentic taste-based connections.
          </p>
          <button
            onClick={onGetStarted}
            className="group px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-xl font-semibold hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-900/50 hover:shadow-purple-900/70"
          >
            Create Your Profile
            <ArrowRight className="inline-block ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-pulse">
          <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
        </div>
        <div className="absolute top-40 right-20 animate-pulse delay-1000">
          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
        </div>
        <div className="absolute bottom-40 left-20 animate-pulse delay-2000">
          <div className="w-4 h-4 bg-cyan-400 rounded-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Core Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built for authentic discovery and meaningful connections based on shared preferences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-[#181818] border border-gray-800 hover:border-purple-500/50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-purple-900/20"
              >
                <div className="text-purple-400 mb-4 group-hover:text-pink-400 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Preview */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-[#111111] to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Community Highlights
            </h2>
            <p className="text-xl text-gray-300">
              See what taste explorers in your area are discovering
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {communityPreviews.map((user, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-[#181818] border border-gray-800 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-900/20"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full mr-4 ring-2 ring-gray-700 group-hover:ring-cyan-400 transition-all duration-300"
                  />
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-cyan-400">{user.specialty}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{user.post}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TasteConnect
              </h3>
            </div>
            <div className="flex space-x-8 text-gray-400">
              <a href="#" className="hover:text-purple-400 transition-colors">About</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;