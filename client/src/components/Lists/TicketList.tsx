import React, { FC, useState, ChangeEvent, MouseEvent } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import FloatingButton from "../Buttons/FloatingButton";
import FilterBar from "../FilterBar";
import TicketCard from "../Cards/TicketCard";
import NewTicketModal from "../Modals/NewTicketModal";
import Ticket from "../../types/Ticket";
import Project from "../../types/Project";
import { useAuth0 } from "../../authentication/auth0";
import { TicketService } from "../../services";

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

type TicketListProps = {
  tickets: Ticket[];
  allProjects: Project[];
  addButton?: Boolean;
};

const TicketList: FC<TicketListProps> = ({
  tickets,
  allProjects,
  addButton = true,
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
    (t) =>
      t.status !== "Done" &&
      t.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const { getTokenSilently } = useAuth0();

  const handleValidate = async (id: number) => {
    const token = await getTokenSilently();
    const Tickets = new TicketService(token);
    await Tickets.close(id.toString());
  };

  const classes = useStyles();

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
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.header}
        >
          <Typography variant="h4" component="h4">
            Tickets
            {addButton && (
              <span className={classes.addButton}>
                <FloatingButton
                  color="primary"
                  size="small"
                  onClick={onClick}
                />
              </span>
            )}
          </Typography>

          <FilterBar
            filterText={filterText}
            handleChange={handleChange}
            clearFilterText={clearFilterText}
          />
        </Grid>
        <Grid item xs={12}>
          {filteredTickets.length === 0 ? (
            <TicketCard />
          ) : (
            filteredTickets.map((t: Ticket) => (
              <TicketCard
                key={t.id}
                ticket={t}
                link={`/tickets/${t.id}`}
                validateTicket={() => {
                  handleValidate(t.id);
                }}
              />
            ))
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default TicketList;
