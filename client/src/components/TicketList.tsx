import React, { FC } from "react";
import { Ticket } from "../types/Ticket";

type TicketListProps = {
  tickets?: Ticket[];
};

export const TicketList: FC<TicketListProps> = ({
  tickets = [
    { Id: 1, Title: "Todo today" },
    { Id: 2, Title: "Todo tomorrow" },
    { Id: 5, Title: "Todo NOW!!!" }
  ]
}) => {
  return (
    <div className="row">
      {tickets.map((t: Ticket) => (
        <li key={t.Id}>{t.Title}</li>
      ))}
    </div>
  );
};
