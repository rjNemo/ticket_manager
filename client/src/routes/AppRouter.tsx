import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomeController from "../controllers/HomeController";
import ProjectController from "../controllers/ProjectController";
import UserController from "../controllers/UserController";
import TicketController from "../controllers/TicketController";
import NotFoundPage from "../pages/NotFoundPage";
import TestPage from "../pages/TestPage";
// import SigninPage from "../pages/SigninPage";
import * as ROUTES from "../constants/routes";

const AppRouter = () => {
  return (
    <Switch>
      <PrivateRoute path={ROUTES.TEST} component={TestPage} />
      <Route exact path={ROUTES.HOME} component={HomeController} />
      {/* <Route path={ROUTES.SIGN_IN} component={SigninPage} /> */}
      <PrivateRoute
        path={`${ROUTES.PROJECTS}/:id`}
        component={ProjectController}
      />
      <PrivateRoute
        path={`${ROUTES.TICKETS}/:id`}
        component={TicketController}
      />
      <PrivateRoute path={`${ROUTES.USERS}/:id`} component={UserController} />
      <Route path={ROUTES.NOT_FOUND} component={NotFoundPage} />
    </Switch>
  );
};

export default AppRouter;
