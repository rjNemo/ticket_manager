import React, { FC, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import SendIcon from "@material-ui/icons/Send";
import User from "../types/User";
import InputField from "../components/InputField";
import PageLayout from "../layouts/PageLayout";
import UserHeader from "../components/UserHeader";
import { Button, Snackbar } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    input: {
      margin: theme.spacing(2, 0),
    },
  })
);

interface IProps {
  account: User;
}

const AccountPage: FC<IProps> = ({ account }) => {
  const classes = useStyles();

  const [firstName, setFirstname] = useState(account.firstName);
  const [lastName, setLastname] = useState(account.lastName);
  const [presentation, setPresentation] = useState(account.presentation);
  const [phone, setPhone] = useState(account.phone);

  // user should at least have a name
  const isDisabled = firstName === "" && lastName === "";
  const [showError, setShowError] = useState(isDisabled);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent default button behaviour
    e.preventDefault();

    // reinitialize inputfiled
    // setText("");
  };

  // error message
  const handleClose = (e?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setShowError(false);
  };

  return (
    <PageLayout
      header={
        <UserHeader
          picture={account.picture}
          fullName={account.fullName}
          presentation={account.presentation}
        />
      }
      content={
        <form onSubmit={handleSubmit}>
          <InputField
            label="First Name"
            state={firstName}
            setState={setFirstname}
            className={classes.input}
          />
          <InputField
            label="Last Name"
            state={lastName}
            setState={setLastname}
            className={classes.input}
          />
          <InputField
            label="Presentation"
            state={presentation}
            setState={setPresentation}
            multiline
            className={classes.input}
          />
          <InputField
            label="Phone"
            state={phone}
            setState={setPhone}
            className={classes.input}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isDisabled}
          >
            Update Info
          </Button>
          <Snackbar
            open={isDisabled}
            autoHideDuration={6000}
            // onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="warning">
              User should have at least a first or last name!
            </Alert>
          </Snackbar>
        </form>
      }
    />
  );
};

export default AccountPage;
