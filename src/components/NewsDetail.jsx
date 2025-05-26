const NewsDetail = ({ news }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
      <h1 className="text-3xl font-bold text-pink-700 mb-2">{news.title}</h1>
      <span className="bg-pink-200 text-pink-800 text-sm font-semibold px-2 py-1 rounded">{news.category}</span>
      <p className="mt-4 text-gray-700">{news.content}</p>
    </div>
  );
};
export default NewsDetail;