import { Modal } from "react-bootstrap";
import { FiAlertTriangle } from "react-icons/fi";
import { StyledButton, StyledOutlineButton } from "../common/StyledButton";

const ConfirmModal = ({ show, title, message, onConfirm, onCancel, loading }) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2">
          <FiAlertTriangle color="#b3413a" />
          {title || "Confirmar acción"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <StyledOutlineButton onClick={onCancel} disabled={loading}>
          Cancelar
        </StyledOutlineButton>
        <StyledButton $variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? "Eliminando…" : "Sí, eliminar"}
        </StyledButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
