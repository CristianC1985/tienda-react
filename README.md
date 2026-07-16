# Forma — Diseño de Interiores

E-commerce de mobiliario y decoración de autor, desarrollado con **React + Vite**. Proyecto final del curso de React (CoderHouse).

🔗 Demo: https://cristian-coronel.netlify.app/

## ✨ Funcionalidades

- **Catálogo de productos** con filtro por categoría, **búsqueda en tiempo real** y **paginación**.
- **Carrito de compras** persistente durante la sesión, manejado con Context API (agregar, quitar, vaciar, totales).
- **Autenticación de usuarios** (registro / login / logout) con **Firebase Authentication**.
- **Rutas protegidas**: `/perfil` y `/admin` solo son accesibles con sesión iniciada.
- **CRUD de productos** completo contra **Firebase Firestore**, con formulario controlado y validaciones, modal de confirmación antes de eliminar, spinners de carga y manejo de errores.
- **Diseño responsivo** con el sistema de grillas de **React-Bootstrap** (mobile / tablet / desktop).
- **Componentes estilizados** con **styled-components** (botones reutilizables).
- **Íconos** con **React Icons** en botones y elementos interactivos.
- **SEO dinámico** con **React Helmet** (`<title>` y meta description por página).

## 🧱 Stack técnico

- React 18 + React Router DOM v6
- Vite
- Firebase (Authentication + Firestore)
- React-Bootstrap + Bootstrap 5
- styled-components
- react-icons
- react-helmet-async

## 🚀 Instalación y ejecución local

1. **Cloná el repositorio**

   ```bash
   git clone https://github.com/CristianC1985/tienda-react.git
   cd tienda-react
   ```

2. **Instalá las dependencias**

   ```bash
   npm install
   ```

3. **Configurá Firebase**

   - Creá un proyecto en [Firebase Console](https://console.firebase.google.com/).
   - Activá **Authentication** → método **Email/Contraseña**.
   - Activá **Firestore Database** (modo producción o prueba).
   - Copiá el archivo de ejemplo de variables de entorno:

     ```bash
     cp .env.example .env
     ```

   - Completá `.env` con las credenciales de tu app web (Firebase Console → ⚙️ Configuración del proyecto → Tus apps → Config):

     ```
     VITE_FIREBASE_API_KEY=...
     VITE_FIREBASE_AUTH_DOMAIN=...
     VITE_FIREBASE_PROJECT_ID=...
     VITE_FIREBASE_STORAGE_BUCKET=...
     VITE_FIREBASE_MESSAGING_SENDER_ID=...
     VITE_FIREBASE_APP_ID=...
     ```

4. **Cargá productos iniciales**

   La colección `productos` de Firestore arranca vacía. Iniciá sesión, entrá a **Gestión** (`/admin`) y cargá productos manualmente con el botón "Nuevo producto", o usá `src/data/productos.json` como referencia de contenido para copiar y pegar.

5. **Corré el proyecto en desarrollo**

   ```bash
   npm run dev
   ```

   Abrí [http://localhost:5173](http://localhost:5173)

6. **Build de producción**

   ```bash
   npm run build
   npm run preview
   ```

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── admin/       # ProductForm, ConfirmModal (CRUD)
│   ├── auth/         # ProtectedRoute
│   ├── cart/         # CartWidget
│   ├── catalog/      # Item, ItemListContainer
│   ├── common/       # SearchBar, Pagination, StyledButton
│   └── layout/       # Header, Footer, Layout
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── firebase/
│   └── config.js
├── pages/
│   ├── Home, Productos, ProductDetail, Cart
│   ├── Login, Register, Perfil
│   ├── Admin
│   └── NotFound
├── services/
│   └── productosService.js   # CRUD Firestore
└── data/
    └── productos.json         # datos de referencia
```

## 🔒 Reglas de Firestore sugeridas (modo desarrollo)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /productos/{productoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🌐 Compatibilidad

Probado en las últimas versiones de Chrome, Firefox y Edge. Diseño responsivo verificado en resoluciones móvil (< 576px), tablet (576–992px) y escritorio (> 992px).

## 👤 Autor

Cristian Coronel — Proyecto final de React, CoderHouse.
