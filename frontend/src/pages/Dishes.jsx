import { useEffect, useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import { editDish} from "../services/dishes.service.js";

import useGetDishes from '@hooks/dishes/useGetDishes';
import useDeleteDishes from '@hooks/dishes/useDeleteDishes';
import useDishForm from "@hooks/dishes/useDishForm.jsx";
import useGetIngredients from "@hooks/ingredient/getIngredients.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/dishes.css';

export default function Dishes() {
    const [show, setShow] = useState(false);
    const { dishes, fetchDishes } = useGetDishes();//HOOK DE VER PLATILLO
    const { handleDelete } = useDeleteDishes(fetchDishes);//HOOK DE ELIMINAR PLATILLO
    const { ingredients, fetchIngredients } = useGetIngredients();//HOOK DE VER INGREDIENTES
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


    const handleAddToMenu = async (id) => {
        try {
            const updatedData = { estado: 'menu' };
            await editDish(id, updatedData);
            await fetchDishes();
        } catch (error) {
            console.error('Error al agregar al menú:', error.response.data);
        }
    };

    //!esto es para agregar ingredientes
    const addIngredientField = () => {
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
    };
    //! ******************************

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
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Agregar Platillo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group controlId="formNombre">
                <Form.Label>Nombre del Platillo</Form.Label>
                <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese una descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formPrecio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                type="number"
                placeholder="Ingrese el precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formImagen">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                type="text"
                placeholder="Ingrese el URL de la imagen"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formIngredientes">
            <Button onClick={addIngredientField} disabled={dishIngredients.length >= ingredients.length}>
                Agregar Ingrediente
            </Button>
                
            {dishIngredients.map((dishIngredient, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Form.Control
                    as="select"
                    value={dishIngredient.ingredientId}
                    onChange={(e) => handleIngredientChange(e, index)}
                    style={{ marginRight: '10px' }}
                >
                    <option value="">Seleccione un ingrediente</option>
                    {ingredients.map((ingredient) => (
                        <option key={ingredient.id} value={ingredient.id}>
                            {ingredient.nombre}
                        </option>
                    ))}
                </Form.Control>
                    <Form.Control
                        type="number"
                        placeholder="Cantidad"
                        value={dishIngredient.cantidad}
                        onChange={(e) => handleQuantityChange(e, index)}
                        style={{ width: '100px', marginRight: '10px' }}
                        min="1"
                    />
                        <Button variant="danger" onClick={() => removeIngredientField(index)}>
                            Eliminar
                        </Button>
                        </div>
                        ))}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cerrar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
            Guardar
            </Button>
            </Modal.Footer>
        </Modal>

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
                                    <button className="edit-button">Editar</button>
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