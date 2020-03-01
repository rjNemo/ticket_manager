import React, { FC } from "react";
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import { TabRouterHeader } from "./TabRouterHeader";
import { NewTicketForm } from "./NewTicketForm";
import { MemberList } from "./MemberList";
import { User } from "../types/User";

interface IProps {
  tabNames: string[];
  users: User[];
}

export const NewTicketTabRouter: FC<IProps> = ({ tabNames, users }) => {
  const { url } = useRouteMatch();
  return (
    <>
      <div className="row">
        <TabRouterHeader tabNames={tabNames} />

        <Redirect from={url} to={`${url}/details`} />

        <Route path={`${url}/details`}>
          <NewTicketForm />
        </Route>

        <Route path={`${url}/members`}>
          <MemberList users={users} />
        </Route>
      </div>
    </>
  );
};
