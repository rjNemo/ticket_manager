import React, { FC, MouseEvent } from "react";
import { Fab, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import AddIcon from "@material-ui/icons/Add";

import { Button } from "./Button";

interface IProps {
  icon?: string;
  color?: "inherit" | "primary" | "secondary" | "default" | undefined;
  onClick?: (e: MouseEvent) => void;
  size?: "small" | "medium" | "large" | undefined;
  text?: string;
}

// export const FloatingButton: FC<IProps> = ({
//   icon = "add",
//   size = "small",
//   color = "red",
//   onClick
// }) => {
//   const iconComponent = <i className="material-icons left">{icon}</i>;
//   return (
//     <Button color={color} size={size} shape="btn-floating" onClick={onClick}>
//       {iconComponent}
//     </Button>
//   );
// };

export const FloatingButton: FC<IProps> = ({
  color,
  icon,
  size,
  text,
  onClick
}) => {
  return (
    <Fab color={color} aria-label={icon} size={size} onClick={onClick}>
      <AddIcon />
      {text}
    </Fab>
  );
};
