import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MapPin, Star, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    specialty: string;
  };
  content: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    location: string;
    rating: number;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    bookmarks: number;
  };
  timestamp: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(post.engagement.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

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
    <article 
      className="bg-white dark:bg-[#181818] rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-500 overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-900/10 hover:-translate-y-1"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full ring-2 ring-gray-300 dark:ring-gray-700 group-hover:ring-purple-500/50 transition-all duration-300"
            />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-[#F5F5F5] group-hover:text-gray-700 dark:group-hover:text-white transition-colors">
                {post.author.name}
              </h3>
              <p className="text-sm text-purple-400">{post.author.specialty}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <span className="text-sm">{post.timestamp}</span>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-[#F5F5F5] group-hover:text-gray-700 dark:group-hover:text-white transition-colors">
          {post.content.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {post.content.description}
        </p>
      </div>

      {/* Image */}
      <div className="px-6 mb-4">
        <img
          src={post.content.image}
          alt={post.content.title}
          className="w-full h-80 object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
        />
      </div>

      {/* Location and Rating */}
      <div className="px-6 mb-4 flex items-center justify-between">
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{post.content.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          {renderStars(post.content.rating)}
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{post.content.rating}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="px-6 mb-4">
        <div className="flex flex-wrap gap-2">
          {post.content.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm rounded-full hover:bg-purple-100 dark:hover:bg-purple-800/30 hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Engagement Bar */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-all duration-300 ${
                isLiked
                  ? 'text-pink-500'
                  : 'text-gray-500 dark:text-gray-400 hover:text-pink-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{likes}</span>
            </button>
            
            <button 
              className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-400 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{post.engagement.comments}</span>
            </button>
            
            <button 
              className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-green-400 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium">{post.engagement.shares}</span>
            </button>
          </div>
          
          <button
            onClick={handleBookmark}
            className={`transition-all duration-300 ${
              isBookmarked
                ? 'text-yellow-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-yellow-400'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;