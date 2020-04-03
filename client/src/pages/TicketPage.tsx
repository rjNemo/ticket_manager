import React, { FC } from "react";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Header } from "../components/Header";
import { AvatarList } from "../components/AvatarList";
import { TicketVM } from "../VM/TicketVM";
import { getRemainingdays } from "../utils/methods";

import {
  Container,
  makeStyles,
  Theme,
  Grid,
  Typography
} from "@material-ui/core";
import { Timer } from "@material-ui/icons";

interface IProps {
  viewModel: TicketVM;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1),
    flexGrow: 1
  },
  table: {
    minWidth: 650
  }
}));

export const TicketPage: FC<IProps> = ({ viewModel }) => {
  const {
    title,
    description,
    users,
    endingDate,
    project,
    status,
    category,
    impact,
    difficulty
  } = viewModel;
  const daysToEnd: number = getRemainingdays(endingDate);
  // let notes: string = "";
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <Header title={title} description={description} />
      </div>
      <AvatarList users={users} />

      <div className={classes.root}>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="h5" component="h5">
              <b>In project: </b>{" "}
              <Link to={`/projects/${project.id}`}>{project.title}</Link>
            </Typography>
          </Grid>
          <Grid item xs>
            <Timer /> <span>Due in {daysToEnd} days</span>
          </Grid>
        </Grid>
      </div>

      <div className={classes.root}>
        <InfoTable
          status={status}
          category={category}
          impact={impact}
          difficulty={difficulty}
        />
        {/* <textarea
            id="notes"
            className="materialize-textarea validate"
            value={notes}
            // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            //   setDescription(e.target.value)
            // }
          ></textarea> */}
      </div>
    </Container>
  );
};

interface InfoProps {
  status: string;
  category: string;
  impact: string;
  difficulty: string;
}

const InfoTable: FC<InfoProps> = (info: InfoProps) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Impact</TableCell>
            <TableCell>Difficulty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{info.status}</TableCell>
            <TableCell>{info.category}</TableCell>
            <TableCell>{info.impact}</TableCell>
            <TableCell>{info.difficulty}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
