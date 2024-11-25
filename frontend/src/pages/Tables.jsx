import "@styles/tables.css";
import Card from "../components/TablesCard.jsx";
import useTables from "@hooks/mesas/useGetTables.jsx";

const Tables = () => {
  const { tables } = useTables();

  const handleAddTable = () => {};

  return (
    <div className="tables-main-container">
      <div className="tables-title">
        <h1>Mesas</h1>
        <button
          className="tables-button-add"
          onClick={() => {
            handleAddTable;
          }}
        >
          Agregar mesa
        </button>
      </div>

      <div className="tables-container">
        {tables.map((table) => (
          <Card
            key={table.number}
            id={table.id}
            title={`Mesa ${table.number}`}
            body={`Asientos ${table.seats}`}
            status={`Estado: ${table.status}`}
            deleteButton={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Tables;
