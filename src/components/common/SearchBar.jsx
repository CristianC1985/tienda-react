import { FiSearch, FiX } from "react-icons/fi";
import { InputGroup, Form, Button } from "react-bootstrap";

const SearchBar = ({ value, onChange, placeholder = "Buscar productos…" }) => {
  return (
    <InputGroup className="search-bar">
      <InputGroup.Text>
        <FiSearch />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar productos"
      />
      {value && (
        <Button
          variant="outline-secondary"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
        >
          <FiX />
        </Button>
      )}
    </InputGroup>
  );
};

export default SearchBar;
