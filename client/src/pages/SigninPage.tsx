import React, { FC } from "react";
import SignInSide from "../components/SignInSide";
import { useAuth0 } from "../authentication/auth0";
import { Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";

const SigninPage: FC = () => {
  const { isAuthenticated, user } = useAuth0();

  if (isAuthenticated) {
    // retrieve userId
    const { sub } = user;
    const uid = sub.split("|")[1];
    return <Redirect to={`${ROUTES.USERS}/${uid}`} />;
  } else {
    return <SignInSide />;
  }
};

export default SigninPage;
