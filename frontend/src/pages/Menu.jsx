import "@styles/menu.css";
import IngredientSelector from "../components/IngredientSelector";

const Menu = () => {
  return (
    <div className="menu-container">
      <header className="menu-title">
        <h1>Menu</h1>
        <button className="menu-add-button">Agregar platillos</button>
      </header>

      <div className="menu-tables-container">
        <ul className="menu-menu">
          <IngredientSelector />
        </ul>
      </div>
    </div>
  );
};

export default Menu;
