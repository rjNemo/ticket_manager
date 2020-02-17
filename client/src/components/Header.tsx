import React, { FC } from "react";

type HeaderProps = {
  title: string;
  description: string;
};

export const Header: FC<HeaderProps> = ({ title, description }) => {
  return (
    <>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
    </>
  );
};
