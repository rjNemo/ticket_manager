import React, { FC, MouseEvent } from "react";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

interface IProps {
  icon?: string;
  color?: "inherit" | "primary" | "secondary" | "default" | undefined;
  onClick?: (e: MouseEvent) => void;
  size?: "small" | "medium" | "large" | undefined;
  text?: string;
}

const FloatingButton: FC<IProps> = ({ color, icon, size, text, onClick }) => {
  return (
    <Fab color={color} aria-label={icon} size={size} onClick={onClick}>
      <AddIcon />
      {text}
    </Fab>
  );
};

export default FloatingButton;
