import "./Footer.css";

const team = [
  {
    nombre: "Valentina Reyes",
    rol: "Directora Creativa",
    bio: "Diseñadora de interiores con 12 años de experiencia en proyectos residenciales y comerciales en América Latina.",
    iniciales: "VR",
  },
  {
    nombre: "Marcos Delgado",
    rol: "Curador de Productos",
    bio: "Especialista en diseño escandinavo y minimalismo. Viaja dos veces al año a ferias internacionales para seleccionar las mejores piezas.",
    iniciales: "MD",
  },
  {
    nombre: "Sofía Ibáñez",
    rol: "Atención al Cliente",
    bio: "Apasionada por conectar a las personas con los objetos que transforman sus espacios. Asesoramiento personalizado.",
    iniciales: "SI",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="logo-mark-footer">◆</span>
            <span>FORMA</span>
          </div>
          <p className="footer__tagline">
            Objetos con alma para espacios con carácter.
          </p>
          <p className="footer__about">
            Somos una tienda especializada en diseño de interiores y mobiliario
            de autor. Cada pieza es seleccionada por su calidad, funcionalidad y
            belleza. Fundada en Buenos Aires en 2018.
          </p>
          <div className="footer__contact">
            <span>📍 Palermo, Buenos Aires</span>
            <span>✉ hola@formahogar.com</span>
            <span>📞 +54 11 4321-0000</span>
          </div>
        </div>

        <div className="footer__team-section">
          <h3 className="footer__section-title">Nuestro Equipo</h3>
          <div className="footer__team">
            {team.map((persona) => (
              <div className="team-card" key={persona.nombre}>
                <div className="team-card__avatar">{persona.iniciales}</div>
                <div className="team-card__info">
                  <strong className="team-card__name">{persona.nombre}</strong>
                  <span className="team-card__rol">{persona.rol}</span>
                  <p className="team-card__bio">{persona.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© 2026 Forma Hogar. Todos los derechos reservados.</span>
        <span>Diseñado con intención.</span>
      </div>
    </footer>
  );
};

export default Footer;
