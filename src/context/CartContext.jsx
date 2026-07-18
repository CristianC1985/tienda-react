import { createContext, useContext, useState } from "react";
import { validarCupon } from "../services/cuponesService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cupon, setCupon] = useState(null);
  const [cuponError, setCuponError] = useState(null);
  const [aplicandoCupon, setAplicandoCupon] = useState(false);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setCupon(null);
    setCuponError(null);
  };

  const aplicarCupon = async (codigo) => {
    setAplicandoCupon(true);
    setCuponError(null);
    try {
      const encontrado = await validarCupon(codigo);
      if (!encontrado) {
        setCupon(null);
        setCuponError("El cupón no existe o no está activo.");
        return false;
      }
      setCupon(encontrado);
      return true;
    } catch {
      setCupon(null);
      setCuponError("No pudimos validar el cupón. Intentá nuevamente.");
      return false;
    } finally {
      setAplicandoCupon(false);
    }
  };

  const quitarCupon = () => {
    setCupon(null);
    setCuponError(null);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  const descuento = cupon ? (subtotal * cupon.descuentoPorcentaje) / 100 : 0;

  const totalPrice = subtotal - descuento;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
