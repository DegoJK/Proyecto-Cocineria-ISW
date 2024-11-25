import "@styles/tableCard.css";

export const Card = ({
  title = "Card Title",
  image,
  body = "Provisional body...",
  status,
  link,
}) => {
  return (
    <a href={link} className="table-card-link">
      <div className="table-card">
        {image && (
          <div className="table-card-image">
            <img src={image} alt={title} />
          </div>
        )}
        <h1 className="table-card-title">{title}</h1>
        <div className="table-card-body">
          <p>{body}</p>
        </div>
        <div
          className={`table-card-status ${
            status === "Ocupada" ? "status-ocupada" : ""
          }`}
        >
          {status}
        </div>
      </div>
    </a>
  );
};

export default Card;
