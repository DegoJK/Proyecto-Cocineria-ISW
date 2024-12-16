import "@styles/waiter.css";
import TableCard from "../components/TablesCard.jsx";
import useTables from "@hooks/mesas/useGetTables.jsx";
import { mayusLetter } from "../utils";

const Waiter = () => {
  const { tables } = useTables();

  return (
    <div className="waiter-container">
      <div className="waiter-title">
        <h1>Mesero</h1>
      </div>

      <div className="tables-container">
        {tables.map((table) => (
          <TableCard
            key={table.number}
            title={`Mesa ${table.number}`}
            body={`Asientos ${table.seats}`}
            status={`Estado: ${mayusLetter(table.status)}`}
            link={`/waiter/table/${table.number}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Waiter;
