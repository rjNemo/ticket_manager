import React, { FC } from "react";

const PasswordField: FC = () => {
  return (
    <div className="input-field">
      <input id="password" type="password" className="validate" />
      <label htmlFor="password">Password</label>
    </div>
  );
};

export default PasswordField;
