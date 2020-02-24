import React, { FC, ChangeEvent } from "react";
import { User } from "../types/User";

interface IProps {
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  user: User;
}

export const UsersModalEntry: FC<IProps> = ({ user, isChecked, onChange }) => {
  return (
    <div className="row">
      <input
        id={user.id}
        type="checkbox"
        onChange={onChange}
        checked={isChecked}
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
    </div>
  );
};
