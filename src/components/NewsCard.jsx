import React from 'react';

const NewsCard = ({ news }) => (
  <div className="border p-4 rounded shadow mb-4 bg-white">
    <h2 className="text-xl font-bold mb-2">{news.title}</h2>
    <p>{news.content}</p>
  </div>
);

export default NewsCard;
