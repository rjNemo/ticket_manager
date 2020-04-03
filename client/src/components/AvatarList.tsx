import React, { FC } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { User } from "../types/User";

interface AvatarListProps {
  users: User[];
}

export const AvatarList: FC<AvatarListProps> = ({ users }) => {
  return users === undefined ? (
    <></>
  ) : (
    <>
      <AvatarGroup max={2}>
        {users.map((user: User, i: number) => (
          <Link to={`/users/${user.id}`} key={i}>
            <Avatar src={user.picture} alt={user.fullName} />
          </Link>
        ))}
      </AvatarGroup>
    </>
  );
};
