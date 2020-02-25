import React, { FC } from "react";
import { User } from "../types/User";

interface IProps {
  setMembers: React.Dispatch<React.SetStateAction<User[]>>;
  members: User[];
  user: User;
}

export const UsersModalEntry: FC<IProps> = ({ user, setMembers, members }) => {
  return (
    <div className="row">
      <label htmlFor={user.id}>
        <input
          id={user.id}
          name={user.fullName}
          type="checkbox"
          defaultChecked={members.includes(user)}
          onChange={() => {
            !members.includes(user)
              ? setMembers([...members, user])
              : setMembers(members.filter(p => p !== user));
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
