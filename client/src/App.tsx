import React, { FC } from "react";
import { AppRouter } from "./utils/router";
import "./App.css";

const App: FC = () => {
  return (
    <>
      {/* <NavBar />
      <BreadCrumb /> */}
      <AppRouter />
      {/* <Footer /> */}
    </>
  );
};

export default App;
