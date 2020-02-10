import React, { FC } from "react";
import { Ticket } from "../types/Ticket";
import { FloatingButton } from "./FloatingButton";
import { HorizontalCard } from "./HorizontalCard";

type TicketListProps = {
  tickets: Ticket[];
  tasksTotalCount?: number;
  tasksDone?: number;
  remainingDays?: number;
  avatars: string[];
};

export const TicketList: FC<TicketListProps> = ({
  tickets,
  tasksDone,
  tasksTotalCount,
  remainingDays,
  avatars
}) => {
  const archiveTicket = () => {};
  const validateTicket = () => {};

  return (
    <div className="col s12">
      <div className="row valign-wrapper">
        <div className="col s6 m4">
          <h2>Tickets</h2>
        </div>
        <div className="col s6 m8">
          <FloatingButton color="grey" size="big" />
        </div>
      </div>

      <ul>
        {tickets.map((t: Ticket) => (
          <li key={t.id}>
            <HorizontalCard
              title={t.title}
              tasksDone={tasksDone}
              tasksTotalCount={tasksTotalCount}
              remainingDays={remainingDays}
              avatars={avatars}
              validateTicket={validateTicket}
              archiveTicket={archiveTicket}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
