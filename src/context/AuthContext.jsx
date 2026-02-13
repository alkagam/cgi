import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Estado del usuario logueado (null si no hay nadie)
  const [user, setUser] = useState(null);

  // Base de datos simulada de posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Plastic Bot",
      username: "@plasticbot",
      content: "¡Bienvenidos a Plastic Memory! Aquí tus recuerdos perduran para siempre.",
      time: "2h",
      likes: 120,
      comments: 15,
      retweets: 32,
      liked: false
    },
    {
      id: 2,
      name: "Saul",
      username: "@saulm",
      content: "Trabajando en la nueva interfaz. ¿Qué les parece este estilo tipo red social?",
      time: "4h",
      likes: 45,
      comments: 5,
      retweets: 2,
      liked: false
    }
  ]);

  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
  };

  // Función para crear un post
  const addPost = (content) => {
    if (!user) return;
    const newPost = {
      id: Date.now(),
      name: user.fullName,
      username: user.username,
      content: content,
      time: "Ahora",
      likes: 0,
      comments: 0,
      retweets: 0,
      liked: false,
      isMine: true // Marca para saber que es nuestro
    };
    setPosts([newPost, ...posts]);
  };

  // Función para dar Like
  const toggleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
        : post
    ));
  };

  // Función para borrar post
  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <AuthContext.Provider value={{ user, posts, login, logout, addPost, toggleLike, deletePost }}>
      {children}
    </AuthContext.Provider>
  );
};