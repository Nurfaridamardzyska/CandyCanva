import React, { useState, useEffect } from 'react';
import { Heart, Search, Gift, Music, Star, ChevronRight } from 'lucide-react';

export default function SweetKPopNewsPreview() {
  // Sample news data
  const sampleNews = [
    {
      id: 1,
      title: "BLACKPINK Announces World Tour 2025",
      summary: "The K-pop sensation BLACKPINK has announced their highly anticipated world tour, set to begin in Seoul before heading to major cities across Asia, Europe, and North America.",
      image: "/api/placeholder/400/240",
      category: "Concert",
      publishedAt: "2025-05-15T09:00:00Z"
    },
    {
      id: 2,
      title: "BTS's Jungkook Releases Solo Album",
      summary: "BTS member Jungkook has released his first full-length solo album 'Eternal', featuring collaborations with several international artists.",
      image: "/api/placeholder/400/240",
      category: "Release",
      publishedAt: "2025-05-10T10:30:00Z"
    },
    {
      id: 3,
      title: "TWICE Celebrates 10-Year Anniversary",
      summary: "K-pop girl group TWICE celebrates their 10-year anniversary with a special fan meeting event and the release of a commemorative album.",
      image: "/api/placeholder/400/240",
      category: "Celebrity",
      publishedAt: "2025-05-18T14:45:00Z"
    },
    {
      id: 4,
      title: "NewJeans Drops Surprise Summer Single",
      summary: "Rising K-pop group NewJeans has surprised fans with the release of their new summer-themed digital single 'Sweet Dreams' along with a vibrant music video.",
      image: "/api/placeholder/400/240",
      category: "Release",
      publishedAt: "2025-05-12T08:15:00Z"
    },
    {
      id: 5,
      title: "ENHYPEN Announces Fan Meeting Tour",
      summary: "Boy group ENHYPEN has announced a special fan meeting tour across Asia, giving fans the opportunity to meet their idols up close and personal.",
      image: "/api/placeholder/400/240",
      category: "Concert",
      publishedAt: "2025-05-14T11:20:00Z"
    },
    {
      id: 6,
      title: "IVE Wins Daesang at Golden Disc Awards",
      summary: "Girl group IVE has taken home the prestigious Daesang (Grand Prize) at this year's Golden Disc Awards, cementing their status as one of K-pop's top acts.",
      image: "/api/placeholder/400/240",
      category: "Celebrity",
      publishedAt: "2025-05-08T16:00:00Z"
    }
  ];

  const [filteredNews, setFilteredNews] = useState(sampleNews);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter news based on search and category
  const handleSearch = (query) => {
    setSearchQuery(query);
    filterNews(query, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterNews(searchQuery, category);
  };

  const filterNews = (query, category) => {
    let filtered = sampleNews;
    
    if (query) {
      filtered = filtered.filter((news) =>
        news.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (category !== 'All') {
      filtered = filtered.filter((news) => news.category === category);
    }
    
    setFilteredNews(filtered);
  };

  // Function to get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Concert':
        return <Music className="w-4 h-4" />;
      case 'Celebrity':
        return <Star className="w-4 h-4" />;
      case 'Release':
        return <Gift className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  // Custom styles for candy stripes
  const candyStripeStyle = {
    background: 'repeating-linear-gradient(45deg, #FF66B2, #FF66B2 10px, #FFFFFF 10px, #FFFFFF 20px)'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Candy-themed header */}
      <div className="bg-pink-500 py-6 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center">
          {/* Candy Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <CandyIcon />
            </div>
            <h1 className="text-3xl font-bold text-white">Sweet K-Pop</h1>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search & Filter Section with candy styling */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-pink-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-pink-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search sweet K-Pop news..."
                className="w-full border-2 border-pink-200 rounded-full px-10 py-2 focus:outline-none focus:border-pink-400 transition-colors"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <select
              className="w-full sm:w-1/4 border-2 border-pink-200 rounded-full px-4 py-2 bg-white focus:outline-none focus:border-pink-400 transition-colors"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option>All</option>
              <option>Concert</option>
              <option>Release</option>
              <option>Celebrity</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200 border-2 border-pink-100 hover:border-pink-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-pink-500 text-white rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1 shadow-md">
                  {getCategoryIcon(news.category)}
                  <span className="ml-1">{news.category}</span>
                </div>
                
                {/* Candy stripe decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-3" style={candyStripeStyle}></div>
              </div>

              <div className="p-5 flex flex-col h-full">
                <h2 className="text-lg font-bold mb-2 text-pink-600">{news.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{news.summary}</p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                    {new Date(news.publishedAt).toLocaleDateString()}
                  </span>
                  <button 
                    className="flex items-center text-pink-500 font-medium text-sm hover:text-pink-700 transition-colors"
                  >
                    Read more <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Custom Candy Icon component
const CandyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 7.5C9.5 6 10.5 4 12 4C13.5 4 14.5 6 14.5 7.5C14.5 9 13.5 11 12 11C10.5 11 9.5 9 9.5 7.5Z" fill="#FF66B2" />
    <path d="M14.5 16.5C14.5 18 13.5 20 12 20C10.5 20 9.5 18 9.5 16.5C9.5 15 10.5 13 12 13C13.5 13 14.5 15 14.5 16.5Z" fill="#FF66B2" />
    <path d="M7.5 14.5C6 14.5 4 13.5 4 12C4 10.5 6 9.5 7.5 9.5C9 9.5 11 10.5 11 12C11 13.5 9 14.5 7.5 14.5Z" fill="#FF66B2" />
    <path d="M16.5 9.5C18 9.5 20 10.5 20 12C20 13.5 18 14.5 16.5 14.5C15 14.5 13 13.5 13 12C13 10.5 15 9.5 16.5 9.5Z" fill="#FF66B2" />
    <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" stroke="#FF66B2" strokeWidth="2" />
  </svg>
);