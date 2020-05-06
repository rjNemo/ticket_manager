import React, { FC } from "react";
import { TextField } from "@material-ui/core";

interface IProps {
  label: string;
  type?: string;
  state: string;
  className?: string;
  multiline?: boolean;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const InputField: FC<IProps> = ({
  label,
  type = "text",
  multiline = false,
  state,
  setState,
  className,
}) => {
  // update text after user input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState(e.target.value);
  };

  return (
    <TextField
      label={label}
      value={state}
      onChange={handleChange}
      color="primary"
      variant="outlined"
      fullWidth
      type={type}
      multiline={multiline}
      size="small"
      // autoFocus
      className={className}
    />
  );
};

export default InputField;
