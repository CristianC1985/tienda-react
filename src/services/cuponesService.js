import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

const cuponesRef = collection(db, "cupones");

export const getCupones = async () => {
  const snapshot = await getDocs(cuponesRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const crearCupon = async (cupon) => {
  const docRef = await addDoc(cuponesRef, {
    ...cupon,
    codigo: cupon.codigo.trim().toUpperCase(),
  });
  return { id: docRef.id, ...cupon };
};

export const actualizarCupon = async (id, cambios) => {
  const ref = doc(db, "cupones", id);
  const datos = { ...cambios };
  if (datos.codigo) datos.codigo = datos.codigo.trim().toUpperCase();
  await updateDoc(ref, datos);
  return { id, ...datos };
};

export const eliminarCupon = async (id) => {
  const ref = doc(db, "cupones", id);
  await deleteDoc(ref);
  return id;
};

/**
 * Busca un cupón activo por código exacto.
 * Devuelve el cupón si existe y está activo, o null si no es válido.
 */
export const validarCupon = async (codigo) => {
  const codigoNormalizado = codigo.trim().toUpperCase();
  const q = query(cuponesRef, where("codigo", "==", codigoNormalizado));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const cuponDoc = snapshot.docs[0];
  const cupon = { id: cuponDoc.id, ...cuponDoc.data() };

  if (!cupon.activo) return null;

  return cupon;
};
