import React, { FC, useState } from "react";
import { Button, Snackbar } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import User from "../types/User";
import InputField from "../components/InputField";
import PageLayout from "../layouts/PageLayout";
import UserHeader from "../components/UserHeader";
import { UserService } from "../services";

const useStyles = makeStyles((theme) =>
  createStyles({
    input: {
      marginBottom: theme.spacing(2),
    },
  })
);

interface IProps {
  account: User;
  token: string;
}

const AccountPage: FC<IProps> = ({ account, token }) => {
  const classes = useStyles();

  const [firstName, setFirstname] = useState(account.firstName);
  const [lastName, setLastname] = useState(account.lastName);
  const [presentation, setPresentation] = useState(account.presentation);
  const [phone, setPhone] = useState(account.phone);

  // user should at least have a name
  const isDisabled = firstName === "" && lastName === "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent default button behaviour
    e.preventDefault();
    // send data to API
    const Users = new UserService(token);
    const newUser: User = {
      id: account.id,
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName} ${lastName}`,
      email: account.email,
      presentation: presentation,
      picture: account.picture,
      phone,
      creationDate: Date.now().toLocaleString(),
      activities: account.activities,
      projects: account.projects,
      tickets: account.tickets,
    };
    Users.update(account.id, newUser)
      .then(() => console.log("ok"))
      .catch((err) => console.error(err));
    // reinitialize inputfiled
    // setText("");
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
          <Snackbar open={isDisabled} autoHideDuration={6000}>
            <Alert severity="warning">
              User should have at least a first or last name!
            </Alert>
          </Snackbar>
        </form>
      }
    />
  );
};

export default AccountPage;
