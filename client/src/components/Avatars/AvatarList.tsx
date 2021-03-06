import React, { FC } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Theme, createStyles, Avatar } from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import User from "../../types/User";

interface AvatarListProps {
  users: User[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  })
);

export const AvatarList: FC<AvatarListProps> = ({ users }) => {
  const classes = useStyles();
  return users === undefined ? (
    <></>
  ) : (
    <div className={classes.root}>
      <AvatarGroup max={5}>
        {users.map((user: User, i: number) => (
          <Link to={`/users/${user.id}`} key={i}>
            <Avatar src={user.picture} alt={user.fullName} />
          </Link>
        ))}
      </AvatarGroup>
    </div>
  );
};

export default AvatarList;
