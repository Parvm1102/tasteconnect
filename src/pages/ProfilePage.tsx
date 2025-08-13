import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Users, Heart, MessageCircle, Settings, MoreHorizontal } from 'lucide-react';
import { useUser } from '../context/UserContext';
import PreferenceGraph from '../components/PreferenceGraph';

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'posts' | 'reviews' | 'bookmarks'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock profile data - in real app this would come from API
  const profileUser = id && id !== user?.id ? {
    id: id,
    name: 'Sofia Chen',
    avatar: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    location: 'New York, NY',
    specialty: 'Authentic Ramen Explorer',
    bio: 'Passionate about discovering authentic flavors and hidden culinary gems. Always on the hunt for the perfect bowl of ramen and exceptional coffee.',
    joinDate: 'January 2024',
    followers: 1247,
    following: 892,
    posts: 89,
    preferences: {
      spicy: 90,
      sweet: 40,
      adventurous: 95,
      healthy: 60,
      social: 75,
      budget: 70
    }
  } : user;

  const isOwnProfile = !id || id === user?.id;

  const userPosts = [
    {
      id: '1',
      title: 'Hidden Gem: Authentic Tonkotsu in Chinatown',
      image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      likes: 124,
      comments: 18,
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      title: 'Perfect Espresso Blend Discovery',
      image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      likes: 89,
      comments: 12,
      timestamp: '1 day ago'
    },
    {
      id: '3',
      title: 'Street Food Adventure in Little Italy',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      likes: 156,
      comments: 24,
      timestamp: '3 days ago'
    }
  ];

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
          <p className="text-gray-400">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F5]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-[#181818] rounded-3xl p-8 border border-gray-800 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="w-32 h-32 rounded-full ring-4 ring-gray-700"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{profileUser.name}</h1>
                  <p className="text-purple-400 text-lg mb-2">{profileUser.specialty}</p>
                  <div className="flex items-center text-gray-400 text-sm space-x-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {profileUser.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Joined {profileUser.joinDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!isOwnProfile && (
                    <>
                      <button
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                          isFollowing
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
                        }`}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </button>
                      <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
                    {isOwnProfile ? <Settings className="w-5 h-5" /> : <MoreHorizontal className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">
                {profileUser.bio || 'No bio available.'}
              </p>

              <div className="flex items-center space-x-8 text-sm">
                <div className="text-center">
                  <div className="text-xl font-bold">{profileUser.posts || 0}</div>
                  <div className="text-gray-400">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{profileUser.followers?.toLocaleString() || 0}</div>
                  <div className="text-gray-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{profileUser.following?.toLocaleString() || 0}</div>
                  <div className="text-gray-400">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preference Graph */}
        <div className="bg-[#181818] rounded-3xl p-8 border border-gray-800 mb-8">
          <h2 className="text-2xl font-bold mb-6">Taste Profile</h2>
          <PreferenceGraph preferences={profileUser.preferences || {}} />
        </div>

        {/* Activity Tabs */}
        <div className="bg-[#181818] rounded-3xl border border-gray-800 overflow-hidden">
          <div className="flex border-b border-gray-800">
            {(['posts', 'reviews', 'bookmarks'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-semibold capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'posts' && (
              <div className="grid md:grid-cols-3 gap-4">
                {userPosts.map(post => (
                  <div
                    key={post.id}
                    className="group cursor-pointer rounded-xl overflow-hidden bg-[#1a1a1a] border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.comments}
                          </div>
                        </div>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <p className="text-gray-400">Reviews coming soon...</p>
              </div>
            )}

            {activeTab === 'bookmarks' && (
              <div className="text-center py-12">
                <p className="text-gray-400">
                  {isOwnProfile ? 'Your bookmarks will appear here' : 'Bookmarks are private'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;