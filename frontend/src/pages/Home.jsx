



import React, { useEffect, useState } from "react";
import { getDishes, editDish } from "../services/dishes.service.js";
import MenuDishCard from "../components/MenuDishCard";
import '@styles/home.css';

const Home = () => {
  const [dishes, setDishes] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem("usuario"));
  const userRole = userData ? userData.rol : null;

  const menuDishes = dishes.filter((dish) => dish.estado === "menu");

  const fetchDishes = async () => {
    try {
      const response = await getDishes();
      setDishes(response);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleRemoveFromMenu = async (id) => {
    try {
      const updatedData = { estado: "disponible" };
      await editDish(id, updatedData);
      await fetchDishes();
    } catch (error) {
      console.error("Error al quitar del menú:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Menú del Día</h1>
      <div className="dish-list">
        {menuDishes.length > 0 ? (
          menuDishes.map((dish) => (
            <MenuDishCard
              key={dish.id}
              dish={dish}
              userRole={userRole}
              handleRemoveFromMenu={handleRemoveFromMenu}
            />
          ))
        ) : (
          <p>No hay platillos en el menú</p>
        )}
      </div>
    </div>
  );
};

export default Home;
