import React, { useState } from 'react';
import { Home, Compass, Users, User, Settings, Search, Bell, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(3);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Discovery', path: '/discovery' },
    { icon: Users, label: 'Communities', path: '/communities' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-[#0E0E0E]/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              TasteConnect
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts, people, places..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#181818] border border-gray-300 dark:border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm"
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map(({ icon: Icon, label, path }) => (
              <Link
                key={path}
                to={path}
                className={`relative p-3 rounded-xl transition-all duration-300 group ${
                  isActive(path)
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 dark:bg-[#1a1a1a] text-xs text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {label}
                </div>
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-3 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 dark:bg-[#1a1a1a] text-xs text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </div>
            </button>
            {/* Notifications */}
            <button className="relative p-3 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 dark:bg-[#1a1a1a] text-xs text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Notifications
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;