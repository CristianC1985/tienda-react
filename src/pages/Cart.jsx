import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiTrash2, FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const formatPrice = (precio) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(precio);

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalItems, totalPrice } = useCart();

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
        <title>Carrito ({totalItems}) — Forma</title>
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
          <div className="summary__total">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <button className="summary__checkout">
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
