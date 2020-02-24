import React, { FC, useState, CSSProperties } from "react";

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
      <div className="modal-footer">
        <button
          type="submit"
          className="modal-close waves-effect waves-green btn"
        >
          Done
        </button>
      </div>
    </div>
  );
};
