import "@styles/waiter.css";
import Card from "../../components/TablesCard";
import useTables from "@hooks/mesas/useGetTables.jsx";

const Waiter = () => {
  const { tables } = useTables();

  return (
    <div className="waiter-container">
      <div className="waiter-title">
        <h1>Waiter</h1>
      </div>

      <div className="tables-container">
        {tables.map((table) => (
          <Card
            key={table.number}
            title={`Mesa ${table.number}`}
            body={`Asientos ${table.seats}`}
            status={`Estado: ${table.status}`}
            link={`/waiter?table=${table.number}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Waiter;
