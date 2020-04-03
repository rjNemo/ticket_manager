import React, { FC, MouseEvent } from "react";
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
  remainingDays?: string;
  validateTicket?: (event: MouseEvent) => void;
  link?: string;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export const HorizontalCard: FC<IProps> = ({
  title,
  remainingDays,
  link = "#",
  validateTicket
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

        <Typography variant="body2" component="p">
          <span>
            Due{" "}
            {remainingDays ? (
              getRemainingdays(remainingDays)
            ) : (
              <span>
                <del>Too much</del> 0
              </span>
            )}{" "}
            days
          </span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={validateTicket}>
          Mark as done
        </Button>
      </CardActions>
    </Card>
  );
};
