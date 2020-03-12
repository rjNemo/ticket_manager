import React from "react";
import {
  Router,
  Route,
  Switch
  // Redirect
  //Link, NavLink
} from "react-router-dom";
import * as creacteHistory from "history";
// import { HomeController } from "../controllers/HomeController";
import { ProjectController } from "../controllers/ProjectController";
import { UserController } from "../controllers/UserController";
import { TicketController } from "../controllers/TicketController";
import { NotFoundPage } from "../pages/NotFoundPage";
import { TestPage } from "../pages/TestPage";

export const history = creacteHistory.createBrowserHistory();

export const AppRouter = () => {
  return (
    <Router history={history}>
      <div className="grey lighten-3">
        <Switch>
          <Route exact path="/">
            <TestPage />
          </Route>

          {/* <Route path="/">
            <HomeController />
          </Route> */}
          <Route path="/users/:id">
            <UserController />
          </Route>
          <Route path="/projects/:id">
            <ProjectController />
          </Route>
          <Route path="/tickets/:id">
            <TicketController />
          </Route>

          <Route path="/401">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
