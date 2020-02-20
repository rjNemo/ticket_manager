import React, { FC } from "react";
import { Ticket } from "../types/Ticket";
import { FloatingButton } from "./FloatingButton";
import { HorizontalCard } from "./HorizontalCard";

type TicketListProps = {
  tickets: Ticket[];
  remainingDays?: number;
};

export const TicketList: FC<TicketListProps> = ({ tickets, remainingDays }) => {
  const archiveTicket = () => {};
  const validateTicket = () => {};

  return (
    <>
      <div className="row valign-wrapper">
        <h3>Tickets</h3>
        <FloatingButton color=" blue-grey lighten-4" size="big" />
      </div>
      <div className="col s12 grey">
        <ul>
          {tickets.map((t: Ticket) => (
            <li key={t.id}>
              <HorizontalCard
                title={t.title}
                remainingDays={remainingDays}
                validateTicket={validateTicket}
                archiveTicket={archiveTicket}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
