import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Alert, Modal } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FiPlus, FiEdit2, FiTrash2, FiPackage } from "react-icons/fi";
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../services/productosService";
import ProductForm from "../components/admin/ProductForm";
import ConfirmModal from "../components/admin/ConfirmModal";
import { StyledButton } from "../components/common/StyledButton";
import "./Admin.css";

const formatPrice = (precio) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(precio);

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const [productoEliminar, setProductoEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const cargarProductos = () => {
    setLoading(true);
    setError(null);
    getProductos()
      .then(setProductos)
      .catch(() => setError("No pudimos cargar los productos. Reintentá más tarde."))
      .finally(() => setLoading(false));
  };

  useEffect(cargarProductos, []);

  const abrirCrear = () => {
    setProductoEditar(null);
    setActionError(null);
    setShowForm(true);
  };

  const abrirEditar = (producto) => {
    setProductoEditar(producto);
    setActionError(null);
    setShowForm(true);
  };

  const handleSubmit = async (datos) => {
    setGuardando(true);
    setActionError(null);
    try {
      if (productoEditar) {
        const actualizado = await actualizarProducto(productoEditar.id, datos);
        setProductos((prev) =>
          prev.map((p) => (p.id === productoEditar.id ? { ...p, ...actualizado } : p))
        );
      } else {
        const nuevo = await crearProducto(datos);
        setProductos((prev) => [...prev, nuevo]);
      }
      setShowForm(false);
    } catch (err) {
      setActionError("No se pudo guardar el producto. Intentá nuevamente.");
    } finally {
      setGuardando(false);
    }
  };

  const confirmarEliminar = async () => {
    if (!productoEliminar) return;
    setEliminando(true);
    try {
      await eliminarProducto(productoEliminar.id);
      setProductos((prev) => prev.filter((p) => p.id !== productoEliminar.id));
      setProductoEliminar(null);
    } catch (err) {
      setActionError("No se pudo eliminar el producto. Intentá nuevamente.");
    } finally {
      setEliminando(false);
    }
  };

  return (
    <Container className="admin-page">
      <Helmet>
        <title>Panel de gestión — Forma</title>
        <meta name="description" content="Panel de administración de productos de Forma." />
      </Helmet>

      <Row className="align-items-center mb-4">
        <Col>
          <h1 className="admin-page__title">
            <FiPackage /> Gestión de productos
          </h1>
        </Col>
        <Col xs="auto">
          <StyledButton onClick={abrirCrear}>
            <FiPlus /> Nuevo producto
          </StyledButton>
        </Col>
      </Row>

      {actionError && <Alert variant="danger">{actionError}</Alert>}

      {loading ? (
        <div className="admin-page__loading">
          <Spinner animation="border" role="status" />
          <p>Cargando productos…</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : productos.length === 0 ? (
        <Alert variant="secondary">
          No hay productos cargados todavía. Creá el primero con el botón de arriba.
        </Alert>
      ) : (
        <div className="table-responsive">
          <Table hover className="admin-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img src={p.imagen} alt={p.nombre} className="admin-table__img" />
                  </td>
                  <td>{p.nombre}</td>
                  <td className="text-capitalize">{p.categoria}</td>
                  <td>{formatPrice(p.precio)}</td>
                  <td>{p.stock}</td>
                  <td className="admin-table__actions">
                    <button
                      className="icon-btn"
                      onClick={() => abrirEditar(p)}
                      title="Editar"
                      aria-label={`Editar ${p.nombre}`}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="icon-btn icon-btn--danger"
                      onClick={() => setProductoEliminar(p)}
                      title="Eliminar"
                      aria-label={`Eliminar ${p.nombre}`}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{productoEditar ? "Editar producto" : "Nuevo producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            productoInicial={productoEditar}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            loading={guardando}
          />
        </Modal.Body>
      </Modal>

      <ConfirmModal
        show={!!productoEliminar}
        title="Eliminar producto"
        message={
          productoEliminar && (
            <>
              ¿Seguro que querés eliminar <strong>{productoEliminar.nombre}</strong>? Esta
              acción no se puede deshacer.
            </>
          )
        }
        onConfirm={confirmarEliminar}
        onCancel={() => setProductoEliminar(null)}
        loading={eliminando}
      />
    </Container>
  );
};

export default Admin;
