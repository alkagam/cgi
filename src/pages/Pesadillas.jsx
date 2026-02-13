import { Link } from "react-router-dom";
import "../styles/global.css";

function Pesadillas() {
  const forums = [
    { id: 1, title: "Parálisis del Sueño", posts: 342, lastActive: "Hace 5m" },
    { id: 2, title: "Sueños Lúcidos", posts: 1205, lastActive: "Hace 1h" },
    { id: 3, title: "Pesadillas Recurrentes", posts: 89, lastActive: "Hace 2d" },
    { id: 4, title: "Interpretación Onírica", posts: 567, lastActive: "Hace 10m" },
    { id: 5, title: "Entidades de la Sombra", posts: 666, lastActive: "Hace 3h" }
  ];

  return (
    <div className="container">
      <div className="sketch-box" style={{ width: "100%", gridColumn: "1 / -1" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid var(--ink)", paddingBottom: "10px", marginBottom: "20px" }}>
            <h2 style={{ margin: 0 }}>FOROS DE PESADILLAS</h2>
            <Link to="/feed" className="btn" style={{ fontSize: "0.8rem", padding: "5px 10px" }}>Volver al Feed</Link>
        </div>
        
        <div className="forum-list">
          {forums.map(forum => (
            <div key={forum.id} style={{ 
              padding: "20px", 
              borderBottom: "1px dashed var(--ink)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              transition: "background 0.2s"
            }} className="menu-item">
              <div>
                <h3 style={{ margin: "0 0 5px 0", fontSize: "1.2rem" }}>📂 {forum.title}</h3>
                <span style={{ fontSize: "0.9rem", opacity: 0.7 }}>{forum.posts} discusiones abiertas</span>
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: "bold", color: "var(--blood)" }}>{forum.lastActive}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pesadillas;