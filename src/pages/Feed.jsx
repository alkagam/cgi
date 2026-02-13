import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/global.css";

function Feed() {
  const { user, posts, addPost, toggleLike, deletePost } = useAuth();
  const [newPost, setNewPost] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    addPost(newPost);
    setNewPost("");
  };

  return (
    <div className="container">
      {/* Sidebar Izquierda */}
      <aside>
        <div className="sketch-box" style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{ width: "80px", height: "80px", background: "#000", borderRadius: "50%", margin: "0 auto 10px", border: "2px solid var(--ink)" }}></div>
            <h3 style={{ margin: "10px 0", overflowWrap: "break-word", wordWrap: "break-word", fontSize: "1.2rem", lineHeight: "1.3" }}>{user?.username || "Usuario_01"}</h3>
        </div>
        <nav style={{ display: "block", border: "none", padding: 0, background: "transparent", boxShadow: "none" }}>
            <Link to="/pesadillas" className="menu-item">Pesadillas</Link>
            <Link to="/mensajes" className="menu-item">Mensajes</Link>
        </nav>
      </aside>

      {/* Feed Central */}
      <main>
        <div className="sketch-box" style={{ marginBottom: "40px" }}>
          <form onSubmit={handlePost}>
            <textarea
              style={{ width: "100%", background: "transparent", border: "none", outline: "none", fontFamily: "inherit" }}
              rows="3"
              placeholder="¿Qué ves en la oscuridad?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            ></textarea>
            <button type="submit" style={{ background: "var(--ink)", color: "var(--paper)", border: "none", padding: "10px 20px", fontWeight: "bold", cursor: "pointer", marginTop: "10px", width: "100%" }}>
              PUBLICAR
            </button>
          </form>
        </div>

        {posts.map((post) => (
          <div key={post.id} className="sketch-box post">
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px", justifyContent: "space-between" }}>
              <strong>{post.name}</strong>
              {post.isMine && (
                <button onClick={() => deletePost(post.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--blood)" }}>
                  <i className="fas fa-trash"></i>
                </button>
              )}
            </div>
            <div className="post-img">
              <i className="fas fa-skull" style={{ fontSize: "5rem", opacity: 0.5 }}></i>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
              <div className="post-actions">
                <i 
                  className={post.liked ? "fas fa-heart" : "far fa-heart"} 
                  onClick={() => toggleLike(post.id)}
                  style={{ color: post.liked ? "var(--blood)" : "inherit" }}
                ></i>
                <i className="far fa-comment"></i>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Sidebar Derecha */}
      <aside>
        <div className="sketch-box">
          <h3>Tendencias</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px", borderBottom: "1px dashed var(--ink)" }}>#Surrealismo</li>
            <li style={{ marginBottom: "10px", borderBottom: "1px dashed var(--ink)" }}>#TintaNegra</li>
            <li style={{ marginBottom: "10px", borderBottom: "1px dashed var(--ink)" }}>#PlasticDreams</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Feed;
