import React, { FC, MouseEvent } from "react";
import { Button } from "./Button";

interface IProps {
  icon?: string;
  size?: string;
  color?: string;
  onClick?: (e: MouseEvent) => void;
}

export const FloatingButton: FC<IProps> = ({
  icon = "add",
  size = "small",
  color = "red",
  onClick
}) => {
  const iconComponent = <i className="material-icons left">{icon}</i>;
  return (
    <Button color={color} size={size} shape="btn-floating" onClick={onClick}>
      {iconComponent}
    </Button>
  );
};
