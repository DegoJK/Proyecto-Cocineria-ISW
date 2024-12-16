import React from "react";
import '@styles/MenuDishCard.css';

const MenuDishCard = ({ dish, userRole, handleRemoveFromMenu }) => (
  <div className="menu-dish-card">
    <img
      className="menu-dish-card-image"
      src={dish.imagen || "https://via.placeholder.com/300"}
      alt={dish.nombre || "Imagen"}
    />
    <div className="menu-dish-card-body">
      <h2 className="menu-dish-card-title">{dish.nombre || "Platillo desconocido"}</h2>
      <p className="menu-dish-price">${dish.precio || "N/A"}</p>
      {userRole && (userRole === "administrador" || userRole === "bosschef") && (
        <button
          className="menu-dish-button"
          onClick={() => handleRemoveFromMenu(dish.id)}
        >
          Quitar del menú
        </button>
      )}
    </div>
  </div>
);

export default MenuDishCard;