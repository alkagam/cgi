import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Perfil() {
  const { user, posts } = useAuth();

  if (!user) {
    return (
      <div className="container" style={{ textAlign: "center", display: "block" }}>
        <h2>No has iniciado sesión</h2>
        <Link to="/login" className="btn">Ir al Login</Link>
      </div>
    );
  }

  // Filtramos los posts que pertenecen al usuario actual
  const myPosts = posts.filter(p => p.username === user.username);

  return (
    <div className="container" style={{ display: "block", maxWidth: "800px" }}>
      <div className="sketch-box" style={{ textAlign: "center", marginBottom: "40px" }}>
        <div className="post-avatar" style={{ width: "100px", height: "100px", margin: "0 auto 20px" }}></div>
        <h2 style={{ fontSize: "2rem", margin: "10px 0" }}>{user.fullName}</h2>
        <p style={{ opacity: 0.7, fontWeight: "bold" }}>{user.username}</p>
        <p style={{ margin: "20px 0", fontStyle: "italic" }}>"{user.bio}"</p>

        <div style={{ display: "flex", justifyContent: "center", gap: "40px", borderTop: "2px solid var(--ink)", paddingTop: "20px" }}>
          <span><strong>{myPosts.length}</strong> Posts</span>
          <span><strong>142</strong> Seguidores</span>
          <span><strong>89</strong> Siguiendo</span>
        </div>
      </div>

      <h3 style={{ borderBottom: "2px solid var(--ink)", paddingBottom: "10px" }}>MIS PUBLICACIONES</h3>
      
      <div className="posts-feed">
        {myPosts.length > 0 ? myPosts.map((post) => (
          <div key={post.id} className="sketch-box post-item" style={{ marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <div className="post-content">{post.content}</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.6, marginTop: "10px" }}>
                ❤️ {post.likes} · 📅 {post.time}
              </div>
            </div>
          </div>
        )) : <p>Aún no has publicado nada.</p>}
      </div>
    </div>
  );
}

export default Perfil;
