import React, { FC, ReactNode } from "react";
import { makeStyles, Theme, Container } from "@material-ui/core";

/**
 * @function useStyles creates the css styles used in the following component.
 */
const useStyles = makeStyles((theme: Theme) => ({
  // root style allow for fixed footer
  header: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    flexGrow: 1,
  },
  content: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

interface IProps {
  header: ReactNode;
  content: ReactNode;
}

/**
 * PageLayout divide the page in 2 parts: Header and Content, to ensure cohesion.
 *
 * @param Header - The encapsulated component.
 * @param Content - The encapsulated component.
 */
const PageLayout: FC<IProps> = ({ header, content }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <div className={classes.header}>{header}</div>
      <div className={classes.content}>{content}</div>
    </Container>
  );
};

export default PageLayout;
