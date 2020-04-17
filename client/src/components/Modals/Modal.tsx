import React, { FC } from "react";
import Dialog from "@material-ui/core/Dialog";

interface IProps {
  handleClose: () => void;
  show: boolean;
}

export const Modal: FC<IProps> = ({ handleClose, show, children }) => {
  return (
    <Dialog open={show} onClose={handleClose}>
      {children}
    </Dialog>
  );
};
