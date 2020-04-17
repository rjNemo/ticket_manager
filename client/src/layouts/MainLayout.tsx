import React, { FC } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import ButtonAppBar from "../components/ButtonAppBar";
import Footer from "../components/Footer";

/**
 * @function useStyles creates the css styles used in the following component.
 */
const useStyles = makeStyles((theme) => ({
  // root style allow for fixed footer
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}));

/**
 * MainLayout is the principal page layout. It mainly ensure the footer is fixed
 * to the page bottom.
 *
 * @param children - The encapsulated component.
 */
const MainLayout: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header>
        <ButtonAppBar />
      </header>
      {/* <BreadCrumb /> */}
      <CssBaseline />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
