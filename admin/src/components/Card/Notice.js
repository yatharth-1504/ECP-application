import "./Card.scss";

export function Notice({ notices }) {
  return (
    <div className="Cards">
      <h2>Notice Board...</h2>
      {notices.map((notice, id) => (
        <div className="Card" key={id}>
          <h3>Title: {notice.title}</h3>
          <h3>Description: {notice.description}</h3>
        </div>
      ))}
    </div>
  );
}
