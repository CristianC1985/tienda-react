import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

const NotFound = () => (
  <Container className="text-center" style={{ padding: "5rem 1rem" }}>
    <Helmet>
      <title>Página no encontrada — Forma</title>
    </Helmet>
    <h1>404</h1>
    <p>La página que buscás no existe.</p>
    <Link to="/">← Volver al inicio</Link>
  </Container>
);

export default NotFound;
