import React from 'react';
import { Calendar, Users, TrendingUp, MapPin, ArrowRight } from 'lucide-react';

const SidePanel: React.FC = () => {
  const suggestedCommunities = [
    {
      name: 'Local Food Explorers',
      members: 1247,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop',
      description: 'Discover hidden gems in your neighborhood'
    },
    {
      name: 'Coffee Connoisseurs',
      members: 892,
      image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop',
      description: 'From beans to brewing techniques'
    },
    {
      name: 'Plant-Based Pioneers',
      members: 2156,
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop',
      description: 'Innovative vegan cuisine discoveries'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Underground Ramen Tour',
      date: 'March 15',
      time: '6:00 PM',
      attendees: 12,
      location: 'Chinatown'
    },
    {
      title: 'Coffee Cupping Session',
      date: 'March 18',
      time: '2:00 PM',
      attendees: 8,
      location: 'Blue Bottle'
    },
    {
      title: 'Plant-Based Potluck',
      date: 'March 22',
      time: '7:00 PM',
      attendees: 15,
      location: 'Golden Gate Park'
    }
  ];

  const trendingTags = [
    { tag: 'hidden-gems', count: 234 },
    { tag: 'authentic-ramen', count: 189 },
    { tag: 'single-origin', count: 156 },
    { tag: 'plant-based', count: 298 },
    { tag: 'local-favorites', count: 167 }
  ];

  return (
    <div className="space-y-6">
      {/* Suggested Communities */}
      <div className="bg-white dark:bg-[#181818] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Suggested Communities</h3>
          <ArrowRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        
        <div className="space-y-4">
          {suggestedCommunities.map(community => (
            <div
              key={community.name}
              className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer group"
            >
              <img
                src={community.image}
                alt={community.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm group-hover:text-purple-400 transition-colors">
                  {community.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {community.members.toLocaleString()} members
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-500 line-clamp-2">
                  {community.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 py-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
          View All Communities
        </button>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white dark:bg-[#181818] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-purple-400" />
            Upcoming Events
          </h3>
        </div>
        
        <div className="space-y-4">
          {upcomingEvents.map(event => (
            <div
              key={event.title}
              className="p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 hover:border-purple-500/50 transition-all cursor-pointer group"
            >
              <h4 className="font-medium text-sm mb-2 group-hover:text-purple-400 transition-colors">
                {event.title}
              </h4>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <span>{event.date}</span>
                  <span>•</span>
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{event.attendees}</span>
                </div>
              </div>
              <div className="flex items-center mt-1 text-xs text-gray-600 dark:text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                {event.location}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Tags */}
      <div className="bg-white dark:bg-[#181818] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
          <h3 className="text-lg font-semibold">Trending Tags</h3>
        </div>
        
        <div className="space-y-2">
          {trendingTags.map((item, index) => (
            <div
              key={item.tag}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer group"
            >
              <div className="flex items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">#{index + 1}</span>
                <span className="text-sm font-medium group-hover:text-purple-400 transition-colors">
                  #{item.tag}
                </span>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-500">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;