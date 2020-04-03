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
import { Grid, Typography } from "@material-ui/core";

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
  const clearFilterText = (e: MouseEvent): void => {
    setFilterText("");
  };

  const onClick = (e: MouseEvent): void => {
    e.preventDefault();
    setShowNew(true);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
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
      <NewTicketModal
        handleClose={() => {
          setShowNew(false);
        }}
        show={showNew}
        allProjects={allProjects}
      />

      <Grid container>
        <Grid item xs>
          <Typography variant="h4" component="h4">
            Tickets
          </Typography>
        </Grid>
        <Grid item xs>
          {addButton && (
            <FloatingButton color="primary" size="small" onClick={onClick} />
          )}
        </Grid>
        <Grid item xs={4}>
          <FilterBar
            filterText={filterText}
            handleChange={handleChange}
            clearFilterText={clearFilterText}
          />
        </Grid>
        <Grid item xs={12}>
          <div className="col s12 grey lighten-1">
            {filteredTickets.length === 0 ? (
              <HorizontalCard />
            ) : (
              filteredTickets.map((t: Ticket) => (
                <HorizontalCard
                  key={t.id}
                  title={t.title}
                  remainingDays={t.endingDate}
                  link={`/tickets/${t.id}`}
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
          </div>
        </Grid>
      </Grid>
    </>
  );
};
