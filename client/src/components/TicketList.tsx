import React, { FC, useState, ChangeEvent, MouseEvent } from "react";
import { Ticket } from "../types/Ticket";
import { FloatingButton } from "./FloatingButton";
import { HorizontalCard } from "./HorizontalCard";
import { FilterBar } from "./FilterBar";

type TicketListProps = {
  tickets: Ticket[];
};

export const TicketList: FC<TicketListProps> = ({ tickets }) => {
  const [filterText, setFilterText] = useState<string>("");
  const clearFilterText: (e: MouseEvent) => void = (e: MouseEvent) => {
    setFilterText("");
  };
  const archiveTicket = () => {};
  const validateTicket = () => {};
  const onClick: (e: MouseEvent) => void = (e: MouseEvent) => {
    e.preventDefault();
  };
  const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(e.target.value);
  };

  return (
    <>
      <div className="row valign-wrapper">
        <h3>Tickets</h3>
        <FloatingButton
          color=" blue-grey lighten-4"
          size="small"
          onClick={onClick}
        />
        <FilterBar
          filterText={filterText}
          handleChange={handleChange}
          clearFilterText={clearFilterText}
        />
      </div>
      <div className="col s12 grey">
        <ul>
          {tickets
            .filter(t =>
              t.title.toLowerCase().includes(filterText.toLowerCase())
            )
            .map((t: Ticket) => (
              <li key={t.id}>
                <HorizontalCard
                  title={t.title}
                  remainingDays={t.plannedEnding}
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
