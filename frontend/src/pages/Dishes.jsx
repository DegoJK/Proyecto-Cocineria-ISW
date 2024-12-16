import { useEffect, useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';

import useGetDishes from "@hooks/dishes/useGetDishes";
import useDeleteDishes from "@hooks/dishes/useDeleteDishes";
import useDishForm from "@hooks/dishes/useDishForm.jsx";
import useGetIngredients from "@hooks/ingredient/getIngredients.jsx";
import useAddToMenu from "@hooks/dishes/useAddToMenu.jsx";

import DishPopup from "../components/DishPopup";
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/dishes.css";

export default function Dishes() {
    const [show, setShow] = useState(false);
    const { dishes, fetchDishes } = useGetDishes();//HOOK DE VER PLATILLO
    const { handleDelete } = useDeleteDishes(fetchDishes);//HOOK DE ELIMINAR PLATILLO
    const { ingredients, fetchIngredients } = useGetIngredients();//HOOK DE VER INGREDIENTES
    const { handleAddToMenu } = useAddToMenu(fetchDishes);//HOOK DE AGREGAR AL MENU

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        precio,
        setPrecio,
        imagen,
        setImagen,
        dishIngredients,
        setDishIngredients,
        handleSubmit,
    } = useDishForm(fetchDishes, handleClose);

    const addIngredientField = () => {//!esto es para agregar ingredientes
        if (dishIngredients.length < ingredients.length) {
            setDishIngredients([...dishIngredients, { ingredientId: '', cantidad: '' }]);
        } else {
            alert('No puedes agregar más ingredientes.');
        }
    };
    const removeIngredientField = (index) => {
        const newDishIngredients = [...dishIngredients];
        newDishIngredients.splice(index, 1);
        setDishIngredients(newDishIngredients);
    };
    const handleIngredientChange = (e, index) => {
        const newDishIngredients = [...dishIngredients];
        newDishIngredients[index].ingredientId = e.target.value;
        setDishIngredients(newDishIngredients);
    };
    const handleQuantityChange = (e, index) => {
        const newDishIngredients = [...dishIngredients];
        newDishIngredients[index].cantidad = e.target.value;
        setDishIngredients(newDishIngredients);
    };//! ******************************

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div className="dishes-container">
      <h1 className="title">Página de Platillos</h1>
      <div className="centrar">
        <button className="add-button" onClick={handleShow}>
          Agregar Platillo
        </button>
      </div>
      
      <DishPopup
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        addIngredientField={addIngredientField}
        handleIngredientChange={handleIngredientChange}
        handleQuantityChange={handleQuantityChange}
        removeIngredientField={removeIngredientField}
        nombre={nombre}
        setNombre={setNombre}
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        precio={precio}
        setPrecio={setPrecio}
        imagen={imagen}
        setImagen={setImagen}
        dishIngredients={dishIngredients}
        ingredients={ingredients}
      />

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
                                    <div className="bot-container">
                                        <p>Descripcion: {dish.descripcion} </p>
                                        <p>
                                            Ingredientes:
                                            {dish.platilloIngredients.map((pi) => (
                                                <div key={pi.id}>
                                                    {pi.ingredient.nombre}: {pi.cantidad}
                                                </div>
                                            ))}
                                        </p>
                                        <p>Estado: {dish.estado} </p>
                                        <button className="onmenu-button" onClick={() => handleAddToMenu(dish.id)}>Agregar al menú</button>
                                        <button className="delete-button" onClick={() => handleDelete(dish.id)}>Eliminar</button>
                                    </div>
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
    );
}
