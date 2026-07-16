import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Spinner, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FiUserPlus, FiMail, FiLock, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { StyledButton } from "../components/common/StyledButton";
import "./Auth.css";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!nombre || !email || !password || !confirmPassword) {
      setError("Completá todos los campos.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      await register(email, password, nombre);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="auth-page">
      <Helmet>
        <title>Crear cuenta — Forma</title>
        <meta
          name="description"
          content="Creá tu cuenta en Forma para guardar tus compras y acceder a tu perfil."
        />
      </Helmet>

      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={7} lg={5}>
          <div className="auth-card">
            <h1 className="auth-card__title">
              <FiUserPlus /> Crear cuenta
            </h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="registerNombre">
                <Form.Label>
                  <FiUser /> Nombre
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>
                  <FiMail /> Email
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label>
                  <FiLock /> Contraseña
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="registerConfirmPassword">
                <Form.Label>
                  <FiLock /> Confirmar contraseña
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repetí tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>

              <StyledButton type="submit" disabled={loading} $fullWidth>
                {loading ? <Spinner size="sm" animation="border" /> : "Crear cuenta"}
              </StyledButton>
            </Form>

            <p className="auth-card__switch">
              ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
