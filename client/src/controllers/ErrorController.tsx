import React, { FC } from "react";
import { Redirect } from "react-router-dom";

interface IProps {
  error: any;
}

export const ErrorController: FC<IProps> = ({ error }) => {
  switch (error) {
    case "Bad Request":
      return <Redirect to="/400" />;

    case "Not Found":
      return <Redirect to="/404" />;

    default:
      return <Redirect to="/404" />;
  }
};
