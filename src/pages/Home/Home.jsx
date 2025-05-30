import React, { useState, useEffect } from 'react';
import { Heart, Search, Gift, Music, Star, ChevronRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAllNews, searchNews, fetchCategories } from '../../api/api';

export default function SweetKPopNewsPreview() {
  const [allNews, setAllNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const [newsData, categoriesData] = await Promise.all([
        fetchAllNews(),
        fetchCategories()
      ]);

      setAllNews(Array.isArray(newsData) ? newsData : []);
      setFilteredNews(Array.isArray(newsData) ? newsData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Unable to load data from the server.');
    } finally {
      setLoading(false);
    }
  };

const handleSearch = async (query) => {
  setSearchQuery(query);
  if (query.trim()) {
    const results = await searchNews(query, selectedCategory === 'All' ? '' : selectedCategory);
    if (results.length === 0) {
      filterNewsLocally(query, selectedCategory); // fallback ke pencarian lokal
    } else {
      setFilteredNews(results);
    }
  } else {
    filterNewsLocally(query, selectedCategory);
  }
};



  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterNewsLocally(searchQuery, category);
  };

  const filterNewsLocally = (query, category) => {
    let filtered = allNews;

    if (query) {
      filtered = filtered.filter((news) => {
        const title = (news.title || '').toLowerCase();
        const summary = (news.summary || '').toLowerCase();
        return title.includes(query.toLowerCase()) || summary.includes(query.toLowerCase());
      });
    }

    if (category !== 'All') {
      filtered = filtered.filter((news) => {
        const newsCategory = (news.categoryName || '').toLowerCase(); // fix di sini
        return newsCategory === category.toLowerCase();
      });
    }

    setFilteredNews(filtered);
  };

  const getCategoryIcon = (category) => {
    switch ((category || '').toLowerCase()) {
      case 'concert': return <Music className="w-4 h-4" />;
      case 'celebrity': return <Star className="w-4 h-4" />;
      case 'release': return <Gift className="w-4 h-4" />;
      case 'kpop': return <Heart className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Recent';
    }
  };

  const candyStripeStyle = {
    background: 'repeating-linear-gradient(45deg, #FF66B2, #FF66B2 10px, #FFFFFF 10px, #FFFFFF 20px)'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-pink-500 mx-auto mb-4" />
          <p className="text-pink-600 font-medium">Loading sweet K-Pop news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="bg-pink-500 py-6 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <CandyIcon />
            </div>
            <h1 className="text-3xl font-bold text-white">Sweet K-Pop</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
            <p className="font-medium">⚠️ {error}</p>
            <button onClick={loadNews} className="text-sm underline hover:no-underline mt-2">
              Try again
            </button>
          </div>
        )}

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
              <option value="All">All</option>
             {categories.map((cat) => {
                const name = cat.name || '';
                return (
                  <option key={cat.id} value={name}>
                    {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍭</div>
            <h3 className="text-xl font-bold text-pink-600 mb-2">No sweet news found!</h3>
            <p className="text-gray-600">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => {
              const title = news.title || '';
              const category = news.categoryName || 'News'; // fix di sini
              return (
                <div
                  key={news.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200 border-2 border-pink-100 hover:border-pink-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={news.image || news.imageUrl || "/api/placeholder/400/240"}
                      alt={title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/400/240";
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-pink-500 text-white rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1 shadow-md">
                      {getCategoryIcon(category)}
                      <span className="ml-1">{category}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-3" style={candyStripeStyle}></div>
                  </div>

                  <div className="p-5 flex flex-col h-full">
                    <h2 className="text-lg font-bold mb-2 text-pink-600">{title}</h2>
                    <p className="text-sm text-gray-600 mb-4">
                      {news.summary || news.content || 'Click to read more about this exciting K-Pop news!'}
                    </p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                        {formatDate(news.publishedAt || news.createdAt)}
                      </span>
                      <Link
                        to={`/news/${news.id}`}
                        className="text-pink-500 hover:underline font-semibold"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-pink-600 font-medium">
            Showing {filteredNews.length} of {allNews.length} sweet K-Pop stories 🍭
          </p>
        </div>
      </div>
    </div>
  );
}

const CandyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 7.5C9.5 6 10.5 4 12 4C13.5 4 14.5 6 14.5 7.5C14.5 9 13.5 11 12 11C10.5 11 9.5 9 9.5 7.5Z" fill="#F472B6"/>
    <path d="M17.5 7C19 7 21 6 21 4C21 2 19 0 17.5 0C16 0 14 2 14 4C14 6 16 7 17.5 7Z" fill="#EC4899"/>
    <path d="M3 7C4.5 7 6.5 6 6.5 4C6.5 2 4.5 0 3 0C1.5 0 0 2 0 4C0 6 1.5 7 3 7Z" fill="#F9A8D4"/>
    <path d="M2 20H22L14 12L10 16L2 20Z" fill="#F472B6"/>
  </svg>
);
