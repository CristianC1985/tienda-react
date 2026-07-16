import styled from "styled-components";

export const StyledButton = styled.button`
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${(props) => (props.$variant === "danger" ? "#b3413a" : "#2b2620")};
  color: #fdfbf8;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.15s ease;

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const StyledOutlineButton = styled(StyledButton)`
  background: transparent;
  color: #2b2620;
  border: 1px solid #2b2620;

  &:hover:not(:disabled) {
    background: #2b2620;
    color: #fdfbf8;
  }
`;
