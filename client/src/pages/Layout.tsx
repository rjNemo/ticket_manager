import React, { FC } from "react";
import { AppRouter } from "../utils/router";
import { NavBar } from "../components/Navbar";

const Layout: FC = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      {/* <BreadCrumb /> */}
      <AppRouter />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
