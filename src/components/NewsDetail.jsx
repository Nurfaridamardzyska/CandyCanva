// src/components/NewsDetail.jsx
import React from 'react';

const NewsDetail = ({ news }) => {
  if (!news) return null;

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-pink-200 mb-8">
      <img
        src={news.imageUrl || "https://via.placeholder.com/600x300?text=No+Image"}
        alt={news.title}
        className="rounded-xl w-full max-h-[400px] object-cover mb-4"
      />
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-pink-700">{news.title}</h1>
        {news.category && (
          <span className="inline-block bg-pink-100 text-pink-700 text-sm px-3 py-1 rounded-full">
            {news.category.toUpperCase()}
          </span>
        )}
        <p className="text-gray-700 text-base leading-relaxed mt-2">{news.content}</p>
      </div>
    </div>
  );
};

export default NewsDetail;
