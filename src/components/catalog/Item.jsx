import { Link } from "react-router-dom";
import "./Item.css";

const formatPrice = (precio) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(precio);

const Item = ({ producto }) => {
  const { id, nombre, precio, categoria, imagen, stock } = producto;

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
        <Link to={`/producto/${id}`} className="item-card__btn">
          Ver detalle
        </Link>
      </div>
    </article>
  );
};

export default Item;
