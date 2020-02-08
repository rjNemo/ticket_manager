import React, { FC } from "react";

type HeaderProps = {
  title: string;
  description: string;
};

export const Header: FC<HeaderProps> = ({ title, description }) => {
  return (
    <>
      <h2>{title}</h2>
      <h4>{description}</h4>
    </>
  );
};
