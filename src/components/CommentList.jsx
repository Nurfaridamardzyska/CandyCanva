const CommentList = ({ comments }) => {
  return comments.length === 0 ? (
    <p className="text-gray-500">No comments yet.</p>
  ) : (
    <ul>
      {comments.map((comment, index) => (
        <li key={index} className="text-gray-700 mb-2">{comment}</li>
      ))}
    </ul>
  );
};
export default CommentList;