import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, MessageCircle, Share2, Bookmark, MapPin, Star, Clock, User,
  ArrowLeft, MoreHorizontal, Send, ThumbsUp, Flag
} from 'lucide-react';

const PostDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(124);
  const [newComment, setNewComment] = useState('');

  // Mock post data - in real app this would be fetched based on id
  const post = {
    id: id,
    author: {
      name: 'Sofia Chen',
      avatar: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      specialty: 'Authentic Ramen Explorer',
      followers: 1247,
      following: 892
    },
    content: {
      title: 'Hidden Gem: Authentic Tonkotsu in Chinatown',
      description: `After 3 months of searching through every ramen shop in the city, I finally found the perfect tonkotsu ramen. Tucked away in a narrow alley in Chinatown, this family-run spot has been serving authentic ramen for over 30 years.

The broth has that perfect cloudy richness that comes from 12+ hours of slow-cooking pork bones. The noodles have the ideal firmness, and the chashu literally melts in your mouth. What sets this place apart is their attention to traditional techniques - the owner trained in Fukuoka for 5 years before opening here.

The atmosphere is intimate with only 8 counter seats, and watching the master work is like watching an artist. Every bowl is crafted with precision and care. The price point is incredibly reasonable for the quality - under $15 for a bowl that rivals the best ramen shops in Japan.

If you're serious about ramen, this is a must-visit. Just don't expect English menus or fancy ambiance - this is all about authentic flavor and technique.`,
      images: [
        'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      tags: ['ramen', 'authentic', 'chinatown', 'hidden-gem', 'traditional'],
      location: 'Chinatown, NYC',
      rating: 4.8,
      address: '123 Mott Street, New York, NY',
      priceRange: '$10 - $15'
    },
    engagement: {
      likes: 124,
      comments: 18,
      shares: 7,
      bookmarks: 32
    },
    timestamp: '2 hours ago'
  };

  const comments = [
    {
      id: '1',
      author: {
        name: 'Marcus Johnson',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      content: 'Amazing find! I\'ve been looking for authentic tonkotsu forever. Definitely heading there this weekend. Thanks for the detailed review!',
      timestamp: '1 hour ago',
      likes: 12,
      replies: []
    },
    {
      id: '2',
      author: {
        name: 'Isabella Rodriguez',
        avatar: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      content: 'I went here after seeing your post and WOW! The broth was incredible. The owner even shared some insights about his technique. Such a gem!',
      timestamp: '45 minutes ago',
      likes: 8,
      replies: [
        {
          id: '2-1',
          author: {
            name: 'Sofia Chen',
            avatar: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
          },
          content: 'So glad you enjoyed it! He\'s really passionate about sharing the traditional methods. Did you try the gyoza too?',
          timestamp: '30 minutes ago',
          likes: 3
        }
      ]
    },
    {
      id: '3',
      author: {
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      content: 'Been going to this place for years! So happy someone finally wrote about it. Their miso ramen is also incredible if you want to try something different.',
      timestamp: '30 minutes ago',
      likes: 15,
      replies: []
    }
  ];

  const relatedPosts = [
    {
      id: '2',
      title: 'Best Coffee Shops in the Village',
      image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      author: 'Marcus Johnson',
      similarity: 87
    },
    {
      id: '3',
      title: 'Street Food Tour: NYC Edition',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      author: 'Isabella Rodriguez',
      similarity: 82
    },
    {
      id: '4',
      title: 'Authentic Dumpling Houses',
      image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      author: 'David Kim',
      similarity: 95
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment('');
    }
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

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Post Not Found</h2>
          <p className="text-gray-400">The post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#F5F5F5]">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Main Post */}
        <article className="bg-[#181818] rounded-3xl border border-gray-800 overflow-hidden mb-8">
          {/* Author Header */}
          <div className="p-6 pb-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full ring-2 ring-gray-700"
                />
                <div>
                  <h3 className="font-semibold text-[#F5F5F5]">{post.author.name}</h3>
                  <p className="text-sm text-purple-400">{post.author.specialty}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-sm">{post.timestamp}</span>
                <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6">
            <h1 className="text-2xl font-bold mb-4 text-[#F5F5F5]">{post.content.title}</h1>
            
            {/* Location and Rating */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{post.content.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(post.content.rating)}
                <span className="text-sm text-gray-400 ml-2">{post.content.rating}</span>
              </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {post.content.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${post.content.title} - Image ${index + 1}`}
                  className={`rounded-2xl object-cover transition-transform duration-300 hover:scale-105 ${
                    index === 0 ? 'md:col-span-2 lg:col-span-2 h-80' : 'h-48'
                  }`}
                />
              ))}
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none mb-6">
              {post.content.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-300 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Additional Details */}
            <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-6">
              <h3 className="font-semibold mb-3">Details</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Address:</span>
                  <p className="text-gray-300">{post.content.address}</p>
                </div>
                <div>
                  <span className="text-gray-400">Price Range:</span>
                  <p className="text-gray-300">{post.content.priceRange}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.content.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-purple-800/30 hover:text-purple-300 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Engagement Bar */}
          <div className="px-6 py-4 border-t border-gray-800 bg-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 transition-all duration-300 ${
                    isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm font-medium">{likes}</span>
                </button>
                
                <div className="flex items-center space-x-2 text-gray-400">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.engagement.comments}</span>
                </div>
                
                <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.engagement.shares}</span>
                </button>
              </div>
              
              <button
                onClick={handleBookmark}
                className={`transition-all duration-300 ${
                  isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-400'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-[#181818] rounded-3xl border border-gray-800 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Comments ({comments.length})</h2>
          
          {/* Add Comment */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex space-x-3">
              <img
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                alt="You"
                className="w-10 h-10 rounded-full ring-2 ring-gray-700"
              />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-4 py-3 bg-[#0E0E0E] border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      newComment.trim()
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Comment</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="space-y-4">
                <div className="flex space-x-3">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-10 h-10 rounded-full ring-2 ring-gray-700"
                  />
                  <div className="flex-1">
                    <div className="bg-[#1a1a1a] rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">{comment.author.name}</h4>
                        <span className="text-xs text-gray-400">{comment.timestamp}</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{comment.content}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-gray-400">
                      <button className="flex items-center space-x-1 text-xs hover:text-blue-400 transition-colors">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="text-xs hover:text-gray-300 transition-colors">Reply</button>
                      <button className="text-xs hover:text-red-400 transition-colors">
                        <Flag className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {comment.replies.map(reply => (
                  <div key={reply.id} className="ml-12 flex space-x-3">
                    <img
                      src={reply.author.avatar}
                      alt={reply.author.name}
                      className="w-8 h-8 rounded-full ring-1 ring-gray-700"
                    />
                    <div className="flex-1">
                      <div className="bg-[#1a1a1a] rounded-2xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-xs">{reply.author.name}</h4>
                          <span className="text-xs text-gray-400">{reply.timestamp}</span>
                        </div>
                        <p className="text-gray-300 text-xs leading-relaxed">{reply.content}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-gray-400">
                        <button className="flex items-center space-x-1 text-xs hover:text-blue-400 transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{reply.likes}</span>
                        </button>
                        <button className="text-xs hover:text-gray-300 transition-colors">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        <div className="bg-[#181818] rounded-3xl border border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-6">Related Recommendations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <div
                key={relatedPost.id}
                className="group cursor-pointer rounded-xl overflow-hidden bg-[#1a1a1a] border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                onClick={() => navigate(`/post/${relatedPost.id}`)}
              >
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-purple-400 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-400 text-xs mb-2">by {relatedPost.author}</p>
                  <div className="text-xs text-purple-400">{relatedPost.similarity}% match</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;