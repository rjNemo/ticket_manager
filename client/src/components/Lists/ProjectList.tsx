import React, { FC, useState, ChangeEvent, MouseEvent } from "react";
import {
  Typography,
  Grid,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import FilterBar from "../FilterBar";
import ProjectCard from "../Cards/ProjectCard";
import FloatingButton from "../Buttons/FloatingButton";
import NewProjectModal from "../Modals/NewProjectModal";
import Project from "../../types/Project";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      paddingBottom: theme.spacing(2),
    },
    addButton: {
      position: "relative",
      marginLeft: "20px",
    },
  })
);

type IProps = {
  projects: Project[];
};

const ProjectList: FC<IProps> = ({ projects }) => {
  const [filterText, setFilterText] = useState<string>("");
  const clearFilterText: (e: MouseEvent) => void = (e: MouseEvent) => {
    setFilterText("");
  };
  const [showNew, setShowNew] = useState(false);
  const onClick = (e: MouseEvent): void => {
    e.preventDefault();
    setShowNew(true);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilterText(e.target.value);
  };

  let filteredProjects = projects.filter(
    (t) =>
      t.status !== "Done" &&
      t.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const classes = useStyles();

  return (
    <>
      <NewProjectModal
        handleClose={() => {
          setShowNew(false);
        }}
        show={showNew}
      />
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
            <span className={classes.addButton}>
              <FloatingButton color="primary" size="small" onClick={onClick} />
            </span>
          </Typography>
          <FilterBar
            filterText={filterText}
            handleChange={handleChange}
            clearFilterText={clearFilterText}
          />
        </Grid>
        <Grid item xs={12}>
          <div className="col s12 grey lighten-1">
            {filteredProjects.length === 0 ? (
              <ProjectCard />
            ) : (
              filteredProjects.map((t: Project) => (
                <ProjectCard
                  key={t.id}
                  title={t.title}
                  remainingDays={t.endingDate}
                  link={`/projects/${t.id}`}
                  members={t.users}
                  progress={t.progression}
                  ticketsNumber={t.tickets === undefined ? 0 : t.tickets.length}
                  ticketsDone={
                    t.tickets === undefined
                      ? 0
                      : t.tickets.filter((t) => t.status === "Done").length
                  }
                />
              ))
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectList;
