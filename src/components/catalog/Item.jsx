import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiCheck } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import "./Item.css";

const formatPrice = (precio) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(precio);

const Item = ({ producto }) => {
  const { id, nombre, precio, categoria, imagen, stock } = producto;
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(producto, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="item-card">
      <div className="item-card__image-wrap">
        <img src={imagen} alt={nombre} className="item-card__image" />
        <span className="item-card__cat">{categoria}</span>
      </div>
      <div className="item-card__body">
        <h3 className="item-card__name">{nombre}</h3>
        <div className="item-card__footer">
          <span className="item-card__price">{formatPrice(precio)}</span>
          <span className={`item-card__stock ${stock <= 5 ? "item-card__stock--low" : ""}`}>
            {stock <= 5 ? `¡Solo ${stock}!` : "Disponible"}
          </span>
        </div>

        <div className="item-card__actions">
          <Link to={`/producto/${id}`} className="item-card__btn">
            Ver detalle
          </Link>
          <button
            onClick={handleAdd}
            className={`item-card__add ${added ? "item-card__add--added" : ""}`}
            disabled={stock === 0}
            title="Agregar al carrito"
            aria-label={`Agregar ${nombre} al carrito`}
          >
            {added ? <FiCheck /> : <FiShoppingCart />}
          </button>
        </div>
      </div>
    </article>
  );
};

export default Item;
