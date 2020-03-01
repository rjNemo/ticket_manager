import React, { FC, useState, ChangeEvent, MouseEvent } from "react";
import { Ticket } from "../types/Ticket";
import { FloatingButton } from "./FloatingButton";
import { HorizontalCard } from "./HorizontalCard";
import { FilterBar } from "./FilterBar";
import { put } from "../utils/http";
import { Constants } from "../utils/Constants";
import { HttpResponse } from "../types/HttpResponse";
import { Project } from "../types/Project";

type IProps = {
  projects: Project[];
};

export const ProjectList: FC<IProps> = ({ projects }) => {
  const [filterText, setFilterText] = useState<string>("");
  const clearFilterText: (e: MouseEvent) => void = (e: MouseEvent) => {
    setFilterText("");
  };
  // const archiveTicket = () => {};

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
  let filteredTickets = projects.filter(
    t =>
      t.status !== "Done" &&
      t.title.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <>
      <div className="row valign-wrapper">
        <h3>Projects</h3>
        <FloatingButton
          color="indigo lighten-1"
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
                // archiveTicket={archiveTicket}
              />
            ))
          )}
        </ul>
      </div>
    </>
  );
};
