import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Alert, Modal, Tabs, Tab, Badge } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FiPlus, FiEdit2, FiTrash2, FiPackage, FiTag } from "react-icons/fi";
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../services/productosService";
import {
  getCupones,
  crearCupon,
  actualizarCupon,
  eliminarCupon,
} from "../services/cuponesService";
import ProductForm from "../components/admin/ProductForm";
import CouponForm from "../components/admin/CouponForm";
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
  // ---------- Productos ----------
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [errorProductos, setErrorProductos] = useState(null);
  const [actionErrorProductos, setActionErrorProductos] = useState(null);

  const [showProductForm, setShowProductForm] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const [guardandoProducto, setGuardandoProducto] = useState(false);

  const [productoEliminar, setProductoEliminar] = useState(null);
  const [eliminandoProducto, setEliminandoProducto] = useState(false);

  // ---------- Cupones ----------
  const [cupones, setCupones] = useState([]);
  const [loadingCupones, setLoadingCupones] = useState(true);
  const [errorCupones, setErrorCupones] = useState(null);
  const [actionErrorCupones, setActionErrorCupones] = useState(null);

  const [showCuponForm, setShowCuponForm] = useState(false);
  const [cuponEditar, setCuponEditar] = useState(null);
  const [guardandoCupon, setGuardandoCupon] = useState(false);

  const [cuponEliminar, setCuponEliminar] = useState(null);
  const [eliminandoCupon, setEliminandoCupon] = useState(false);

  const cargarProductos = () => {
    setLoadingProductos(true);
    setErrorProductos(null);
    getProductos()
      .then(setProductos)
      .catch(() => setErrorProductos("No pudimos cargar los productos. Reintentá más tarde."))
      .finally(() => setLoadingProductos(false));
  };

  const cargarCupones = () => {
    setLoadingCupones(true);
    setErrorCupones(null);
    getCupones()
      .then(setCupones)
      .catch(() => setErrorCupones("No pudimos cargar los cupones. Reintentá más tarde."))
      .finally(() => setLoadingCupones(false));
  };

  useEffect(() => {
    cargarProductos();
    cargarCupones();
  }, []);

  // ---------- Handlers Productos ----------
  const abrirCrearProducto = () => {
    setProductoEditar(null);
    setActionErrorProductos(null);
    setShowProductForm(true);
  };

  const abrirEditarProducto = (producto) => {
    setProductoEditar(producto);
    setActionErrorProductos(null);
    setShowProductForm(true);
  };

  const handleSubmitProducto = async (datos) => {
    setGuardandoProducto(true);
    setActionErrorProductos(null);
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
      setShowProductForm(false);
    } catch {
      setActionErrorProductos("No se pudo guardar el producto. Intentá nuevamente.");
    } finally {
      setGuardandoProducto(false);
    }
  };

  const confirmarEliminarProducto = async () => {
    if (!productoEliminar) return;
    setEliminandoProducto(true);
    try {
      await eliminarProducto(productoEliminar.id);
      setProductos((prev) => prev.filter((p) => p.id !== productoEliminar.id));
      setProductoEliminar(null);
    } catch {
      setActionErrorProductos("No se pudo eliminar el producto. Intentá nuevamente.");
    } finally {
      setEliminandoProducto(false);
    }
  };

  // ---------- Handlers Cupones ----------
  const abrirCrearCupon = () => {
    setCuponEditar(null);
    setActionErrorCupones(null);
    setShowCuponForm(true);
  };

  const abrirEditarCupon = (cupon) => {
    setCuponEditar(cupon);
    setActionErrorCupones(null);
    setShowCuponForm(true);
  };

  const handleSubmitCupon = async (datos) => {
    setGuardandoCupon(true);
    setActionErrorCupones(null);
    try {
      const codigoDuplicado = cupones.some(
        (c) =>
          c.codigo.toUpperCase() === datos.codigo.toUpperCase() &&
          c.id !== cuponEditar?.id
      );
      if (codigoDuplicado) {
        setActionErrorCupones("Ya existe un cupón con ese código.");
        setGuardandoCupon(false);
        return;
      }

      if (cuponEditar) {
        const actualizado = await actualizarCupon(cuponEditar.id, datos);
        setCupones((prev) =>
          prev.map((c) => (c.id === cuponEditar.id ? { ...c, ...actualizado } : c))
        );
      } else {
        const nuevo = await crearCupon(datos);
        setCupones((prev) => [...prev, nuevo]);
      }
      setShowCuponForm(false);
    } catch {
      setActionErrorCupones("No se pudo guardar el cupón. Intentá nuevamente.");
    } finally {
      setGuardandoCupon(false);
    }
  };

  const confirmarEliminarCupon = async () => {
    if (!cuponEliminar) return;
    setEliminandoCupon(true);
    try {
      await eliminarCupon(cuponEliminar.id);
      setCupones((prev) => prev.filter((c) => c.id !== cuponEliminar.id));
      setCuponEliminar(null);
    } catch {
      setActionErrorCupones("No se pudo eliminar el cupón. Intentá nuevamente.");
    } finally {
      setEliminandoCupon(false);
    }
  };

  return (
    <Container className="admin-page">
      <Helmet>
        <title>Panel de gestión — Forma</title>
        <meta name="description" content="Panel de administración de productos y cupones de Forma." />
      </Helmet>

      <h1 className="admin-page__title mb-4">
        <FiPackage /> Gestión
      </h1>

      <Tabs defaultActiveKey="productos" className="mb-4">
        {/* ---------------- TAB PRODUCTOS ---------------- */}
        <Tab eventKey="productos" title="Productos">
          <Row className="align-items-center my-3">
            <Col>
              <p className="mb-0 text-muted">Catálogo de productos</p>
            </Col>
            <Col xs="auto">
              <StyledButton onClick={abrirCrearProducto}>
                <FiPlus /> Nuevo producto
              </StyledButton>
            </Col>
          </Row>

          {actionErrorProductos && <Alert variant="danger">{actionErrorProductos}</Alert>}

          {loadingProductos ? (
            <div className="admin-page__loading">
              <Spinner animation="border" role="status" />
              <p>Cargando productos…</p>
            </div>
          ) : errorProductos ? (
            <Alert variant="danger">{errorProductos}</Alert>
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
                          onClick={() => abrirEditarProducto(p)}
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
        </Tab>

        {/* ---------------- TAB CUPONES ---------------- */}
        <Tab eventKey="cupones" title="Cupones">
          <Row className="align-items-center my-3">
            <Col>
              <p className="mb-0 text-muted">Cupones de descuento aplicables en el carrito</p>
            </Col>
            <Col xs="auto">
              <StyledButton onClick={abrirCrearCupon}>
                <FiPlus /> Nuevo cupón
              </StyledButton>
            </Col>
          </Row>

          {actionErrorCupones && <Alert variant="danger">{actionErrorCupones}</Alert>}

          {loadingCupones ? (
            <div className="admin-page__loading">
              <Spinner animation="border" role="status" />
              <p>Cargando cupones…</p>
            </div>
          ) : errorCupones ? (
            <Alert variant="danger">{errorCupones}</Alert>
          ) : cupones.length === 0 ? (
            <Alert variant="secondary">
              No hay cupones cargados todavía. Creá el primero con el botón de arriba.
            </Alert>
          ) : (
            <div className="table-responsive">
              <Table hover className="admin-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descuento</th>
                    <th>Estado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cupones.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <FiTag /> <strong>{c.codigo}</strong>
                      </td>
                      <td>{c.descuentoPorcentaje}%</td>
                      <td>
                        <Badge bg={c.activo ? "success" : "secondary"}>
                          {c.activo ? "Activo" : "Inactivo"}
                        </Badge>
                      </td>
                      <td className="admin-table__actions">
                        <button
                          className="icon-btn"
                          onClick={() => abrirEditarCupon(c)}
                          title="Editar"
                          aria-label={`Editar cupón ${c.codigo}`}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="icon-btn icon-btn--danger"
                          onClick={() => setCuponEliminar(c)}
                          title="Eliminar"
                          aria-label={`Eliminar cupón ${c.codigo}`}
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
        </Tab>
      </Tabs>

      {/* ---------------- MODALES PRODUCTOS ---------------- */}
      <Modal show={showProductForm} onHide={() => setShowProductForm(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{productoEditar ? "Editar producto" : "Nuevo producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            productoInicial={productoEditar}
            onSubmit={handleSubmitProducto}
            onCancel={() => setShowProductForm(false)}
            loading={guardandoProducto}
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
        onConfirm={confirmarEliminarProducto}
        onCancel={() => setProductoEliminar(null)}
        loading={eliminandoProducto}
      />

      {/* ---------------- MODALES CUPONES ---------------- */}
      <Modal show={showCuponForm} onHide={() => setShowCuponForm(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{cuponEditar ? "Editar cupón" : "Nuevo cupón"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CouponForm
            cuponInicial={cuponEditar}
            onSubmit={handleSubmitCupon}
            onCancel={() => setShowCuponForm(false)}
            loading={guardandoCupon}
          />
        </Modal.Body>
      </Modal>

      <ConfirmModal
        show={!!cuponEliminar}
        title="Eliminar cupón"
        message={
          cuponEliminar && (
            <>
              ¿Seguro que querés eliminar el cupón <strong>{cuponEliminar.codigo}</strong>?
              Esta acción no se puede deshacer.
            </>
          )
        }
        onConfirm={confirmarEliminarCupon}
        onCancel={() => setCuponEliminar(null)}
        loading={eliminandoCupon}
      />
    </Container>
  );
};

export default Admin;
