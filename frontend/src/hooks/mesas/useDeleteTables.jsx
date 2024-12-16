import { deleteTable } from "@services/table.service.js";
import {
  deleteDataAlert,
  showErrorAlert,
  showSuccessAlert,
} from "@helpers/sweetAlert.js";

const useDeleteTables = (fetchTables, setTables) => {
  const handleDelete = async (id) => {
    try {
      const result = await deleteDataAlert();
      if (result.isConfirmed) {
        const response = await deleteTable(id);
        if (response.status === "Client error") {
          return showErrorAlert("Error", response.details);
        }
        showSuccessAlert(
          "¡Eliminado!",
          "La mesa ha sido eliminada correctamente."
        );
        await fetchTables();
        setTables([]);
      } else {
        showErrorAlert("Cancelado", "La operación ha sido cancelada.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { handleDelete };
};

export default useDeleteTables;
