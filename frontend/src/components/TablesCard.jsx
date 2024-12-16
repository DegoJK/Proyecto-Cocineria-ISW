import "@styles/tableCard.css";

import useDeleteTable from "@hooks/mesas/useDeleteTables.jsx";
import useGetTables from "@hooks/mesas/useGetTables.jsx";
import { mayusLetter } from "../utils";

export const TableCard = ({
  id,
  title = "Card Title",
  image,
  body = "Provisional body...",
  status,
  link,
  deleteButton,
}) => {
  const { fetchTables, setTables } = useGetTables();
  const { handleDelete } = useDeleteTable(fetchTables, setTables);

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
            status == "Ocupada" ? "status-ocupada" : ""
          }`}
        >
          {mayusLetter(status)}
        </div>
        {deleteButton && (
          <button
            className="table-card-delete"
            onClick={() => {
              handleDelete(id);
            }}
          >
            Eliminar
          </button>
        )}
      </div>
    </a>
  );
};

export default TableCard;
