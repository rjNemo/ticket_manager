import React, { FC } from "react";
import { Button } from "./Button";

interface IProps {
  icon?: string;
  size?: string;
  color?: string;
}

export const FloatingButton: FC<IProps> = ({
  icon = "add",
  size = "small",
  color = "red"
}) => {
  const iconComponent = <i className="material-icons left">{icon}</i>;
  return (
    <Button color={color} size={size} shape="btn-floating">
      {iconComponent}
    </Button>
  );
};
