import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  brand: string;
  text: string;
}

const copyParams: IProps = {
  brand: "BugBuster",
  text: "Made with 🔥",
};

const Copyright: FC<IProps> = ({ brand, text }) => {
  return (
    <Typography variant="body2" color="textSecondary">
      {"© "}
      <Link color="inherit" component={RouterLink} to="/">
        {brand}
      </Link>{" "}
      {new Date().getFullYear()}
      {`. All Rights Reserved. ${text}`}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">
          <Link
            color="inherit"
            href="https://github.com/rjNemo"
            target="_blank"
            rel="noopener"
          >
            Ruidy Nemausat
          </Link>{" "}
        </Typography>
        <Copyright brand={copyParams.brand} text={copyParams.text} />
      </Container>
    </footer>
  );
}
