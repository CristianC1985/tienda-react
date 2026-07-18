import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiTrash2, FiShoppingBag, FiArrowLeft, FiTag, FiX } from "react-icons/fi";
import { Spinner } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const formatPrice = (precio) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(precio);

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    totalPrice,
    cupon,
    cuponError,
    aplicandoCupon,
    aplicarCupon,
    quitarCupon,
    descuento,
  } = useCart();

  const [codigoInput, setCodigoInput] = useState("");
  const [compraFinalizada, setCompraFinalizada] = useState(null);

  const handleAplicarCupon = async (e) => {
    e.preventDefault();
    if (!codigoInput.trim()) return;
    const ok = await aplicarCupon(codigoInput);
    if (ok) setCodigoInput("");
  };

  const handleFinalizarCompra = () => {
    setCompraFinalizada({
      items: cartItems,
      total: totalPrice,
      cantidad: totalItems,
    });
    clearCart();
  };

  if (compraFinalizada) {
    return (
      <div className="cart-empty">
        <Helmet>
          <title>Compra confirmada — Forma</title>
        </Helmet>
        <div className="cart-empty__icon">✓</div>
        <h2 className="cart-empty__title">¡Gracias por tu compra!</h2>
        <p className="cart-empty__sub">
          Confirmamos {compraFinalizada.cantidad}{" "}
          {compraFinalizada.cantidad === 1 ? "producto" : "productos"} por un total de{" "}
          {formatPrice(compraFinalizada.total)}.
        </p>
        <Link to="/productos" className="cart-empty__cta">
          Seguir comprando
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <Helmet>
          <title>Carrito — Forma</title>
        </Helmet>
        <div className="cart-empty__icon">◇</div>
        <h2 className="cart-empty__title">Tu carrito está vacío</h2>
        <p className="cart-empty__sub">Explorá nuestro catálogo y encontrá tu próxima pieza favorita.</p>
        <Link to="/productos" className="cart-empty__cta">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <Helmet>
        <title>{`Carrito (${totalItems}) — Forma`}</title>
      </Helmet>

      <div className="cart__header">
        <h1 className="cart__title">Carrito</h1>
        <span className="cart__count">{totalItems} {totalItems === 1 ? "producto" : "productos"}</span>
      </div>

      <div className="cart__layout">
        <div className="cart__items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item__image-wrap">
                <img src={item.imagen} alt={item.nombre} className="cart-item__image" />
              </div>
              <div className="cart-item__info">
                <span className="cart-item__cat">{item.categoria}</span>
                <h3 className="cart-item__name">{item.nombre}</h3>
                <div className="cart-item__meta">
                  <span className="cart-item__qty">Cant: {item.quantity}</span>
                  <span className="cart-item__unit">{formatPrice(item.precio)} c/u</span>
                </div>
              </div>
              <div className="cart-item__right">
                <span className="cart-item__subtotal">
                  {formatPrice(item.precio * item.quantity)}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="cart-item__remove"
                  title="Eliminar"
                  aria-label={`Eliminar ${item.nombre}`}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart__summary">
          <h2 className="summary__title">Resumen</h2>
          <div className="summary__rows">
            {cartItems.map((item) => (
              <div className="summary__row" key={item.id}>
                <span>{item.nombre} × {item.quantity}</span>
                <span>{formatPrice(item.precio * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="summary__divider" />

          <div className="summary__coupon">
            {cupon ? (
              <div className="summary__coupon-applied">
                <span>
                  <FiTag /> <strong>{cupon.codigo}</strong> (-{cupon.descuentoPorcentaje}%)
                </span>
                <button
                  onClick={quitarCupon}
                  className="summary__coupon-remove"
                  aria-label="Quitar cupón"
                  title="Quitar cupón"
                >
                  <FiX />
                </button>
              </div>
            ) : (
              <form onSubmit={handleAplicarCupon} className="summary__coupon-form">
                <input
                  type="text"
                  value={codigoInput}
                  onChange={(e) => setCodigoInput(e.target.value)}
                  placeholder="Código de descuento"
                  disabled={aplicandoCupon}
                  className="summary__coupon-input"
                />
                <button
                  type="submit"
                  className="summary__coupon-btn"
                  disabled={aplicandoCupon || !codigoInput.trim()}
                >
                  {aplicandoCupon ? <Spinner size="sm" animation="border" /> : "Aplicar"}
                </button>
              </form>
            )}
            {cuponError && <p className="summary__coupon-error">{cuponError}</p>}
          </div>

          <div className="summary__divider" />

          <div className="summary__row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {cupon && (
            <div className="summary__row summary__row--discount">
              <span>Descuento ({cupon.descuentoPorcentaje}%)</span>
              <span>-{formatPrice(descuento)}</span>
            </div>
          )}
          <div className="summary__total">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <button className="summary__checkout" onClick={handleFinalizarCompra}>
            <FiShoppingBag /> Finalizar compra
          </button>
          <button onClick={clearCart} className="summary__clear">
            <FiTrash2 /> Vaciar carrito
          </button>
          <Link to="/productos" className="summary__back">
            <FiArrowLeft /> Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;