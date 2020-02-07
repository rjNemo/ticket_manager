import React, { FC } from "react";
import { Ticket } from "../types/Ticket";

type TicketListProps = {
  tickets: Ticket[];
};

export const TicketList: FC<TicketListProps> = ({ tickets }) => {
  return (
    <div className="row">
      {tickets.map((t: Ticket) => (
        <li key={t.Id}>{t.Title}</li>
      ))}
    </div>
  );
};
