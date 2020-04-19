import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AvatarList from "../Avatars/AvatarList";
import FilterBar from "../FilterBar";
import Modal from "./Modal";
import User from "../../types/User";
import { patch } from "../../utils/http";
import Constants from "../../utils/Constants";

interface IProps {
  show: boolean;
  users: User[];
  allUsers: User[];
  handleClose(): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const UsersModal: FC<IProps> = ({ show, handleClose, users, allUsers }) => {
  const { id } = useParams();

  const [filterText, setFilterText] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilterText(e.target.value);
  };

  const memberIDs = users.map((u) => u.id);
  const [members, setMembers] = useState<string[]>(memberIDs);

  const handleToggle = (value: string) => () => {
    const currentIndex = members.indexOf(value);
    const newChecked = [...members];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setMembers(newChecked);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await patch<User[]>(
      `${Constants.projectsURI}/${id}/members`,
      members //.map((m) => m.id)
    );
    handleClose();
  };

  const classes = useStyles();

  return (
    <Modal
      name="Manage Users"
      show={show}
      handleClose={handleClose}
      action="Submit"
      handleAction={handleSubmit}
    >
      <Grid container justify="center">
        <AvatarList users={users} />
        <FilterBar
          filterText={filterText}
          clearFilterText={() => setFilterText("")}
          handleChange={handleChange}
        />
      </Grid>
      <Grid container justify="center">
        <List dense className={classes.root}>
          {allUsers.map((u: User) => (
            <ListItem key={u.id}>
              <ListItemAvatar>
                <Avatar alt={u.fullName} src={u.picture} />
              </ListItemAvatar>
              <ListItemText id={u.id} primary={u.fullName} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(u.id)}
                  checked={members.indexOf(u.id) !== -1}
                  inputProps={{ "aria-labelledby": `checkbox-${u.id}` }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Modal>
  );
};

export default UsersModal;
