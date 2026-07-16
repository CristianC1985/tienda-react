import { Link, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import CartWidget from "../cart/CartWidget";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Navbar expand="md" className="header" collapseOnSelect>
      <Container fluid className="header__inner">
        <Navbar.Brand as={Link} to="/" className="header__logo">
          <span className="logo-mark">◆</span>
          <span className="logo-text">FORMA</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="header__nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"}>
              Inicio
            </NavLink>
            <NavLink to="/productos" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"}>
              Productos
            </NavLink>
            {currentUser && (
              <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"}>
                <FiSettings /> Gestión
              </NavLink>
            )}
          </Nav>

          <Nav className="header__actions">
            {currentUser ? (
              <>
                <NavLink to="/perfil" className="nav-link icon-link" title="Mi perfil">
                  <FiUser />
                </NavLink>
                <button onClick={handleLogout} className="icon-link icon-link--btn" title="Cerrar sesión">
                  <FiLogOut />
                </button>
              </>
            ) : (
              <NavLink to="/login" className="nav-link">
                Ingresar
              </NavLink>
            )}
            <Link to="/carrito" className="cart-link">
              <CartWidget />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
