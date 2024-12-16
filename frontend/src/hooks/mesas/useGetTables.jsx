import { useState, useEffect } from "react";
import { getTables } from "@services/table.service.js";

const useGetTables = () => {
  const [tables, setTables] = useState([]);

  const fetchTables = async () => {
    try {
      const response = await getTables();
      const formattedData = response.map((table) => ({
        id: table.id,
        number: table.number,
        seats: table.seats,
        status: table.status,
      }));
      setTables(formattedData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return { tables, fetchTables, setTables };
};

export default useGetTables;
