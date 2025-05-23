import React, { useState } from 'react';

const CommentForm = ({ newsId, onCommentAdded }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = { id: Date.now(), content: comment };
      onCommentAdded(newComment);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit" className="mt-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-xl shadow">Post Comment</button>
    </form>
  );
};

export default CommentForm;
