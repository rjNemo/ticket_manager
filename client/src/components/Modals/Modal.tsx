import React, { FC, CSSProperties } from "react";

interface IProps {
  handleClose: () => void;
  show: boolean;
}
export const Modal: FC<IProps> = ({ handleClose, show, children }) => {
  const showHideStyle: CSSProperties = show
    ? { display: "block", zIndex: 10 }
    : { display: "none", zIndex: 10 };
  return (
    <div className="modal" style={showHideStyle}>
      <div className="modal-content">{children}</div>
    </div>
  );
};
