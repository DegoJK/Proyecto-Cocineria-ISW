import { useEffect, useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import { getDishes, deleteDish, createDish } from "../services/dishes.service.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/dishes.css';

export default function Dishes() {
    const [dishes, setDishes] = useState([]);
    const [show, setShow] = useState(false);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    

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
        const newDish = { nombre, descripcion, precio, };
        await createDish(newDish);
        await fetchDishes();
        handleClose();
        setNombre('');
        setDescripcion('');
        setPrecio('');
        } catch (error) {
        console.error('Error al agregar platillo:', error);
        }
    };

    useEffect(() => {
        fetchDishes();
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

                                    <p>Descripcion: {dish.descripcion} </p>
                                    <p>Estado: {dish.estado} </p>
                                    
                                    <button className="onmenu-button">Agregar al menu</button>
                                    <button className="edit-button">Editar</button>
                                    <button className="delete-button" onClick={() => handleDelete(dish.id)}>Eliminar</button>
                                    
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