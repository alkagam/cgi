import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  // Definimos si estamos en una ruta pública (Inicio, Login, Registro)
  const isPublic = ["/", "/login", "/registro"].includes(location.pathname);

  return (
    <nav className="navbar-sketch">
      <div className="nav-logo">
        {isPublic ? (
          <Link to="/">PLASTIC MEMORY ☠</Link>
        ) : (
          <span style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: "bold", fontSize: "1.5rem", color: "#5e0000", cursor: "default" }}>PLASTIC MEMORY ☠</span>
        )}
      </div>
      <ul className="nav-links">
        {isPublic ? (
          <>
            <li><Link to="/">INICIO</Link></li>
            <li><Link to="/login">INICIAR SESIÓN</Link></li>
            <li><Link to="/registro" className="nav-btn">REGISTRARSE</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/feed">COMUNIDAD</Link></li>
            <li><Link to="/perfil">PERFIL</Link></li>
            <li><Link to="/" onClick={logout} style={{ color: "var(--blood)" }}>CERRAR SESIÓN</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;