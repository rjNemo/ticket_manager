import React, { FC } from "react";

interface IProps {
  error: any;
}
export const ErrorPage: FC<IProps> = ({ error }) => {
  return (
    <div className="section">
      <p>{error}</p>
    </div>
  );
};
