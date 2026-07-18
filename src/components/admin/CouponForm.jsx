import { useState, useEffect } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { FiSave } from "react-icons/fi";
import { StyledButton, StyledOutlineButton } from "../common/StyledButton";

const vacio = {
  codigo: "",
  descuentoPorcentaje: "",
  activo: true,
};

const CouponForm = ({ cuponInicial, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(vacio);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (cuponInicial) {
      setForm({
        codigo: cuponInicial.codigo || "",
        descuentoPorcentaje: cuponInicial.descuentoPorcentaje ?? "",
        activo: cuponInicial.activo ?? true,
      });
    } else {
      setForm(vacio);
    }
    setErrores({});
  }, [cuponInicial]);

  const handleChange = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.codigo.trim()) nuevosErrores.codigo = "El código es obligatorio.";
    else if (!/^[A-Za-z0-9-]+$/.test(form.codigo.trim()))
      nuevosErrores.codigo = "Solo letras, números y guiones.";

    const descuento = Number(form.descuentoPorcentaje);
    if (!form.descuentoPorcentaje || descuento <= 0 || descuento > 100)
      nuevosErrores.descuentoPorcentaje = "El descuento debe ser entre 1 y 100.";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    onSubmit({
      codigo: form.codigo.trim(),
      descuentoPorcentaje: Number(form.descuentoPorcentaje),
      activo: form.activo,
    });
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Row>
        <Col xs={12} md={7}>
          <Form.Group className="mb-3">
            <Form.Label>Código *</Form.Label>
            <Form.Control
              value={form.codigo}
              onChange={(e) => handleChange("codigo", e.target.value)}
              isInvalid={!!errores.codigo}
              placeholder="Ej: VERANO10"
              disabled={loading}
              style={{ textTransform: "uppercase" }}
            />
            <Form.Control.Feedback type="invalid">{errores.codigo}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={5}>
          <Form.Group className="mb-3">
            <Form.Label>Descuento (%) *</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="100"
              value={form.descuentoPorcentaje}
              onChange={(e) => handleChange("descuentoPorcentaje", e.target.value)}
              isInvalid={!!errores.descuentoPorcentaje}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {errores.descuentoPorcentaje}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Check
          type="switch"
          id="cupon-activo"
          label="Cupón activo"
          checked={form.activo}
          onChange={(e) => handleChange("activo", e.target.checked)}
          disabled={loading}
        />
      </Form.Group>

      {loading && <Alert variant="info">Guardando cambios…</Alert>}

      <div className="d-flex gap-2 justify-content-end">
        <StyledOutlineButton type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </StyledOutlineButton>
        <StyledButton type="submit" disabled={loading}>
          <FiSave /> {cuponInicial ? "Guardar cambios" : "Crear cupón"}
        </StyledButton>
      </div>
    </Form>
  );
};

export default CouponForm;
