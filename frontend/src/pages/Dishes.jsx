import { useEffect, useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import { getIngredients } from "../services/ingredient.service.js";
import { getDishes, deleteDish, createDish, editDish} from "../services/dishes.service.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/dishes.css';

export default function Dishes() {
    const [dishes, setDishes] = useState([]);
    const [show, setShow] = useState(false);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState('');
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [dishIngredients, setDishIngredients] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchDishes = async () => {
        try {
        const response = await getDishes();
        setDishes(response);
        } catch (error) {
        console.error('Error: ', error);
        }
    };

    const fetchIngredients = async () => {
        try {
            const response = await getIngredients();
            setAvailableIngredients(response);
        } catch (error) {
            console.error('Error al obtener ingredientes:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteDish(id);
            console.log("Platillo eliminado",response);
            await fetchDishes();
        } catch (error) {
            console.error('Error: ',error);
        }
    }

    const handleSubmit = async () => {
        try {
            const ingredientes = dishIngredients.map((item) => ({
                ingredient_id: parseInt(item.ingredientId, 10),
                cantidad: parseFloat(item.cantidad),
            }));
        
            const newDish = {
                nombre,
                descripcion,
                precio: parseFloat(precio),
                ingredientes,
            };
            
            if (imagen && imagen.trim() !== '') {
                newDish.imagen = imagen;
            }
            await createDish(newDish);
            await fetchDishes();
            handleClose();
            setNombre('');
            setDescripcion('');
            setPrecio('');
            setImagen('');
            setDishIngredients([]);
        } catch (error) {
            console.error('Error al agregar platillo:', error);
        }
    };

    const handleAddToMenu = async (id) => {
        try {
            const updatedData = { estado: 'menu' };
            await editDish(id, updatedData);
            await fetchDishes();
        } catch (error) {
            console.error('Error al agregar al menú:', error.response.data);
        }
    };

    const addIngredientField = () => {
        if (dishIngredients.length < availableIngredients.length) {
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


    useEffect(() => {
        fetchDishes();
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
            <Button onClick={addIngredientField} disabled={dishIngredients.length >= availableIngredients.length}>
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
                    {availableIngredients.map((ingredient) => (
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