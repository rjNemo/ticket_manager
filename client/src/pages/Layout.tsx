import React, { FC } from "react";
import { AppRouter } from "../utils/router";

const Layout: FC = () => {
  return (
    <>
      {/* <NavBar />
      <BreadCrumb /> */}
      <AppRouter />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
