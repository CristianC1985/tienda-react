import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Helmet>
        <title>Forma — Diseño de Interiores</title>
        <meta
          name="description"
          content="Forma: mobiliario y decoración de autor seleccionados por su diseño, calidad y carácter. Envíos a todo el país."
        />
      </Helmet>

      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Diseño de interiores · Buenos Aires</p>
          <h1 className="hero__title">
            Objetos que<br />
            <em>transforman</em><br />
            espacios
          </h1>
          <p className="hero__sub">
            Mobiliario y decoración de autor seleccionados por su diseño,
            calidad y carácter. Cada pieza cuenta una historia.
          </p>
          <Link to="/productos" className="hero__cta">
            Explorar catálogo
          </Link>
        </div>
        <div className="hero__visual">
          <div className="hero__image-wrap">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
              alt="Interior design"
              className="hero__image"
            />
          </div>
          <div className="hero__badge">
            <span className="hero__badge-num">+120</span>
            <span className="hero__badge-label">piezas únicas</span>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features__inner">
          {[
            { icon: "◇", title: "Curaduría experta", desc: "Cada producto es elegido con criterio de diseño y calidad artesanal." },
            { icon: "○", title: "Envío a todo el país", desc: "Entrega segura con embalaje especial para proteger tus piezas." },
            { icon: "△", title: "Asesoramiento gratis", desc: "Nuestro equipo te ayuda a elegir lo ideal para tu espacio." },
          ].map((f) => (
            <div className="feature" key={f.title}>
              <span className="feature__icon">{f.icon}</span>
              <h3 className="feature__title">{f.title}</h3>
              <p className="feature__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
