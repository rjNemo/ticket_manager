import React, { FC, MouseEvent } from "react";
import { HorizontalCard } from "./HorizontalCard";
import { Button, Typography } from "@material-ui/core";
import { getRemainingdays } from "../../utils/methods";

interface IProps {
  title?: string;
  remainingDays?: string;
  validateTicket?: (event: MouseEvent) => void;
  link?: string;
}

const TicketCard: FC<IProps> = ({
  title,
  remainingDays,
  link = "#",
  validateTicket,
}) => {
  const Content: FC = () => {
    return (
      <Typography variant="body2" component="p">
        <span>
          Due in{" "}
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
      title={title}
      link={link}
      content={<Content />}
      actions={<Action />}
    />
  );
};

export default TicketCard;
