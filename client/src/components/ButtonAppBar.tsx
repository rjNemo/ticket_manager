import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  // IconButton,
  Toolbar,
  Typography,
  Avatar,
  List,
  ListItem,
  Popover,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import MenuIcon from "@material-ui/icons/Menu";
import BugReportIcon from "@material-ui/icons/BugReport";
import * as ROUTES from "../constants/routes";
import { useAuth0 } from "../authentication/auth0";
import { getUID } from "../authentication/helpers";

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
    typography: {
      padding: theme.spacing(2),
    },
  })
);

export default function ButtonAppBar() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchor(e.currentTarget);

  const handleClose = () => setAnchor(null);

  const open: boolean = !!anchor;
  const id = open ? "profile-popover" : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            <Button
              color="inherit"
              component={Link}
              to={ROUTES.HOME}
              startIcon={<BugReportIcon />}
            >
              BugBuster
            </Button>
          </Typography>
          {!isAuthenticated ? (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => loginWithRedirect({})}
            >
              Log in
            </Button>
          ) : (
            <>
              <Button
                aria-describedby={id}
                color="primary"
                onClick={handleClick}
              >
                <Avatar src={user.picture} />
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <List>
                  <ListItem>
                    <Button
                      color="inherit"
                      component={Link}
                      to={`${ROUTES.USERS}/${getUID(user)}`}
                      onClick={handleClose}
                    >
                      Profile
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      color="inherit"
                      component={Link}
                      to={ROUTES.ACCOUNT}
                      onClick={handleClose}
                    >
                      Edit Profile
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button color="inherit" onClick={() => logout()}>
                      Log out
                    </Button>
                  </ListItem>
                </List>
              </Popover>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
