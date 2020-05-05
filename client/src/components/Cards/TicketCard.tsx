import React, { FC, MouseEvent } from "react";
import { Button, Typography, Grid } from "@material-ui/core";
import HorizontalCard from "./HorizontalCard";
import TicketChipsArray from "./TicketChipsArray";
import Ticket from "../../types/Ticket";
import getRemainingdays from "../../utils/methods";

interface IProps {
  ticket?: Ticket;
  validateTicket?: (event: MouseEvent) => void;
  link?: string;
}

const TicketCard: FC<IProps> = ({
  link = "#",
  validateTicket,
  ticket = {} as Ticket,
}) => {
  const Content: FC = () => {
    return (
      <Grid container justify="space-between" alignItems="center">
        <TicketChipsArray
          status={ticket.status}
          category={ticket.category}
          impact={ticket.impact}
          difficulty={ticket.difficulty}
        />
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
