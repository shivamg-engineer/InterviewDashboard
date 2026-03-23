import React from "react";
import styled from "styled-components";

interface ButtonProps {
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.variant === "secondary" ? "#6b7280" : "#2563eb"};

  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;

  /* Hover effect */
  &:hover {
    background-color: ${(props) =>
      props.variant === "secondary" ? "#4b5563" : "#1e40af"};
  }

  /* Disabled state */
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

interface StyledButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({ children, variant, disabled }) => {
  return (
    <Button variant={variant} disabled={disabled}>
      {children}
    </Button>
  );
};

export default StyledButton;
