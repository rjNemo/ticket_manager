import React, { FC } from "react";

import PasswordField from "./PasswordField";
import Button from "./Buttons/Button";

export const LogInForm: FC = () => {
  return (
    <div className="section col s10 offset-s1 white z-depth-1">
      <div className="row ">
        <div className="center ">
          <h4>Login</h4>
          <form className="col s10 offset-s1">
            <></>
            {/* <InputField /> */}
            <PasswordField />
            <Button color="indigo" size="large">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
