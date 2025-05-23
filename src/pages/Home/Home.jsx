import React, { useState, useEffect } from 'react';
import { Heart, Search, Gift, Music, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAllNews } from '../../utils/api';

const Home = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const news = await fetchAllNews();
        setNewsList(news);
        setLoading(false);
      } catch (err) {
        console.error('Error loading news', err);
      }
    };

    loadNews();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Berita Terbaru</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {newsList.map((item) => (
            <Link
              key={item.id}
              to={`/news/${item.id}`}
              className="block p-4 bg-white rounded shadow hover:bg-pink-50"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p>{item.content.substring(0, 100)}...</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
