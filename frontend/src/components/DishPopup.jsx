import { Modal, Form, Button } from 'react-bootstrap';

const DishPopup = ({
    show,
    handleClose,
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    precio,
    setPrecio,
    imagen,
    setImagen,
    dishIngredients,
    ingredients,
    handleSubmit,
    addIngredientField,
    handleIngredientChange,
    handleQuantityChange,
    removeIngredientField,
}) => {
    return (
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
                min="0"
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
                <Button
                onClick={addIngredientField}
                disabled={dishIngredients.length >= ingredients.length}
                >
                Agregar Ingrediente
                </Button>
                {dishIngredients.map((dishIngredient, index) => (
                <div
                    key={index}
                    style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                    }}
                >
                    <Form.Control
                    as="select"
                    value={dishIngredient.ingredientId}
                    onChange={(e) => handleIngredientChange(e, index)}
                    style={{ marginRight: "10px" }}
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
                    style={{ width: "100px", marginRight: "10px" }}
                    min="1"
                    />
                    <Button
                    variant="danger"
                    onClick={() => removeIngredientField(index)}
                    >
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
    );
};

export default DishPopup;