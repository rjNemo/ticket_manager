import React, { FC } from "react";

const InputField: FC = () => {
  return (
    <div className="input-field">
      <input id="email" type="text" className="validate" />
      <label htmlFor="email">Email</label>
    </div>
  );
};

export default InputField;
