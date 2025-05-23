import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNewsById } from '../../utils/api';
import NewsDetail from '../../components/NewsDetail';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';
import { Link } from 'react-router-dom';
import { fetchAllNews } from '../../utils/api'; // Import the function to fetch all news

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newsList, setNewsList] = useState([]);


    useEffect(() => {
  const loadAllNews = async () => {
    const data = await fetchAllNews();
    setNewsList(data);
  };

  loadAllNews();
}, []);


  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
  };

  if (loading) {
    return <div className="text-center py-8">Loading article...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="news-page bg-pink-50 min-h-screen p-4 md:p-8">
  <button 
    className="mb-4 text-white bg-pink-500 hover:bg-pink-600 font-semibold py-2 px-4 rounded-xl shadow"
    onClick={() => navigate('/')}
  >
    ← Back to News
  </button>

  {news && <NewsDetail news={news} />}

  <div className="comment-section bg-white p-6 rounded-2xl shadow-inner">
    <h3 className="text-xl font-bold mb-4 text-pink-700">Comments ({comments.length})</h3>
    <CommentList comments={comments} />
    <CommentForm newsId={id} onCommentAdded={handleCommentAdded} />
  </div>
</div>

  );
};

export default NewsPage;