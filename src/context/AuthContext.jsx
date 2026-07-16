import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const traducirError = (code) => {
    const errores = {
      "auth/email-already-in-use": "Ese email ya está registrado.",
      "auth/invalid-email": "El email no es válido.",
      "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
      "auth/user-not-found": "No existe una cuenta con ese email.",
      "auth/wrong-password": "Contraseña incorrecta.",
      "auth/invalid-credential": "Email o contraseña incorrectos.",
      "auth/too-many-requests": "Demasiados intentos. Probá de nuevo más tarde.",
    };
    return errores[code] || "Ocurrió un error. Intentá nuevamente.";
  };

  const register = async (email, password, nombre) => {
    setAuthError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (nombre) {
        await updateProfile(cred.user, { displayName: nombre });
      }
      setCurrentUser({ ...cred.user, displayName: nombre || cred.user.displayName });
      return cred.user;
    } catch (err) {
      const msg = traducirError(err.code);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return cred.user;
    } catch (err) {
      const msg = traducirError(err.code);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, authError, register, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
