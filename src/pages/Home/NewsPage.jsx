import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNewsById } from '../../utils/api';
import NewsDetail from '../../components/NewsDetail';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadNewsDetail = async () => {
      try {
        setLoading(true);
        const newsData = await fetchNewsById(id);
        if (!newsData) {
          throw new Error('News not found');
        }
        setNews(newsData);
        setComments(newsData.comments || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load news detail. The article might have been removed.');
        setLoading(false);
      }
    };

    loadNewsDetail();
  }, [id]);

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
    <div className="news-page">
      <button 
        className="btn btn-outline mb-4"
        onClick={() => navigate('/')}
      >
        ← Back to News
      </button>
      
      {news && <NewsDetail news={news} />}
      
      <div className="comment-section">
        <h3 className="text-xl font-bold mb-4">Comments ({comments.length})</h3>
        <CommentList comments={comments} />
        <CommentForm newsId={id} onCommentAdded={handleCommentAdded} />
      </div>
    </div>
  );
};

export default NewsPage;