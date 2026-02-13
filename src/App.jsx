import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Perfil from "./pages/Perfil";
import Feed from "./pages/Feed";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Pesadillas from "./pages/Pesadillas";
import Mensajes from "./pages/Mensajes";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pesadillas" element={<Pesadillas />} />
          <Route path="/mensajes" element={<Mensajes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
