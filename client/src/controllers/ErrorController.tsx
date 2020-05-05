import React, { FC } from "react";
import { Redirect } from "react-router-dom";

interface IProps {
  error: string;
}

const ErrorController: FC<IProps> = ({ error }) => {
  switch (error) {
    case "Bad Request":
      return <Redirect to="/400" />;

    case "Unauthorized":
      return <Redirect to="/401" />;

    case "Not Found":
      return <Redirect to="/404" />;

    default:
      return <Redirect to="/404" />;
  }
};

export default ErrorController;
