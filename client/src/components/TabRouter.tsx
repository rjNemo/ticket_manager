import React, { FC } from "react";
import { TabRouterHeader } from "./TabRouterHeader";
import { TicketList } from "./TicketList";
import { Ticket } from "../types/Ticket";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

interface IProps {
  tickets: Ticket[];
  tasksTotalCount?: number;
  tasksDone?: number;
  remainingDays?: number;
  avatars: string[];
}

export const TabRouter: FC<IProps> = ({
  tickets,
  tasksDone,
  tasksTotalCount,
  remainingDays,
  avatars
}) => {
  const { url } = useRouteMatch();
  return (
    <>
      <Switch>
        <div className="row">
          <TabRouterHeader />

          <Redirect from={url} to={`${url}/tickets`} />

          <Route path={`${url}/tickets`}>
            <TicketList
              tickets={tickets}
              tasksDone={tasksDone}
              tasksTotalCount={tasksTotalCount}
              remainingDays={remainingDays}
              avatars={avatars}
            />
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
