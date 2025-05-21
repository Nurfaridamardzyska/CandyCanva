const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, idx) => (
        <div key={idx}>{comment.text}</div>
      ))}
    </div>
  );
};

export default CommentList;
