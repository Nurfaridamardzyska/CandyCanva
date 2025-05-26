import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewsDetail from '../../components/NewsDetail';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  // Mock data untuk berita berdasarkan ID
  const mockNews = {
    '5': {
      id: '5',
      title: 'ENHYPEN Announces Fan Meeting Tour',
      category: 'KPOP',
      content: 'Meet ENHYPEN in their upcoming Asia tour!',
    },
    // Tambahkan lebih banyak mock data jika diperlukan
    '1': {
      id: '1',
      title: 'BLACKPINK Announces World Tour 2025',
      category: 'KPOP',
      content: 'The K-pop sensation BLACKPINK has announced their highly anticipated world tour, set to begin in Seoul before heading to major cities across Asia, Europe, and North America.',
    },
    '2': {
      id: '2',
      title: 'BTS\'s Jungkook Releases Solo Album',
      category: 'KPOP',
      content: 'BTS member Jungkook has released his first full-length solo album "Eternal", featuring collaborations with several international artists.',
    },
    '3': {
      id: '3',
      title: 'TWICE Celebrates 10-Year Anniversary',
      category: 'KPOP',
      content: 'TWICE celebrates their 10-year anniversary with a special fan meeting event and the release of a commemorative album.',
    },
  };

  const news = mockNews[id] || null;

  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
  };

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