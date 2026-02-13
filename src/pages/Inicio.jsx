import { Link } from "react-router-dom";
import "../styles/global.css";

function Inicio() {
  return (
    <div className="container" style={{ display: "block", textAlign: "center" }}>
      <section className="hero-section">
        <div className="skull-icon">☠</div>
        <h1 className="logo hero-title" style={{ display: "inline-block", transform: "rotate(-2deg)" }}>
          PLASTIC MEMORY
        </h1>
        <p style={{ fontSize: "1.5rem", margin: "30px 0", fontWeight: "bold" }}>
          "Los recuerdos son de plástico, pero los sentimientos son reales."
        </p>
        <p style={{ fontSize: "1.1rem", marginBottom: "40px", opacity: 0.8 }}>
          Una red social minimalista para compartir lo que realmente importa.
          Sin algoritmos, solo personas.
        </p>
        
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <Link to="/login" className="btn" style={{ fontSize: "1.2rem", padding: "15px 40px" }}>
            Iniciar Sesión
          </Link>
          <Link to="/registro" className="btn" style={{ fontSize: "1.2rem", padding: "15px 40px", background: "transparent", color: "var(--ink)" }}>
            Registrarse
          </Link>
        </div>
      </section>

      <div className="landing-container">
        <div className="sketch-box">
          <h3>📝 Expresa</h3>
          <p>Publica tus pensamientos en un lienzo digital diseñado para la creatividad.</p>
        </div>
        <div className="sketch-box">
          <h3>🤝 Conecta</h3>
          <p>Sigue a amigos y descubre mentes afines en un entorno seguro.</p>
        </div>
        <div className="sketch-box">
          <h3>🔒 Privacidad</h3>
          <p>Tus datos te pertenecen. Navega sin rastreadores invasivos.</p>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
