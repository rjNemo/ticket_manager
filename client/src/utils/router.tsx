import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomeController } from "../controllers/HomeController";
import { ProjectController } from "../controllers/ProjectController";
import { UserController } from "../controllers/UserController";
import { TicketController } from "../controllers/TicketController";
import { NotFoundPage } from "../pages/NotFoundPage";

export const AppRouter = () => {
  return (
    <Switch>
      {/* <PrivateRoute exact path="/test">
        <TestPage />
      </PrivateRoute> */}

      <Route exact path="/">
        <HomeController />
      </Route>

      <Route path="/users/:id">
        <UserController />
      </Route>

      <Route path="/projects/:id">
        <ProjectController />
      </Route>

      <Route path="/tickets/:id">
        <TicketController />
      </Route>

      <Route path="/404">
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
