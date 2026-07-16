import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FiUser, FiMail, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { StyledButton } from "../components/common/StyledButton";
import "./Auth.css";

const Perfil = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Container className="auth-page">
      <Helmet>
        <title>Mi perfil — Forma</title>
      </Helmet>

      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={7} lg={5}>
          <div className="auth-card">
            <h1 className="auth-card__title">
              <FiUser /> Mi perfil
            </h1>

            <p>
              <strong>Nombre:</strong> {currentUser?.displayName || "—"}
            </p>
            <p>
              <FiMail /> {currentUser?.email}
            </p>

            <StyledButton $variant="danger" onClick={handleLogout} $fullWidth>
              <FiLogOut /> Cerrar sesión
            </StyledButton>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;
