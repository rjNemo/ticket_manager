import React, { FC, useState, ChangeEvent, MouseEvent } from "react";
import { UsersModalEntry } from "../Modals/UsersModalEntry";
import { FilterBar } from "../FilterBar";
import { User } from "../../types/User";

interface IProps {
  users: User[];
}

export const MemberList: FC<IProps> = ({ users }) => {
  const [members, setMembers] = useState<User[]>([]);
  const [filterText, setFilterText] = useState<string>("");
  const clearFilterText = (e: MouseEvent): void => {
    setFilterText("");
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
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
