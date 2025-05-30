import React from 'react';

const CommentList = ({ comments }) => (
  <div>
    {comments.length === 0 ? (
      <div className="text-gray-500">No comments yet.</div>
    ) : (
      comments.map((comment) => (
        <div key={comment.ID} className="mb-2 p-2 border-b">
          <div className="font-semibold">{comment.USER_NAME || 'Anonymous'}</div>
          <div className="text-gray-700">{comment.CONTENT}</div>
          <div className="text-xs text-gray-400">{comment.CREATED_AT}</div>
        </div>
      ))
    )}
  </div>
);

export default CommentList;