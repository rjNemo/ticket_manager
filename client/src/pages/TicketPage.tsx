import React, { FC } from "react";
import { Link } from "react-router-dom";
import { makeStyles, Theme, Grid, Typography } from "@material-ui/core";
import { Timer } from "@material-ui/icons";
import PageLayout from "../layouts/PageLayout";
import { TicketVM } from "../VM/TicketVM";
import { Header } from "../components/Header";
import { AvatarList } from "../components/Avatars/AvatarList";
import TicketChipsArray from "../components/Cards/TicketChipsArray";
import { getRemainingdays } from "../utils/methods";

interface IProps {
  viewModel: TicketVM;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1),
    // flexGrow: 1,
  },
  table: {
    margin: "auto",
    maxWidth: 650,
    alignItems: "center",
  },
  subtitle: {
    marginTop: 20,
  },
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
    difficulty,
  } = viewModel;
  const daysToEnd: number = getRemainingdays(endingDate);
  // let notes: string = "";
  const classes = useStyles();

  const Content: FC = () => {
    return (
      <>
        <AvatarList users={users} />

        <div className={classes.root}>
          <Grid container>
            <Grid item xs={9}>
              <Typography
                variant="h5"
                component="h5"
                className={classes.subtitle}
              >
                <b>Project: </b>
                <Link to={`/projects/${project.id}`}>{project.title}</Link>
              </Typography>
            </Grid>
            <Grid item xs>
              <Timer /> <span>Due in {daysToEnd} days</span>
            </Grid>
          </Grid>
        </div>

        <div className={classes.table}>
          {/* <InfoTable
            status={status}
            category={category}
            impact={impact}
            difficulty={difficulty}
          /> */}
          <TicketChipsArray
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
      </>
    );
  };
  return (
    <PageLayout
      header={<Header title={title} description={description} />}
      content={<Content />}
    />
  );
};

// interface InfoProps {
//   status: string;
//   category: string;
//   impact: string;
//   difficulty: string;
// }

// const InfoTable: FC<InfoProps> = (info: InfoProps) => {
//   const classes = useStyles();

//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Status</TableCell>
//             <TableCell>Category</TableCell>
//             <TableCell>Impact</TableCell>
//             <TableCell>Difficulty</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           <TableRow>
//             <TableCell>{info.status}</TableCell>
//             <TableCell>{info.category}</TableCell>
//             <TableCell>{info.impact}</TableCell>
//             <TableCell>{info.difficulty}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };
