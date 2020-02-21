import React from "react";
import {
  Router,
  Route,
  Switch,
  Redirect
  //Link, NavLink
} from "react-router-dom";
import * as creacteHistory from "history";
// import { TicketPage } from "../pages/TicketPage";
// import { HomeController } from "../controllers/HomeController";
import { ProjectController } from "../controllers/ProjectController";
import { ErrorPage } from "../pages/ErrorPage";
// import { UserController } from "../controllers/UserController";
// import { TicketController } from "../controllers/TicketController";

export const history = creacteHistory.createBrowserHistory();

export const AppRouter = () => {
  return (
    <Router history={history}>
      <div className="grey lighten-4">
        <Switch>
          {/* <Route path="/">
            <HomeController />
          </Route>
          <Route path="/users/:id">
            <UserController />
          </Route> */}
          <Route path="/projects/:id">
            <ProjectController />
          </Route>
          {/* <Route path="/tickets/:id">
            <TicketController />
          </Route> */}

          <Route path="/error">
            <ErrorPage error="" />
          </Route>

          <Route path="*">
            <Redirect to="/error" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
