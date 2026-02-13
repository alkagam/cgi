import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/global.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    // Limpiar error al escribir
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!credentials.identifier || !credentials.password) {
      setError("Por favor ingresa tus credenciales.");
      return;
    }

    // Simulamos que obtenemos datos del usuario
    const userData = {
      username: credentials.identifier,
      fullName: "Usuario Conectado", // En una app real vendría de la BD
      bio: "Amante del código y el diseño retro."
    };
    login(userData);
    navigate("/feed");
  };

  return (
    <div className="login-container">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div className="skull-icon" style={{ fontSize: "2.5rem" }}>☠</div>
        <h2 className="logo" style={{ display: "inline-block", transform: "rotate(-2deg)", fontSize: "2rem" }}>
          ACCESO
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="sketch-box">
        {error && (
          <div style={{ 
            color: "var(--blood)", 
            border: "1px dashed var(--blood)", 
            padding: "10px", 
            marginBottom: "15px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "0.9rem"
          }}>
            {error}
          </div>
        )}

        <div className="input-group">
          <label>Usuario o Correo</label>
          <input 
            type="text" name="identifier" placeholder="Ej. @saulm"
            value={credentials.identifier} onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input 
            type="password" name="password" placeholder="••••••••"
            value={credentials.password} onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-login">ENTRAR</button>

        <div className="links">
          <Link to="/registro">Crear una cuenta nueva</Link>
          <br />
          <Link to="#" style={{ opacity: 0.6, fontSize: "0.8rem" }}>¿Olvidaste tu contraseña?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;