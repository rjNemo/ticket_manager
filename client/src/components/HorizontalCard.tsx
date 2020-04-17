import React, { FC, MouseEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getRemainingdays } from "../utils/methods";

interface IProps {
  title?: string;
  link?: string;
  content: ReactNode;
  actions?: ReactNode;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export const HorizontalCard: FC<IProps> = ({
  title,
  link = "#",
  content,
  actions,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          <Link to={link}>
            <b>{title ?? "Nothing to do"}</b>
          </Link>
        </Typography>
        {content}
      </CardContent>
      <CardActions>{actions}</CardActions>
    </Card>
  );
};
