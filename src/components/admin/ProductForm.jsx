import { useState, useEffect } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { FiSave } from "react-icons/fi";
import { StyledButton, StyledOutlineButton } from "../common/StyledButton";

const CATEGORIAS = ["sillas", "mesas", "sofas", "iluminacion", "almacenamiento", "textiles", "decoracion"];

const vacio = {
  nombre: "",
  precio: "",
  categoria: "sillas",
  descripcion: "",
  imagen: "",
  stock: "",
};

const ProductForm = ({ productoInicial, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(vacio);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoInicial) {
      setForm({
        nombre: productoInicial.nombre || "",
        precio: productoInicial.precio ?? "",
        categoria: productoInicial.categoria || "sillas",
        descripcion: productoInicial.descripcion || "",
        imagen: productoInicial.imagen || "",
        stock: productoInicial.stock ?? "",
      });
    } else {
      setForm(vacio);
    }
    setErrores({});
  }, [productoInicial]);

  const handleChange = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!form.precio || Number(form.precio) <= 0)
      nuevosErrores.precio = "El precio debe ser mayor a 0.";
    if (form.stock === "" || Number(form.stock) < 0)
      nuevosErrores.stock = "El stock no puede ser negativo.";
    if (!form.imagen.trim()) nuevosErrores.imagen = "La URL de imagen es obligatoria.";
    if (!form.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    onSubmit({
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
    });
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre *</Form.Label>
            <Form.Control
              value={form.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              isInvalid={!!errores.nombre}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Precio *</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={form.precio}
              onChange={(e) => handleChange("precio", e.target.value)}
              isInvalid={!!errores.precio}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Stock *</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => handleChange("stock", e.target.value)}
              isInvalid={!!errores.stock}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">{errores.stock}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Categoría *</Form.Label>
            <Form.Select
              value={form.categoria}
              onChange={(e) => handleChange("categoria", e.target.value)}
              disabled={loading}
            >
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} md={8}>
          <Form.Group className="mb-3">
            <Form.Label>URL de imagen *</Form.Label>
            <Form.Control
              value={form.imagen}
              onChange={(e) => handleChange("imagen", e.target.value)}
              isInvalid={!!errores.imagen}
              placeholder="https://…"
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">{errores.imagen}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Descripción *</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={form.descripcion}
          onChange={(e) => handleChange("descripcion", e.target.value)}
          isInvalid={!!errores.descripcion}
          disabled={loading}
        />
        <Form.Control.Feedback type="invalid">{errores.descripcion}</Form.Control.Feedback>
      </Form.Group>

      {loading && <Alert variant="info">Guardando cambios…</Alert>}

      <div className="d-flex gap-2 justify-content-end">
        <StyledOutlineButton type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </StyledOutlineButton>
        <StyledButton type="submit" disabled={loading}>
          <FiSave /> {productoInicial ? "Guardar cambios" : "Crear producto"}
        </StyledButton>
      </div>
    </Form>
  );
};

export default ProductForm;
