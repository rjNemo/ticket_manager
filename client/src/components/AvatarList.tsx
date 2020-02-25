import React, { FC } from "react";
import { User } from "../types/User";

interface AvatarListProps {
  users: User[];
}

export const AvatarList: FC<AvatarListProps> = ({ users }) => {
  return users === undefined ? (
    <></>
  ) : (
    <>
      {users.map((user: User, i: number) => (
        <img
          key={i}
          className="circle"
          src={user.picture}
          width="32vh"
          height="32vh"
          alt={user.fullName}
        />
      ))}
    </>
  );
};
