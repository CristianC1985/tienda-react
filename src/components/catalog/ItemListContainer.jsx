import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Item from "./Item";
import SearchBar from "../common/SearchBar";
import Pagination from "../common/Pagination";
import { getProductos } from "../../services/productosService";
import "./ItemListContainer.css";

const CATEGORIAS = ["todas", "sillas", "mesas", "sofas", "iluminacion", "almacenamiento", "textiles", "decoracion"];
const PRODUCTOS_POR_PAGINA = 6;

const ItemListContainer = ({ greeting }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductos()
      .then((data) => setProductos(data))
      .catch(() =>
        setError(
          "No pudimos cargar el catálogo. Verificá tu conexión e intentá nuevamente."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const productosFiltrados = useMemo(() => {
    let lista = filtro === "todas" ? productos : productos.filter((p) => p.categoria === filtro);
    if (busqueda.trim()) {
      const q = busqueda.trim().toLowerCase();
      lista = lista.filter((p) => p.nombre?.toLowerCase().includes(q));
    }
    return lista;
  }, [productos, filtro, busqueda]);

  const totalPaginas = Math.max(1, Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const productosPagina = productosFiltrados.slice(
    (paginaActual - 1) * PRODUCTOS_POR_PAGINA,
    paginaActual * PRODUCTOS_POR_PAGINA
  );

  const handleFiltro = (cat) => {
    setFiltro(cat);
    setPagina(1);
  };

  const handleBusqueda = (valor) => {
    setBusqueda(valor);
    setPagina(1);
  };

  return (
    <Container as="section" className="catalog">
      <Helmet>
        <title>{greeting || "Catálogo"} — Forma</title>
        <meta
          name="description"
          content="Explorá el catálogo completo de mobiliario y decoración de autor de Forma."
        />
      </Helmet>

      <div className="catalog__header">
        <h1 className="catalog__title">{greeting || "Catálogo"}</h1>

        <Row className="catalog__controls g-3">
          <Col xs={12} md={5}>
            <SearchBar value={busqueda} onChange={handleBusqueda} />
          </Col>
          <Col xs={12} md={7}>
            <div className="catalog__filters">
              {CATEGORIAS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFiltro(cat)}
                  className={`filter-btn ${filtro === cat ? "filter-btn--active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Col>
        </Row>
      </div>

      {loading ? (
        <div className="catalog__loading">
          <Spinner animation="border" role="status" />
          <p>Cargando productos…</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <p className="catalog__count">
            {productosFiltrados.length}{" "}
            {productosFiltrados.length === 1 ? "pieza encontrada" : "piezas encontradas"}
          </p>

          {productosFiltrados.length === 0 ? (
            <p className="catalog__empty">No encontramos productos con ese criterio.</p>
          ) : (
            <Row className="catalog__grid g-4">
              {productosPagina.map((producto) => (
                <Col key={producto.id} xs={12} sm={6} lg={4}>
                  <Item producto={producto} />
                </Col>
              ))}
            </Row>
          )}

          <div className="catalog__pagination">
            <Pagination
              currentPage={paginaActual}
              totalPages={totalPaginas}
              onPageChange={setPagina}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default ItemListContainer;
