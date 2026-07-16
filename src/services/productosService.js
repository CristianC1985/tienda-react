import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";

const productosRef = collection(db, "productos");

export const getProductos = async () => {
  const snapshot = await getDocs(productosRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getProductoPorId = async (id) => {
  const ref = doc(db, "productos", id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

export const crearProducto = async (producto) => {
  const docRef = await addDoc(productosRef, producto);
  return { id: docRef.id, ...producto };
};

export const actualizarProducto = async (id, cambios) => {
  const ref = doc(db, "productos", id);
  await updateDoc(ref, cambios);
  return { id, ...cambios };
};

export const eliminarProducto = async (id) => {
  const ref = doc(db, "productos", id);
  await deleteDoc(ref);
  return id;
};
