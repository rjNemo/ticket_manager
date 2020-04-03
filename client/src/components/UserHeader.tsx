import React, { FC } from "react";
import { Header } from "../components/Header";
import { UserAvatar } from "./UserAvatar";
import { Grid, makeStyles, Theme } from "@material-ui/core";

interface IProps {
  fullName: string;
  presentation: string;
  picture: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1),
    flexGrow: 1
  }
}));

export const UserHeader: FC<IProps> = ({ fullName, presentation, picture }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={2}>
          <UserAvatar picture={picture} alt="" />
        </Grid>
        <Grid item xs>
          <Header title={fullName} description={presentation} />
        </Grid>
      </Grid>
    </div>
  );
};
