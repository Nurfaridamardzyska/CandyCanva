import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewsDetail from '../../components/NewsDetail';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';
import { fetchNewsById, fetchCommentsByNewsId, addComment } from '../../api/api';

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const data = await fetchNewsById(id);
        setNews(data);
        const commentsData = await fetchCommentsByNewsId(id);
        setComments(commentsData);
      } catch (err) {
        setNews(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, [id]);

  const handleCommentAdded = async (content) => {
    // Optionally, you can add author field
    const newComment = await addComment(id, content);
    setComments([...comments, newComment]);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!news) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">News not found.</p>
        <button 
          className="bg-pink-500 text-white font-semibold py-2 px-4 rounded hover:bg-pink-600"
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

      <NewsDetail news={news} />

      <div className="comment-section bg-white p-6 rounded-2xl shadow-inner mt-6">
        <h3 className="text-xl font-bold mb-4 text-pink-700">Comments ({comments.length})</h3>
        <CommentList comments={comments} />
        <CommentForm newsId={id} onCommentAdded={handleCommentAdded} />
      </div>
    </div>
  );
};

export default NewsPage;