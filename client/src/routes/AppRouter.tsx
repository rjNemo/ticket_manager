import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomeController } from "../controllers/HomeController";
import { ProjectController } from "../controllers/ProjectController";
import { UserController } from "../controllers/UserController";
import { TicketController } from "../controllers/TicketController";
import { NotFoundPage } from "../pages/NotFoundPage";
import { TestPage } from "../pages/TestPage";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  return (
    <Switch>
      <PrivateRoute path="/test" component={TestPage} />

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
