import React, { FC } from "react";
import { TabRouterHeader } from "./TabRouterHeader";
import { TicketList } from "./TicketList";
import { FileList } from "./AppFileList";
import { Ticket } from "../types/Ticket";
import { AppFile } from "../types/AppFile";
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import { ActivityList } from "./ActivityList";
import { Activity } from "../types/Activity";
import { NewTicketModal } from "./NewTicketModal";
import { User } from "../types/User";

interface IProps {
  tickets: Ticket[];
  remainingDays?: number;
  tabNames: string[];
  files: AppFile[];
  activities: Activity[];
  allUsers: User[];
}

export const TabRouter: FC<IProps> = ({
  tickets,
  tabNames,
  files,
  activities,
  allUsers
}) => {
  const { url } = useRouteMatch();

  return (
    <>
      <div className="row">
        <TabRouterHeader tabNames={tabNames} />

        <Redirect from={url} to={`${url}/tickets`} />

        <Route path={`${url}/tickets`}>
          <TicketList tickets={tickets} users={allUsers} />
        </Route>

        <Route path={`${url}/files`}>
          <FileList files={files} />
        </Route>

        <Route path={`${url}/activity`}>
          <ActivityList activities={activities} />
        </Route>
      </div>
    </>
  );
};
