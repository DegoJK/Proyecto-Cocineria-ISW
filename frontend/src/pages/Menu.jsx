/* eslint-disable no-unused-vars */
import "@styles/menu.css";
import DishSelector from "../components/DishSelector";
import useGetDishes from "../hooks/dishes/useGetDishes";
import { useParams } from "react-router-dom";
import { createOrderService } from "../services/waiter.service";
import { useState } from "react";
import {
  deleteDataAlert,
  showErrorAlert,
  showSuccessAlert,
} from "@helpers/sweetAlert.js";

const Menu = () => {
  const { dishes } = useGetDishes();
  const [order, setOrder] = useState({}); // Estado global para las cantidades
  const { tableId } = useParams();
  const [reset, setReset] = useState(false); // Estado para manejar el reinicio

  const handleCreateOrder = () => {
    // Filtrar los platillos con cantidad > 0
    const filteredOrder = Object.entries(order)
      .filter(([_, quantity]) => quantity > 0)
      .map(([id, quantity]) => ({ dishId: parseInt(id), quantity })); // Cambiar id a dishId

    // Llamar al servicio para crear la orden
    const response = createOrderService({ dishes: filteredOrder }, tableId);
    if (response.status === "Client error") {
      return showErrorAlert("Error", response.details);
    }

    showSuccessAlert(
      "¡Orden creada!",
      "La orden ha sido creada correctamente."
    );

    resetCounters(); // Reiniciar los contadores
  };

  const resetCounters = () => {
    setOrder({});
    setReset((prev) => !prev); // Cambiar el valor de `reset` para notificar a los `DishSelector`
  };

  const handleCounterChange = (id, quantity) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [id]: quantity, // Actualizar el valor del platillo con su cantidad
    }));
  };

  return (
    <div className="menu-container">
      <header className="menu-title">
        <h1>Menu</h1>
        <h2>Mesa {tableId}</h2>
        <button className="menu-add-button" onClick={handleCreateOrder}>
          Crear orden
        </button>
      </header>

      <div className="menu-tables-container">
        <ul className="menu-menu">
          {dishes.map(
            (dish) =>
              dish.estado === "menu" && (
                <div key={dish.id}>
                  <DishSelector
                    id={dish.id}
                    nombre={dish.nombre}
                    precio={dish.precio}
                    imagen={dish.imagen}
                    ingredientes={dish.platilloIngredients}
                    descripcion={dish.descripcion}
                    estado={dish.estado}
                    onCounterChange={handleCounterChange}
                    reset={reset}
                  />
                </div>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
