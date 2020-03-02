import React, { FC } from "react";
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import { TabRouterHeader } from "./TabRouterHeader";
import { NewTicketForm } from "./NewTicketForm";
import { MemberList } from "./MemberList";
import { User } from "../types/User";
import { Ticket } from "../types/Ticket";

interface IProps {
  tabNames: string[];
  users: User[];
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  endingDate: string;
  setEndingDate: React.Dispatch<React.SetStateAction<string>>;
}

export const NewTicketTabRouter: FC<IProps> = ({
  tabNames,
  users,
  description,
  setDescription,
  title,
  setTitle,
  endingDate,
  setEndingDate
}) => {
  const { url } = useRouteMatch();
  return (
    <>
      <div className="row">
        <TabRouterHeader tabNames={tabNames} />

        <Redirect from={url} to={`${url}/details`} />

        <Route path={`${url}/details`}>
          <NewTicketForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            endingDate={endingDate}
            setEndingDate={setEndingDate}
          />
        </Route>

        <Route path={`${url}/members`}>
          <MemberList users={users} />
        </Route>
      </div>
    </>
  );
};
