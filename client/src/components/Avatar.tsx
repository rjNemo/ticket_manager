import React, { FC } from "react";

interface IProps {
  picture: string;
}
export const Avatar: FC<IProps> = ({ picture }) => {
  return (
    <>
      <img className="circle" src={picture} height="100vh" width="100vh" />
    </>
  );
};
