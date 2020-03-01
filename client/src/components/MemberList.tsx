import React, { FC, useState, ChangeEvent, MouseEvent } from "react";
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
import { UsersModalEntry } from "./UsersModalEntry";
import { FilterBar } from "./FilterBar";

interface IProps {
  users: User[];
}

export const MemberList: FC<IProps> = ({ users }) => {
  const [members, setMembers] = useState<User[]>([]);
  const [filterText, setFilterText] = useState<string>("");
  const clearFilterText: (e: MouseEvent) => void = (e: MouseEvent) => {
    setFilterText("");
  };
  const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(e.target.value);
  };
  return (
    <>
      <FilterBar
        filterText={filterText}
        clearFilterText={clearFilterText}
        handleChange={handleChange}
      />
      <ul>
        {users.map((u: User) => (
          <li key={u.id}>
            <UsersModalEntry
              user={u}
              members={members}
              setMembers={setMembers}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
