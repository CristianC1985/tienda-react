import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiShoppingCart, FiCheck, FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { getProductoPorId } from "../services/productosService";
import "./ProductDetail.css";

const formatPrice = (precio) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(precio);

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setError(null);
    setAdded(false);
    getProductoPorId(id)
      .then((data) => setProducto(data))
      .catch(() =>
        setError("No pudimos cargar este producto. Intentá nuevamente.")
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    addToCart(producto, cantidad);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="loader" />
        <p>Cargando producto…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-error">
        <h2>Ocurrió un error</h2>
        <p>{error}</p>
        <Link to="/productos">← Volver al catálogo</Link>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="detail-error">
        <h2>Producto no encontrado</h2>
        <Link to="/productos">← Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="detail">
      <Helmet>
        <title>{producto.nombre} — Forma</title>
        <meta name="description" content={producto.descripcion} />
      </Helmet>

      <div className="detail__breadcrumb">
        <Link to="/productos">Catálogo</Link>
        <span> / </span>
        <span>{producto.nombre}</span>
      </div>

      <div className="detail__content">
        <div className="detail__image-wrap">
          <img src={producto.imagen} alt={producto.nombre} className="detail__image" />
          <span className="detail__cat">{producto.categoria}</span>
        </div>

        <div className="detail__info">
          <h1 className="detail__name">{producto.nombre}</h1>
          <p className="detail__price">{formatPrice(producto.precio)}</p>
          <p className="detail__desc">{producto.descripcion}</p>

          <div className="detail__stock-info">
            {producto.stock <= 5 ? (
              <span className="stock-low">⚠ Solo quedan {producto.stock} unidades</span>
            ) : (
              <span className="stock-ok">✓ En stock ({producto.stock} disponibles)</span>
            )}
          </div>

          <div className="detail__qty">
            <label className="qty-label">Cantidad</label>
            <div className="qty-controls">
              <button
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="qty-btn"
                disabled={cantidad <= 1}
              >
                <FiMinus />
              </button>
              <span className="qty-value">{cantidad}</span>
              <button
                onClick={() => setCantidad((c) => Math.min(producto.stock, c + 1))}
                className="qty-btn"
                disabled={cantidad >= producto.stock}
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`detail__add-btn ${added ? "detail__add-btn--added" : ""}`}
          >
            {added ? (
              <>
                <FiCheck /> Agregado al carrito
              </>
            ) : (
              <>
                <FiShoppingCart /> Agregar al carrito
              </>
            )}
          </button>

          {added && (
            <Link to="/carrito" className="detail__go-cart">
              Ver carrito →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
