import React from "react";
import { AppBar } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {"© "}
      <Link color="inherit" href="/">
        BugBuster
      </Link>{" "}
      {new Date().getFullYear()}
      {". All Rights Reserved. Made with 🔥"}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800]
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">
          <Link
            color="inherit"
            href="https://github.com/rjNemo"
            target="_blank"
            rel="noopener"
          >
            Ruidy Nemausat
          </Link>{" "}
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}
