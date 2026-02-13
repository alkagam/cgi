import { Link } from "react-router-dom";
import "../styles/global.css";

function Mensajes() {
  const messages = [
    { id: 1, user: "Plastic Bot", preview: "Bienvenido al sistema...", time: "10:00 AM", unread: true },
    { id: 2, user: "DarkSoul", preview: "¿Viste lo que publiqué?", time: "Ayer", unread: false },
    { id: 3, user: "Dreamer_99", preview: "Necesito ayuda con mi cuenta.", time: "Lun", unread: false }
  ];

  return (
    <div className="container" style={{ gridTemplateColumns: "300px 1fr" }}>
      <aside className="sketch-box">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid var(--ink)", paddingBottom: "10px", marginBottom: "10px" }}>
            <h3 style={{ margin: 0 }}>CHATS</h3>
            <Link to="/feed" style={{ textDecoration: "none", fontSize: "1.2rem" }}>🔙</Link>
        </div>
        {messages.map(msg => (
          <div key={msg.id} style={{ 
            padding: "15px", 
            borderBottom: "1px solid rgba(0,0,0,0.1)", 
            cursor: "pointer",
            backgroundColor: msg.unread ? "rgba(0,0,0,0.05)" : "transparent",
            borderLeft: msg.unread ? "4px solid var(--blood)" : "4px solid transparent"
          }}>
            <div style={{ fontWeight: "bold", display: "flex", justifyContent: "space-between" }}>
              {msg.user}
              <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>{msg.time}</span>
            </div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: "5px" }}>
              {msg.preview}
            </div>
          </div>
        ))}
      </aside>

      <main className="sketch-box" style={{ display: "flex", flexDirection: "column", height: "600px", justifyContent: "space-between" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.5, fontStyle: "italic", flexDirection: "column" }}>
          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>✉️</div>
          <p>Selecciona un mensaje para leer</p>
        </div>
      </main>
    </div>
  );
}

export default Mensajes;