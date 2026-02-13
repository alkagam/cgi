import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css";

function Registro() {
  const navigate = useNavigate();
  
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    paterno: "",
    materno: "",
    fecha_nacimiento: "",
    edad: "",
    sexo: "",
    rol: "Energetico",
    email: "",
    tel: "",
    social: "",
    zona: "",
    ingles: 0,
    fecha: "", // Fecha de audición
    transporte: "No",
    dias: [],
    interfaz: "No",
    equipo: [],
    inspiracion: "",
    bio: ""
  });

  // Estados para validaciones y UI
  const [ageStatus, setAgeStatus] = useState("");
  const [ageStatusColor, setAgeStatusColor] = useState("var(--ink)");
  const [isFormValid, setIsFormValid] = useState(false);
  const [minDate, setMinDate] = useState("");

  // Inicializar fecha mínima de audición (+2 días)
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    const mDate = d.toISOString().split('T')[0];
    setMinDate(mDate);
    setFormData(prev => ({ ...prev, fecha: mDate }));
  }, []);

  // Efecto para validar el formulario en tiempo real
  useEffect(() => {
    const vNombre = formData.nombre.length > 2;
    const vPaterno = formData.paterno.length > 2;
    const vMaterno = formData.materno.length > 2;
    const vEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const vTel = formData.tel.length === 10;
    // Validar que la edad calculada sea válida (no vacía y no menor a 15 según lógica original)
    const vEdad = formData.edad !== "" && formData.edad !== "NP"; 
    const vZona = formData.zona !== "";

    setIsFormValid(vNombre && vPaterno && vMaterno && vEmail && vTel && vZona && vEdad);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validaciones de entrada (Solo letras o Solo números)
    if (["nombre", "paterno", "materno"].includes(name)) {
       if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }
    if (name === "tel") {
       if (!/^[0-9]*$/.test(value)) return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "fecha_nacimiento") {
        calculateAge(value);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => {
      const list = prev[name];
      if (checked) {
        return { ...prev, [name]: [...list, value] };
      } else {
        return { ...prev, [name]: list.filter(item => item !== value) };
      }
    });
  };

  const calculateAge = (dobString) => {
    if (!dobString) return;
    const dob = new Date(dobString);
    const today = new Date();
    let val = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        val--;
    }

    let status = "";
    let color = "var(--ink)";
    let finalAge = val;

    if (val > 50) {
        status = `Edad Calculada: ${val} años (LEGADO)`;
        finalAge = "51+";
    } else if (val < 15) {
        status = `Edad Calculada: ${val} años (NP)`;
        color = "var(--blood)";
        finalAge = "NP"; // No permitido
    } else {
        status = `Edad Calculada: ${val} años`;
    }

    setAgeStatus(status);
    setAgeStatusColor(color);
    setFormData(prev => ({ ...prev, edad: finalAge }));
  };

  const getEnglishLevelLabel = (val) => {
    const levels = ["A1", "A1+", "A2", "A2+", "B1", "B1+", "B2", "B2+", "C1", "C1+", "C2"];
    const index = Math.min(Math.floor(val / 10), levels.length - 1);
    return `Nivel de Inglés: ${levels[index]} (${val}%)`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    console.log("Datos de registro:", formData);
    alert("¡Sincronización de Nodo Exitosa!");
    navigate("/feed");
  };

  // Fecha máxima para nacimiento (Hoy)
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="register-container">
      <div className="sketch-box">
        <div style={{ textAlign: "center", borderBottom: "2px solid var(--ink)", paddingBottom: "20px", marginBottom: "30px" }}>
            <h1 style={{ margin: 0, textTransform: "uppercase", letterSpacing: "3px" }}>Sincronización</h1>
            <p style={{ fontStyle: "italic", marginTop: "10px" }}>🦇☠️ Únete a la Simulación Sonora ☠️🦇</p>
            <div style={{ fontSize: "0.7rem", letterSpacing: "2px", marginTop: "5px", color: "var(--blood)", fontWeight: "bold" }}>
                [ STATUS: VALIDANDO NODOS DE FRECUENCIA ]
            </div>
        </div>

        <form onSubmit={handleSubmit}>
            
            <span className="section-tag">I. Identidad & Perfil</span>
            <div className="form-grid">
                <div className="input-group">
                    <label>Nombre</label>
                    <input type="text" name="nombre" placeholder="Nombre..." value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Apellido Paterno</label>
                    <input type="text" name="paterno" placeholder="Paterno..." value={formData.paterno} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Apellido Materno</label>
                    <input type="text" name="materno" placeholder="Materno..." value={formData.materno} onChange={handleChange} required />
                </div>
                
                <div className="input-group">
                    <label>Fecha de Nacimiento</label>
                    <input type="date" name="fecha_nacimiento" max={todayStr} value={formData.fecha_nacimiento} onChange={handleChange} required />
                    <div style={{ fontSize: "0.7rem", marginTop: "5px", fontWeight: "bold", color: ageStatusColor }}>{ageStatus}</div>
                </div>

                <div className="input-group">
                    <label>Sexo</label>
                    <select name="sexo" value={formData.sexo} onChange={handleChange} required>
                        <option value="">- Seleccionar -</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="X">No Binario</option>
                    </select>
                </div>
                <div className="input-group">
                    <label>Rol en Escena</label>
                    <select name="rol" value={formData.rol} onChange={handleChange}>
                        <option value="Energetico">Energético</option>
                        <option value="Serio">Serio / Shoegaze</option>
                        <option value="Frontman">Frontman / Líder</option>
                        <option value="Soporte">Soporte Rítmico</option>
                    </select>
                </div>
            </div>

            <span className="section-tag">II. Enlaces de Comunicación</span>
            <div className="form-grid">
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="user@domain.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Teléfono (10 Dig.)</label>
                    <input type="text" name="tel" maxLength="10" placeholder="55..." value={formData.tel} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Instagram</label>
                    <input type="text" name="social" placeholder="@usuario" value={formData.social} onChange={handleChange} />
                </div>
            </div>

            <span className="section-tag">III. Geografía & Logística</span>
            <div className="form-grid">
                <div className="input-group">
                    <label>Zona Metropolitana</label>
                    <select name="zona" value={formData.zona} onChange={handleChange} required>
                        <option value="">- Seleccionar -</option>
                        <option value="Norte">Norte</option>
                        <option value="Sur">Sur</option>
                        <option value="Este">Este</option>
                        <option value="Oeste">Oeste</option>
                        <option value="Centro">Centro</option>
                    </select>
                </div>
                <div className="input-group">
                    <label>{getEnglishLevelLabel(formData.ingles)}</label>
                    <input type="range" name="ingles" min="0" max="100" step="10" value={formData.ingles} onChange={handleChange} style={{ width: "100%" }} />
                </div>
                <div className="input-group">
                    <label>Fecha de Audición</label>
                    <input type="date" name="fecha" min={minDate} value={formData.fecha} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>¿Vehículo Propio?</label>
                    <select name="transporte" value={formData.transporte} onChange={handleChange}>
                        <option value="No">No</option>
                        <option value="Si">Sí, Auto</option>
                        <option value="Moto">Sí, Moto</option>
                    </select>
                </div>
                <div className="input-group" style={{ gridColumn: "span 2" }}>
                    <label>Disponibilidad de Ensayo</label>
                    <div className="checkbox-group">
                        {["L", "M", "Mi", "J", "V", "S", "D"].map(d => (
                            <label key={d}><input type="checkbox" name="dias" value={d} checked={formData.dias.includes(d)} onChange={handleCheckboxChange} /> {d}</label>
                        ))}
                    </div>
                </div>
            </div>

            <span className="section-tag">IV. Atributos de Hardware (Instrumentos)</span>
            <div className="input-group" style={{ marginBottom: "15px" }}>
                <label style={{ display: "inline-block", marginRight: "15px" }}>¿Interfaz de Audio?</label>
                <label style={{ display: "inline-block", marginRight: "10px" }}>
                    <input type="radio" name="interfaz" value="Si" checked={formData.interfaz === "Si"} onChange={handleChange} /> Sí
                </label>
                <label style={{ display: "inline-block" }}>
                    <input type="radio" name="interfaz" value="No" checked={formData.interfaz === "No"} onChange={handleChange} /> No
                </label>
            </div>
            <div className="checkbox-group">
                {["Guitarra", "Bajo", "Bateria", "Voz", "Teclado", "Doble Pedal"].map(item => (
                    <label key={item}><input type="checkbox" name="equipo" value={item} checked={formData.equipo.includes(item)} onChange={handleCheckboxChange} /> {item}</label>
                ))}
            </div>

            <span className="section-tag">V. Multimedia & Notas</span>
            <div className="form-grid">
                <div className="input-group">
                    <label>Bandas de Inspiración</label>
                    <textarea name="inspiracion" rows="3" placeholder="Tus influencias..." value={formData.inspiracion} onChange={handleChange}></textarea>
                </div>
                <div className="input-group">
                    <label>Cuéntame de ti</label>
                    <textarea name="bio" rows="3" placeholder="Breve biografía..." value={formData.bio} onChange={handleChange}></textarea>
                </div>
            </div>

            <button type="submit" className="btn-login" disabled={!isFormValid}>Sincronizar Nodo</button>
        </form>
      </div>
      
      <footer style={{ marginTop: "40px", textAlign: "center", fontSize: "0.7rem", borderTop: "3px solid var(--blood)", paddingTop: "20px" }}>
        <p>SISTEMAS DISTRIBUIDOS - ESIME CULHUACÁN - 2026</p>
        <p>SAÚL ANDRAWI LÓPEZ MARTÍNEZ</p>
      </footer>
    </div>
  );
}

export default Registro;