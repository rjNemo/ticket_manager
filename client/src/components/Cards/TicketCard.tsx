import React, { FC, MouseEvent } from "react";
import { Button, Typography, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import CategoryIcon from "@material-ui/icons/Category";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import SpeedIcon from "@material-ui/icons/Speed";
import { HorizontalCard } from "./HorizontalCard";
import { Ticket } from "../../types/Ticket";
import { getRemainingdays } from "../../utils/methods";

interface IProps {
  ticket?: Ticket;
  validateTicket?: (event: MouseEvent) => void;
  link?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0,
      marginTop: 20,
      marginBottom: 20,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

const TicketCard: FC<IProps> = ({ link = "#", validateTicket, ticket }) => {
  const ChipsArray: FC = () => {
    const classes = useStyles();
    const chipData = [
      // { label: "status", value: ticket?.status },
      { label: "category", value: ticket?.category },
      { label: "impact", value: ticket?.impact },
      { label: "difficulty", value: ticket?.difficulty },
    ];

    return (
      // <Paper component="ul" className={classes.root}>
      <Grid component="ul" className={classes.root}>
        {chipData.map((data, i: number) => {
          let icon = <CategoryIcon />;
          let color:
            | "inherit"
            | "default"
            | "primary"
            | "secondary"
            | undefined;

          if (data.label === "impact") {
            color = "primary";
            icon = <PriorityHighIcon />;
          }
          if (data.label === "difficulty") {
            color = "secondary";
            icon = <SpeedIcon />;
          }

          return (
            <li key={i}>
              <Chip
                icon={icon}
                color={color}
                label={data.value}
                className={classes.chip}
              />
            </li>
          );
        })}
      </Grid>
    );
  };

  const Content: FC = () => {
    return (
      <Grid container justify="space-between" alignItems="center">
        <ChipsArray />
        <Typography variant="body2" component="p">
          <span>
            Due in{" "}
            {ticket?.endingDate ? (
              getRemainingdays(ticket?.endingDate)
            ) : (
              <span>
                <del>Too much</del> 0
              </span>
            )}{" "}
            days
          </span>
        </Typography>
      </Grid>
    );
  };

  const Action = () => {
    return (
      <>
        <Button size="small" onClick={validateTicket}>
          Mark as done
        </Button>
      </>
    );
  };

  return (
    <HorizontalCard
      title={ticket?.title}
      link={link}
      content={<Content />}
      actions={<Action />}
    />
  );
};

export default TicketCard;
