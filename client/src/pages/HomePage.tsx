import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import SignInSide from "../components/SignInSide";
import { useAuth0 } from "../authentication/auth0";
import { getUID } from "../authentication/helpers";
import * as ROUTES from "../constants/routes";

const HomePage: FC = () => {
  const { isAuthenticated, user } = useAuth0();

  if (isAuthenticated) {
    // retrieve userId
    const uid = getUID(user);
    return <Redirect to={`${ROUTES.USERS}/${uid}`} />;
  } else {
    return <SignInSide />;
  }
};

export default HomePage;
