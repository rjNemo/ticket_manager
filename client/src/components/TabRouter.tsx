import React, { FC } from "react";
import { TabRouterHeader } from "./TabRouterHeader";
import { TicketList } from "./TicketList";
import { Ticket } from "../types/Ticket";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

interface IProps {
  tickets: Ticket[];
  remainingDays?: number;
  tabNames: string[];
}

export const TabRouter: FC<IProps> = ({ tickets, remainingDays, tabNames }) => {
  const { url } = useRouteMatch();
  return (
    <>
      <Switch>
        <div className="row">
          <TabRouterHeader nTabs={tabNames.length} tabNames={tabNames} />

          <Redirect from={url} to={`${url}/tickets`} />

          <Route path={`${url}/tickets`}>
            <TicketList tickets={tickets} remainingDays={remainingDays} />
          </Route>

          <Route path={`${url}/files`}>
            {/* <TicketList tickets={tickets} /> */}
          </Route>

          <Route path={`${url}/activity`}>
            {/* <TicketList tickets={tickets} /> */}
          </Route>
        </div>
      </Switch>
    </>
  );
};
