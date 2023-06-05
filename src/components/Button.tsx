import React from "react";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  primary?: boolean;
  danger?: boolean;
  classProp?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  primary,
  danger,
  classProp,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        button-default
        ${classProp ? classProp : ""}
        ${outline ? "button-outline" : ""}
        ${primary ? "button-primary" : ""}
        ${danger ? "button-danger" : ""}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
