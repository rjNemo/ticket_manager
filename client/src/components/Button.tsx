import React, { FC } from "react";

interface IProps {
  icon?: string;
  size?: string;
  shape?: string;
  color?: string;
  text?: string;
}

export const Button: FC<IProps> = ({
  size = "small",
  shape = "",
  color,
  text,
  children
}) => {
  return (
    <button
      className={`waves-effect waves-light btn-${size} ${shape} ${color}`}
    >
      {children}
    </button>
  );
};
