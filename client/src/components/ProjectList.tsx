import React, { FC, useState, ChangeEvent, MouseEvent } from "react";
import {
  Typography,
  Grid,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import { HorizontalCard } from "./HorizontalCard";
import { FilterBar } from "./FilterBar";
import { Ticket } from "../types/Ticket";
import { HttpResponse } from "../types/HttpResponse";
import { Project } from "../types/Project";
import { put } from "../utils/http";
import { Constants } from "../utils/Constants";
import ProjectCard from "./ProjectCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      paddingBottom: theme.spacing(2),
    },
  })
);

type IProps = {
  projects: Project[];
};

export const ProjectList: FC<IProps> = ({ projects }) => {
  const [filterText, setFilterText] = useState<string>("");
  const clearFilterText: (e: MouseEvent) => void = (e: MouseEvent) => {
    setFilterText("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilterText(e.target.value);
  };

  let filteredTickets = projects.filter(
    (t) =>
      t.status !== "Done" &&
      t.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const classes = useStyles();

  return (
    <Grid container>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.header}
      >
        <Typography variant="h4" component="h4">
          Projects
        </Typography>
        <FilterBar
          filterText={filterText}
          handleChange={handleChange}
          clearFilterText={clearFilterText}
        />
      </Grid>
      <Grid item xs={12}>
        <div className="col s12 grey lighten-1">
          {filteredTickets.length === 0 ? (
            <ProjectCard />
          ) : (
            filteredTickets.map((t: Project) => (
              <ProjectCard
                key={t.id}
                title={t.title}
                remainingDays={t.endingDate}
                link={`/projects/${t.id}`}
                // validateTicket={async (e: MouseEvent) => {
                //   e.preventDefault();
                //   await put<HttpResponse<Ticket>>(
                //     `${Constants.ticketsURI}/${t.id}/closed`,
                //     {}
                //   );
                // }}
              />
            ))
          )}
        </div>
      </Grid>
    </Grid>
  );
};
