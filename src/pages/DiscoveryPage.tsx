import React, { useState } from 'react';
import { Map, List, Filter, Search, MapPin, Star, Clock, Users } from 'lucide-react';

const DiscoveryPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    similarity: 70,
    radius: 5,
    rating: 4
  });

  const discoveries = [
    {
      id: '1',
      title: 'Authentic Tonkotsu Ramen',
      image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      location: 'Chinatown, NYC',
      rating: 4.8,
      category: 'Ramen',
      similarity: 95,
      distance: 0.3,
      author: 'Sofia Chen',
      authorAvatar: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      coordinates: { lat: 40.7161, lng: -73.9961 },
      tags: ['authentic', 'hidden-gem', 'local-favorite']
    },
    {
      id: '2',
      title: 'Single-Origin Ethiopian Coffee',
      image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      location: 'Blue Bottle, Oakland',
      rating: 4.9,
      category: 'Coffee',
      similarity: 87,
      distance: 1.2,
      author: 'Marcus Johnson',
      authorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      coordinates: { lat: 37.8044, lng: -122.2712 },
      tags: ['single-origin', 'pour-over', 'artisanal']
    },
    {
      id: '3',
      title: 'Plant-Based Cheese Board',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      location: 'Verdant Kitchen, Portland',
      rating: 4.7,
      category: 'Plant-Based',
      similarity: 82,
      distance: 2.1,
      author: 'Isabella Rodriguez',
      authorAvatar: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      coordinates: { lat: 45.5152, lng: -122.6784 },
      tags: ['vegan', 'innovative', 'sustainable']
    }
  ];

  const categories = ['all', 'Ramen', 'Coffee', 'Plant-Based', 'Desserts', 'Street Food'];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 text-yellow-400 fill-current opacity-50" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Discovery
            </h1>
            <p className="text-gray-400">Find amazing places based on your taste preferences</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search places, food, experiences..."
                className="pl-10 pr-4 py-2 bg-[#181818] border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm w-80"
              />
            </div>

            {/* View Toggle */}
            <div className="flex bg-[#181818] rounded-xl border border-gray-700">
              <button
                onClick={() => setViewMode('map')}
                className={`p-3 rounded-l-xl transition-all duration-300 ${
                  viewMode === 'map'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Map className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-r-xl transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Filters */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
                showFilters
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-transparent text-white'
                  : 'bg-[#181818] border-gray-700 text-gray-300 hover:border-purple-500'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-[#181818] rounded-2xl p-6 border border-gray-800 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#0E0E0E] border border-gray-700 rounded-lg focus:border-purple-500 transition-colors"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="capitalize">
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Taste Similarity: {filters.similarity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.similarity}
                  onChange={(e) => setFilters(prev => ({ ...prev, similarity: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Radius: {filters.radius} miles
                </label>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={filters.radius}
                  onChange={(e) => setFilters(prev => ({ ...prev, radius: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Min Rating: {filters.rating} stars
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.1"
                  value={filters.rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map View */}
          {viewMode === 'map' && (
            <div className="lg:col-span-2">
              <div className="bg-[#181818] rounded-2xl border border-gray-800 h-96 lg:h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                  <p className="text-gray-400">Map integration would show discovery pins here</p>
                </div>
              </div>
            </div>
          )}

          {/* Results List */}
          <div className={viewMode === 'list' ? 'lg:col-span-3' : 'lg:col-span-1'}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {discoveries.length} Discoveries Found
                </h2>
                <select className="px-3 py-2 bg-[#181818] border border-gray-700 rounded-lg focus:border-purple-500 transition-colors text-sm">
                  <option value="similarity">Sort by Similarity</option>
                  <option value="distance">Sort by Distance</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="recent">Sort by Recent</option>
                </select>
              </div>

              {discoveries.map(discovery => (
                <div
                  key={discovery.id}
                  className="bg-[#181818] rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-purple-900/10"
                >
                  <div className={`${viewMode === 'list' ? 'flex' : 'block'}`}>
                    <img
                      src={discovery.image}
                      alt={discovery.title}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === 'list' ? 'w-48 h-32' : 'w-full h-48'
                      }`}
                    />

                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                            {discovery.title}
                          </h3>
                          <div className="flex items-center text-gray-400 text-sm mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {discovery.location}
                            <span className="mx-2">•</span>
                            <Clock className="w-4 h-4 mr-1" />
                            {discovery.distance} mi away
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {renderStars(discovery.rating)}
                            <span className="text-sm text-gray-400 ml-2">{discovery.rating}</span>
                          </div>
                          <div className="text-sm text-purple-400 font-medium">
                            {discovery.similarity}% match
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <img
                            src={discovery.authorAvatar}
                            alt={discovery.author}
                            className="w-6 h-6 rounded-full ring-1 ring-gray-600"
                          />
                          <span className="text-sm text-gray-400">
                            Recommended by {discovery.author}
                          </span>
                        </div>
                        <span className="text-sm text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full">
                          {discovery.category}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {discovery.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full hover:bg-purple-800/30 hover:text-purple-300 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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

export default DiscoveryPage;