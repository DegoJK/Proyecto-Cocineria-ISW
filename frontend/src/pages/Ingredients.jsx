import '@styles/ingredients.css';
import useGetIngredients from '@hooks/ingredient/getIngredients.jsx';
import useDeleteIngredient from '@hooks/ingredient/deleteIngredient';

const Ingredients = () => {
    const { ingredients, fetchIngredients } = useGetIngredients();
    const { handleDelete } = useDeleteIngredient(fetchIngredients);

    return (
        <div className="ingredients-container">
            <h1 className="title">Ingredientes</h1>
            {ingredients?.length > 0 ? (
                <ul className="ingredients-list">
                    {ingredients.map((ingredient) => (
                        <li key={ingredient.id} className="ingredient-item">
                            <p><strong>Nombre:</strong> {ingredient.nombre}</p>
                            <p><strong>Tipo:</strong> {ingredient.tipo}</p>
                            <p><strong>Cantidad:</strong> {ingredient.cantidad}</p>
                            <button className="delete-button" onClick={() => handleDelete(ingredient.id)}>
                                Eliminar
                            </button>
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