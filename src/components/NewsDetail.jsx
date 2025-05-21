const NewsDetail = ({ news }) => {
  return (
    <div>
      <h2>{news.title}</h2>
      <p>{news.content}</p>
    </div>
  );
};

export default NewsDetail;
