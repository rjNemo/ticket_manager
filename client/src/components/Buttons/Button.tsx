import React, { FC, MouseEvent } from "react";

interface IProps {
  icon?: string;
  size?: string;
  shape?: string;
  color?: string;
  text?: string;
  onClick?: (e: MouseEvent) => void;
}

const Button: FC<IProps> = ({
  size = "small",
  shape = "",
  color,
  onClick,
  children,
}) => {
  return (
    <button
      className={`waves-effect waves-light btn-${size} ${shape} ${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
