import React, { FC } from "react";
import { User } from "../types/User";
import _ from "underscore";

interface IProps {
  setMembers: React.Dispatch<React.SetStateAction<User[]>>;
  members: User[];
  user: User;
}

export const UsersModalEntry: FC<IProps> = ({ user, setMembers, members }) => {
  console.log(members);
  const match: (id: string) => boolean = (id: string) => {
    return Boolean(members.find(m => m.id === id));
  };
  return (
    <div className="row">
      <label htmlFor={user.id}>
        <input
          id={user.id}
          name={user.fullName}
          type="checkbox"
          defaultChecked={match(user.id)}
          onChange={() => {
            !match(user.id)
              ? setMembers([...members, user])
              : setMembers(members.filter(p => p.id !== user.id));
          }}
        />
        <span>
          {user.fullName}
          <img
            className="circle"
            src={user.picture}
            width="32vh"
            height="32vh"
            alt={user.fullName}
          />
        </span>
      </label>
    </div>
  );
};
