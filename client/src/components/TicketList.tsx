import React, { FC, useState, ChangeEvent, MouseEvent } from "react";
import { Ticket } from "../types/Ticket";
import { FloatingButton } from "./FloatingButton";
import { HorizontalCard } from "./HorizontalCard";
import { FilterBar } from "./FilterBar";
import { HttpResponse } from "../types/HttpResponse";
import { put } from "../utils/http";
import { Constants } from "../utils/Constants";
import { NewTicketModal } from "./NewTicketModal";
import { Project } from "../types/Project";

type TicketListProps = {
  tickets: Ticket[];
  allProjects: Project[];
  addButton?: Boolean;
};

export const TicketList: FC<TicketListProps> = ({
  tickets,
  allProjects,
  addButton = true
}) => {
  const [filterText, setFilterText] = useState<string>("");
  const clearFilterText: (e: MouseEvent) => void = (e: MouseEvent) => {
    setFilterText("");
  };

  const onClick: (e: MouseEvent) => void = (e: MouseEvent) => {
    e.preventDefault();
    setShowNew(true);
  };
  const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(e.target.value);
  };

  const [showNew, setShowNew] = useState(false);
  let filteredTickets = tickets.filter(
    t =>
      t.status !== "Done" &&
      t.title.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <>
      <div className="row valign-wrapper">
        <NewTicketModal
          handleClose={() => {
            setShowNew(false);
          }}
          show={showNew}
          allProjects={allProjects}
        />
        <h3>Tickets</h3>
        {addButton && (
          <FloatingButton
            color="indigo lighten-3"
            size="small"
            onClick={onClick}
          />
        )}
        <FilterBar
          filterText={filterText}
          handleChange={handleChange}
          clearFilterText={clearFilterText}
        />
      </div>
      <div className="col s12 grey lighten-1">
        <ul>
          {filteredTickets.length === 0 ? (
            <HorizontalCard />
          ) : (
            filteredTickets.map((t: Ticket) => (
              <HorizontalCard
                key={t.id}
                title={t.title}
                remainingDays={t.endingDate}
                validateTicket={async (e: MouseEvent) => {
                  e.preventDefault();
                  await put<HttpResponse<Ticket>>(
                    `${Constants.ticketsURI}/${t.id}/closed`,
                    {}
                  );
                }}
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
};
