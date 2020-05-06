import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BugReportOutlinedIcon from "@material-ui/icons/BugReportOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useAuth0 } from "../authentication/auth0";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "90vh",
    },
    image: {
      backgroundImage: "url(https://source.unsplash.com/daily?dev)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    subTitle: {
      margin: theme.spacing(3, 0),
    },
  })
);

export default function SignInSide() {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <BugReportOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            BugBuster
          </Typography>
          <Typography component="h2" variant="h5" className={classes.subTitle}>
            Catch any Bugs on the Fly
          </Typography>
          <form className={classes.form} noValidate>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={() => loginWithRedirect({})}
            >
              Get Started
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
