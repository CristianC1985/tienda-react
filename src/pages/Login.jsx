import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Spinner, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { StyledButton } from "../components/common/StyledButton";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Completá email y contraseña.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="auth-page">
      <Helmet>
        <title>Iniciar sesión — Forma</title>
        <meta
          name="description"
          content="Iniciá sesión en Forma para acceder a tu perfil y al panel de gestión."
        />
      </Helmet>

      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={7} lg={5}>
          <div className="auth-card">
            <h1 className="auth-card__title">
              <FiLogIn /> Iniciar sesión
            </h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="loginEmail">
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

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>
                  <FiLock /> Contraseña
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </Form.Group>

              <StyledButton type="submit" disabled={loading} $fullWidth>
                {loading ? <Spinner size="sm" animation="border" /> : "Ingresar"}
              </StyledButton>
            </Form>

            <p className="auth-card__switch">
              ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
