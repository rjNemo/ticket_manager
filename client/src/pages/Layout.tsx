import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { AppRouter } from "../utils/router";
import ButtonAppBar from "../components/ButtonAppBar";
import Footer from "../components/Footer";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  }
}));

export default function Layout() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header>
        <ButtonAppBar />
      </header>
      {/* <BreadCrumb /> */}
      <CssBaseline />
      <AppRouter />
      <Footer />
    </div>
  );
}
