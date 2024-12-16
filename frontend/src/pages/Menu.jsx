/* eslint-disable no-unused-vars */
import "@styles/menu.css";
import DishSelector from "../components/DishSelector";
import useGetDishes from "../hooks/dishes/useGetDishes";
import { useParams, useNavigate } from "react-router-dom";
import { createOrderService } from "../services/waiter.service";
import { useState } from "react";
import {
  deleteDataAlert,
  showErrorAlert,
  showSuccessAlert,
} from "@helpers/sweetAlert.js";
import Swal from "sweetalert2";
import { mayusLetter } from "../utils";

const Menu = () => {
  const { dishes } = useGetDishes();
  const [order, setOrder] = useState({}); // Estado global para las cantidades
  const { tableId } = useParams();
  const navigate = useNavigate();

  const menuDishes = dishes.filter((dish) => dish.estado === "menu");

  const handleCreateOrder = () => {
    // Filtrar los platillos con cantidad > 0
    const filteredOrder = Object.entries(order)
      .filter(([_, quantity]) => quantity > 0)
      .map(([id, quantity]) => ({ dishId: parseInt(id), quantity })); // Cambiar id a dishId

    if (filteredOrder.length === 0) {
      return showErrorAlert("Error", "No has seleccionado ningún platillo.");
    }

    const orderSummary = filteredOrder
      .map((item) => {
        const dish = dishes.find((dish) => dish.id === item.dishId);
        return `${dish.nombre}: ${item.quantity} unidad(es)`;
      })
      .join("<br>");

    Swal.fire({
      title: "Resumen orden",
      html: `
      <div style="text-align: left;">
        ${orderSummary}
      </div>`,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Orden creada!",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });

        // Llamar al servicio para crear la orden
        const response = createOrderService({ dishes: filteredOrder }, tableId);
        if (response.status === "Client error") {
          return showErrorAlert("Error", response.details);
        }

        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else if (result.isDenied) {
        Swal.fire({
          icon: "error",
          title: "Orden cancelada!",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
      }
    });
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
        <button
          className="menu-back-button"
          onClick={() => navigate("/waiter")}
        >
          Volver
        </button>
        <div className="menu-title-text">
          <h1>Menu</h1>
          <h2>Mesa {tableId}</h2>
        </div>
        <button className="menu-add-button" onClick={handleCreateOrder}>
          Crear orden
        </button>
      </header>

      <div className="menu-tables-container">
        {menuDishes.length === 0 ? (
          <div className="menu-no-dishes">
            <h1> No hay platillos disponibles </h1>
            <a href="/dishes">Volver a los platillos</a>
          </div>
        ) : (
          <ul className="menu-menu">
            {dishes.map(
              (dish) =>
                dish.estado === "menu" && (
                  <div key={dish.id}>
                    <DishSelector
                      id={dish.id}
                      nombre={mayusLetter(dish.nombre)}
                      precio={dish.precio}
                      imagen={dish.imagen}
                      ingredientes={dish.platilloIngredients}
                      descripcion={dish.descripcion}
                      estado={mayusLetter(dish.estado)}
                      onCounterChange={handleCounterChange}
                    />
                  </div>
                )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Menu;
