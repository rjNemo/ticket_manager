import React, { FC } from "react";
// import { LogInForm } from "../components/LogInForm";
// import { ProfileSelector } from "../components/ProfileSelector";
import SignInSide from "../components/SignInSide";

const HomePage: FC = () => {
  return (
    // <div className="section">
    //   <div className="container center">
    //     <h1 className="center">Ticket Manager</h1>
    //     <div className="row">
    //       <div className="col s6">
    //         <ProfileSelector />
    //       </div>
    //       <div className="col s6">
    //         <LogInForm />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <SignInSide />
  );
};

export default HomePage;
