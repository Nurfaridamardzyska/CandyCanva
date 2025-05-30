const NewsDetail = ({ news }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
    <h1 className="text-3xl font-bold text-pink-700 mb-4">{news.title}</h1>
    {news.imageUrl && (
      <img
        src={news.imageUrl}
        alt={news.title}
        className="w-full max-h-96 object-cover rounded-lg mb-4"
        onError={e => e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'}
      />
    )}
    <div className="text-gray-700 mb-4">{news.content}</div>
    {/* ...field lain... */}
  </div>
);

export default NewsDetail;