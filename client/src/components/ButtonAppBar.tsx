import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { useAuth0 } from "../authentication/auth0";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function ButtonAppBar() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" href="/">
              BugBuster
            </Button>
          </Typography>
          {!isAuthenticated ? (
            <Button color="inherit" onClick={() => loginWithRedirect({})}>
              Log in
            </Button>
          ) : (
            <Button color="inherit" onClick={() => logout()}>
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
