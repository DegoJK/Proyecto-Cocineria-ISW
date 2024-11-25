import { useEffect, useState } from "react";
import { getDishes } from "../services/dishes.service.js";
import '@styles/dishes.css';

const Home = () => {
  const [dishes, setDishes] = useState([]);

  const fetchDishes = async () => {
      try {
          const response = await getDishes();
          setDishes(response);
      }catch (error) {
          console.error('Error: ', error);
      }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div>
        <div className="title">
        <h1>Menu del dia</h1>
        </div>
        {dishes?.length > 0 ? (
            <ul>
                <div className="dish-list">
                {dishes.map((dish) => (

                    <div key = {dish.id}>
                        <ul>
                        <div className="dish-container">
                                    <p>Platillo: {dish.nombre}</p>
                                    
                                    <p>Precio: {dish.precio} </p>
                                    
                                    <div className="dish-image">
                                    <img src={dish.imagen} alt="imagen" />
                                    </div>

                                    <p>Descripcion: {dish.descripcion} </p>
                                    <p>Estado: {dish.estado} </p>

                                    <button className="delete-button">Quitar del menu</button>
                                    
                                    
                                </div>
                        </ul>
                    </div>
                ))}
                </div>
            </ul>
        ) : (
            <p>No hay platillos</p>
        )}
    </div>
)
}

export default Home