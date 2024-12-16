import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from "@services/auth.service.js";
import "@styles/navbar.css";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("usuario")) || "";
  const userRole = user?.rol;
  const [menuOpen, setMenuOpen] = useState(false);

  // Add effect to close sidebar on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const logoutSubmit = () => {
    try {
      logout();
      navigate("/auth");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <div className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (
          <i className="fas fa-times" id="cancel"></i>
        ) : (
          <i className="fas fa-bars" id="btn"></i>
        )}
      </div>

      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <header>Menú</header>

        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fas fa-home"></i>
          <span>Inicio</span>
        </NavLink>

        <NavLink
          to="/ingredients"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fas fa-carrot"></i>
          <span>Ingredientes</span>
        </NavLink>

        {(userRole === "administrador" || userRole === "bosschef") && (
          <NavLink
            to="/dishes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fas fa-utensils"></i>
            <span>Platos</span>
          </NavLink>
        )}

        {(userRole === "administrador" || userRole === "waiter") && (
          <NavLink
            to="/waiter"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa-solid fa-wine-bottle"></i>
            <span>Garzones</span>
          </NavLink>
        )}

        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-solid fa-list"></i>
          <span>Órdenes</span>
        </NavLink>

        <NavLink
          to="/daily-report"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fas fa-chart-line"></i>
          <span>Reportes</span>
        </NavLink>

        {userRole === "administrador" && (
          <NavLink
            to="/users"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fas fa-users"></i>
            <span>Usuarios</span>
          </NavLink>
        )}

        {userRole === "administrador" && (
          <NavLink
            to="/tables"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa-solid fa-table"></i>
            <span>Mesas</span>
          </NavLink>
        )}

        <button onClick={logoutSubmit}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;