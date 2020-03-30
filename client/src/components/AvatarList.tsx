import React, { FC } from "react";
import { User } from "../types/User";
import { Link } from "react-router-dom";

interface AvatarListProps {
  users: User[];
}

export const AvatarList: FC<AvatarListProps> = ({ users }) => {
  return users === undefined ? (
    <></>
  ) : (
    <>
      {users.map((user: User, i: number) => (
        <Link to={`/users/${user.id}`} key={i}>
          <img
            className="circle"
            src={user.picture}
            width="32vh"
            height="32vh"
            alt={user.fullName}
          />
        </Link>
      ))}
    </>
  );
};
