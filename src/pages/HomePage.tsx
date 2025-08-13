import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MapPin, Clock, Star } from 'lucide-react';
import PostCard from '../components/PostCard';
import SidePanel from '../components/SidePanel';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'for-you' | 'trending' | 'nearby'>('for-you');

  const posts = [
    {
      id: '1',
      author: {
        name: 'Sofia Chen',
        avatar: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        specialty: 'Authentic Ramen Explorer'
      },
      content: {
        title: 'Hidden Gem: Authentic Tonkotsu in Chinatown',
        description: 'After 3 months of searching, I finally found the perfect tonkotsu ramen. The broth has that perfect cloudy richness from 12+ hour bone cooking...',
        image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        tags: ['ramen', 'authentic', 'chinatown', 'hidden-gem'],
        location: 'Chinatown, NYC',
        rating: 4.8
      },
      engagement: {
        likes: 124,
        comments: 18,
        shares: 7,
        bookmarks: 32
      },
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      author: {
        name: 'Marcus Johnson',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        specialty: 'Coffee Roasting Enthusiast'
      },
      content: {
        title: 'Single-Origin Ethiopian Blueberry Notes',
        description: 'This Yirgacheffe is absolutely mind-blowing. Light roast brings out incredible blueberry and floral notes. Perfect for pour-over enthusiasts.',
        image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        tags: ['coffee', 'single-origin', 'ethiopia', 'pour-over'],
        location: 'Blue Bottle, Oakland',
        rating: 4.9
      },
      engagement: {
        likes: 89,
        comments: 12,
        shares: 4,
        bookmarks: 28
      },
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      author: {
        name: 'Isabella Rodriguez',
        avatar: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        specialty: 'Plant-Based Pioneer'
      },
      content: {
        title: 'Mind-Blowing Cashew Cheese Board',
        description: 'This completely changed my perspective on plant-based cheese. The texture and flavor complexity rivals any dairy cheese board I\'ve had.',
        image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        tags: ['plant-based', 'cheese', 'vegan', 'innovative'],
        location: 'Verdant Kitchen, Portland',
        rating: 4.7
      },
      engagement: {
        likes: 156,
        comments: 24,
        shares: 11,
        bookmarks: 45
      },
      timestamp: '6 hours ago'
    }
  ];

  const tabs = [
    { key: 'for-you', label: 'For You', description: 'Curated based on your taste profile' },
    { key: 'trending', label: 'Trending', description: 'Popular discoveries right now' },
    { key: 'nearby', label: 'Nearby', description: 'Local finds in your area' }
  ];

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="mb-8">
              <div className="flex space-x-1 bg-[#181818] rounded-2xl p-2 border border-gray-800">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex-1 px-6 py-4 rounded-xl transition-all duration-300 ${
                      activeTab === tab.key
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold">{tab.label}</div>
                      <div className="text-xs mt-1 opacity-75">{tab.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-8">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-[#181818] border border-gray-700 rounded-xl hover:border-purple-500 hover:bg-[#1a1a1a] transition-all duration-300 text-gray-300 hover:text-white">
                Load More Posts
              </button>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1">
            <SidePanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;