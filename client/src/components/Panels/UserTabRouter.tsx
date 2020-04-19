import React, { FC } from "react";
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import TabRouterHeader from "./TabRouterHeader";
import TicketList from "../Lists/TicketList";
import Ticket from "../../types/Ticket";
import Project from "../../types/Project";

interface IProps {
  tabNames: string[];
  tickets: Ticket[];
  projects: Project[];
}

export const UserTabRouter: FC<IProps> = ({ tickets, tabNames, projects }) => {
  const { url } = useRouteMatch();

  return (
    <>
      <div className="row">
        <TabRouterHeader tabNames={tabNames} />

        <Redirect from={url} to={`${url}/projects`} />

        <Route path={`${url}/projects`}>
          {/* <ProjectList projects={projects} /> */}
        </Route>

        <Route path={`${url}/tickets`}>
          <TicketList tickets={tickets} allProjects={[]} addButton={false} />
        </Route>
      </div>
    </>
  );
};

export default UserTabRouter;
