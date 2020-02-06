import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import * as creacteHistory from "history";
import { HomePage } from "../pages/HomePage";
import { UserPage } from "../pages/UserPage";
import { ProjectPage } from "../pages/ProjectPage";
import { TicketPage } from "../pages/TicketPage";

export const history = creacteHistory.createBrowserHistory();

export const AppRouter = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/users/:id">
            <UserPage />
          </Route>
          <Route path="/projects/:id">
            <ProjectPage />
          </Route>
          <Route path="/tickets/:id">
            <TicketPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
