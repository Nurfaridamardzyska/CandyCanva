import React from 'react';

const CommentList = ({ comments }) => {
  if (comments.length === 0) return <p>No comments yet.</p>;

  return (
    <ul className="space-y-2">
      {comments.map((comment) => (
        <li key={comment.id} className="border p-2 rounded">
          {comment.content}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
