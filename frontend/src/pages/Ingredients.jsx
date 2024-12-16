import '@styles/ingredients.css';
import useGetIngredients from '@hooks/ingredient/getIngredients.jsx';
import useDeleteIngredient from '@hooks/ingredient/deleteIngredient';
import useCreateIngredient from '@hooks/ingredient/createIngredient.jsx';
import useUpdateIngredient from '@hooks/ingredient/updateIngredient.jsx';
import { useState } from 'react';

const Ingredients = () => {

    const userData = JSON.parse(sessionStorage.getItem('usuario'));
    const userRole = userData ? userData.rol : null;


    const { ingredients, fetchIngredients } = useGetIngredients();
    const { handleDelete } = useDeleteIngredient(fetchIngredients);
    const { handleCreate } = useCreateIngredient(fetchIngredients);
    const { handleUpdate } = useUpdateIngredient(fetchIngredients);

    const [showForm, setShowForm] = useState(false);
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [editingIngredient, setEditingIngredient] = useState(null);

    const handleShowForm = () => {
        setNombre('');
        setTipo('');
        setCantidad('');
        setEditingIngredient(null);
        setShowForm(true);
    };

    const handleEditClick = (ingredient) => {
        setNombre(ingredient.nombre);
        setTipo(ingredient.tipo);
        setCantidad(ingredient.cantidad.toString());
        setEditingIngredient(ingredient);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingIngredient(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            nombre,
            tipo,
            cantidad: parseInt(cantidad, 10),
        };
        if (editingIngredient) {
            await handleUpdate(editingIngredient.id, data);
        } else {
            await handleCreate(data);
        }
        await fetchIngredients();
        handleCloseForm();
    };

    


    return (
        <div className="ingredients-container">
            <h1 className="title">Ingredientes</h1>
            {(userRole === "administrador") && (
        <button onClick={handleShowForm} className="add-button">Agregar Ingrediente</button>
)}
            {showForm && (
                <form onSubmit={handleSubmit} className="ingredient-form">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                        min="1"
                    />
                    <button type="submit">{editingIngredient ? 'Actualizar' : 'Guardar'}</button>
                    <button type="button" onClick={handleCloseForm}>Cancelar</button>
                </form>
            )}
            {ingredients?.length > 0 ? (
                <ul className="ingredients-list">
                    {ingredients.map((ingredient) => (
                        <li key={ingredient.id} className="ingredient-item">
                        <p><strong>Nombre:</strong> {ingredient.nombre}</p>
                        <p><strong>Tipo:</strong> {ingredient.tipo}</p>
                        <p><strong>Cantidad:</strong> {ingredient.cantidad}</p>
                        <div className="button-container">
                            
                            
                            
                        {(userRole === "administrador") && (
                            <button className="delete-button" onClick={() => handleDelete(ingredient.id)}>
                                Eliminar
                            </button>
                        )}
                        {(userRole === "administrador") && (
                            <button className="edit-button" onClick={() => handleEditClick(ingredient)}>
                                Editar
                            </button>
                        )}
                        </div>
                    </li>
                    
                    ))}
                </ul>
            ) : (
                <p className="no-ingredients">No hay ingredientes</p>
            )}
        </div>
    );
};

export default Ingredients;