import React, { useState } from 'react';
import { Users, Search, TrendingUp, Calendar, MapPin, MessageCircle, Plus } from 'lucide-react';

const CommunitiesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'joined' | 'events'>('browse');
  const [searchTerm, setSearchTerm] = useState('');

  const communities = [
    {
      id: '1',
      name: 'Local Food Explorers',
      description: 'Discover hidden culinary gems in your neighborhood and share your amazing finds with fellow food lovers.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      members: 1247,
      posts: 89,
      category: 'Local Dining',
      trending: true,
      joined: false,
      recentActivity: '2 hours ago'
    },
    {
      id: '2',
      name: 'Authentic Ramen Enthusiasts',
      description: 'For those who appreciate the art of authentic ramen. From tonkotsu to miso, share your discoveries and learn from masters.',
      image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      members: 892,
      posts: 156,
      category: 'Ramen',
      trending: true,
      joined: true,
      recentActivity: '4 hours ago'
    },
    {
      id: '3',
      name: 'Plant-Based Pioneers',
      description: 'Exploring innovative plant-based cuisine that challenges perceptions and delights the palate. Sustainable eating starts here.',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      members: 2156,
      posts: 234,
      category: 'Plant-Based',
      trending: false,
      joined: true,
      recentActivity: '1 day ago'
    },
    {
      id: '4',
      name: 'Coffee Connoisseurs',
      description: 'From single-origin beans to brewing techniques, perfect for those who take their coffee seriously.',
      image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      members: 1634,
      posts: 198,
      category: 'Coffee',
      trending: false,
      joined: true,
      recentActivity: '6 hours ago'
    },
    {
      id: '5',
      name: 'Street Food Adventures',
      description: 'Celebrating street food culture around the world. Find the best food trucks, stalls, and vendors in your city.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      members: 756,
      posts: 123,
      category: 'Street Food',
      trending: false,
      joined: false,
      recentActivity: '12 hours ago'
    },
    {
      id: '6',
      name: 'Dessert Devotees',
      description: 'For those with a sweet tooth. Share your favorite dessert spots and discover new confectionery wonders.',
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      members: 1089,
      posts: 167,
      category: 'Desserts',
      trending: false,
      joined: false,
      recentActivity: '8 hours ago'
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Underground Ramen Tour',
      community: 'Authentic Ramen Enthusiasts',
      date: 'March 15, 2024',
      time: '6:00 PM',
      location: 'Chinatown, NYC',
      attendees: 12,
      maxAttendees: 20,
      image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'Coffee Cupping & Roasting Workshop',
      community: 'Coffee Connoisseurs',
      date: 'March 18, 2024',
      time: '2:00 PM',
      location: 'Blue Bottle Coffee, Oakland',
      attendees: 8,
      maxAttendees: 15,
      image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop'
    },
    {
      id: '3',
      title: 'Plant-Based Potluck Gathering',
      community: 'Plant-Based Pioneers',
      date: 'March 22, 2024',
      time: '7:00 PM',
      location: 'Golden Gate Park, SF',
      attendees: 15,
      maxAttendees: 25,
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop'
    }
  ];

  const categories = ['All', 'Local Dining', 'Ramen', 'Plant-Based', 'Coffee', 'Street Food', 'Desserts'];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'joined') {
      return matchesSearch && community.joined;
    }
    
    return matchesSearch;
  });

  const joinedCommunities = communities.filter(c => c.joined);

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Communities
            </h1>
            <p className="text-gray-400">Connect with people who share your taste preferences</p>
          </div>

          <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-semibold">
            <Plus className="w-5 h-5" />
            <span>Create Community</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-1 bg-[#181818] rounded-2xl p-2 border border-gray-800">
            {(['browse', 'joined', 'events'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab}
                {tab === 'joined' && joinedCommunities.length > 0 && (
                  <span className="ml-2 px-2 py-1 bg-purple-400/20 text-purple-300 text-xs rounded-full">
                    {joinedCommunities.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeTab !== 'events' && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search communities..."
                className="pl-10 pr-4 py-2 bg-[#181818] border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm w-80"
              />
            </div>
          )}
        </div>

        {/* Content */}
        {activeTab === 'browse' && (
          <div className="space-y-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  className="px-4 py-2 bg-[#181818] border border-gray-700 rounded-xl hover:border-purple-500 hover:bg-[#1a1a1a] transition-all duration-300 text-sm"
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Communities Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map(community => (
                <div
                  key={community.id}
                  className="bg-[#181818] rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-purple-900/10"
                >
                  <div className="relative">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {community.trending && (
                      <div className="absolute top-3 left-3 flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-medium">
                        <TrendingUp className="w-3 h-3" />
                        <span>Trending</span>
                      </div>
                    )}
                    {community.joined && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-green-600 rounded-full text-xs font-medium">
                        Joined
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold group-hover:text-purple-400 transition-colors">
                        {community.name}
                      </h3>
                      <span className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full">
                        {community.category}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {community.description}
                    </p>

                    <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {community.members.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {community.posts}
                        </div>
                      </div>
                      <span>Active {community.recentActivity}</span>
                    </div>

                    <button
                      className={`w-full py-2 rounded-xl font-semibold transition-all duration-300 ${
                        community.joined
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
                      }`}
                    >
                      {community.joined ? 'Joined' : 'Join Community'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'joined' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.length > 0 ? (
              filteredCommunities.map(community => (
                <div
                  key={community.id}
                  className="bg-[#181818] rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-purple-900/10"
                >
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                      {community.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {community.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {community.members.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {community.posts}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No communities found</h3>
                <p className="text-gray-400">
                  {searchTerm ? 'Try adjusting your search terms' : 'Join some communities to see them here'}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
              <select className="px-3 py-2 bg-[#181818] border border-gray-700 rounded-lg focus:border-purple-500 transition-colors text-sm">
                <option value="all">All Events</option>
                <option value="joined">My Communities</option>
                <option value="nearby">Nearby</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map(event => (
                <div
                  key={event.id}
                  className="bg-[#181818] rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-purple-900/10"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-purple-400 text-sm mb-3">{event.community}</p>
                    
                    <div className="space-y-2 text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {event.attendees}/{event.maxAttendees} attending
                      </div>
                    </div>

                    <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      />
                    </div>

                    <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-semibold">
                      Join Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunitiesPage;