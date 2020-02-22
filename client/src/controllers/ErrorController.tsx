import React, { FC } from "react";
import { Redirect } from "react-router-dom";

interface IProps {
  error: any;
}

export const ErrorController: FC<IProps> = ({ error }) => {
  if (error === "Not Found") return <Redirect to="/404" />;
  return <></>;
};
