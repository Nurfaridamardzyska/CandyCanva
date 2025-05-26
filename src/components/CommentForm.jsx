import { useState } from 'react';

const CommentForm = ({ newsId, onCommentAdded }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onCommentAdded(comment);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-2 border rounded-lg mb-2"
      />
      <button
        type="submit"
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        Post Comment
      </button>
    </form>
  );
};
export default CommentForm;