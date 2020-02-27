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

interface IProps {
  tickets: Ticket[];
  remainingDays?: number;
  tabNames: string[];
  files: AppFile[];
  activities: Activity[];
}

export const TabRouter: FC<IProps> = ({
  tickets,
  tabNames,
  files,
  activities
}) => {
  const { url } = useRouteMatch();

  return (
    <>
      <div className="row">
        <TabRouterHeader tabNames={tabNames} />

        <Redirect from={url} to={`${url}/tickets`} />

        <Route path={`${url}/tickets`}>
          <TicketList tickets={tickets} />
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
