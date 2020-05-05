import React, { FC, useState, FormEvent } from "react";
import { useRouteMatch } from "react-router-dom";
import {
  TextField,
  MenuItem,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Modal from "./Modal";
import Project from "../../types/Project";
import Category from "../../types/enums/category";
import Impact from "../../types/enums/impact";
import Difficulty from "../../types/enums/difficulty";
import { TicketService } from "../../services";
import { useAuth0 } from "../../authentication/auth0";
import { getUID } from "../../authentication/helpers";
import { today } from "../../utils/methods";
import Preloader from "../Preloader";

interface IProps {
  show: boolean;
  handleClose: () => void;
  allProjects: Project[];
}

const useStyles = makeStyles((theme: Theme) => ({
  select: {
    width: 120,
  },
}));

const NewTicketModal: FC<IProps> = ({ show, handleClose, allProjects }) => {
  const { getTokenSilently, user } = useAuth0();
  const { url } = useRouteMatch();
  const id = url.split("/")[2];
  const [projectId, setProjectId] = useState(id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endingDate, setEndingDate] = useState(today());
  const [categoryID, setCategoryID] = useState(1);
  const [impactID, setImpactID] = useState(1);
  const [difficultyID, setDifficultyID] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let newTicket = {
      title: title,
      description: description,
      endingDate: new Date(endingDate).toISOString(),
      creatorId: getUID(user),
      projectId: parseInt(projectId),
      impact: impactID,
      difficulty: difficultyID,
      category: categoryID,
    };

    const token = await getTokenSilently();
    const Tickets = new TicketService(token);
    Tickets.add(newTicket).catch((err) => console.error(err));
    setLoading(false);
    setTitle("");
    setDescription("");
    setEndingDate(today());
    setCategoryID(1);
    setImpactID(1);
    setDifficultyID(1);
    handleClose();
  };

  const classes = useStyles();
  return loading ? (
    <Preloader />
  ) : (
    <Modal
      name="New Ticket"
      show={show}
      handleClose={handleClose}
      action="New Ticket"
      handleAction={handleSubmit}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        value={title}
        label="Title"
        name="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        autoFocus
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="description"
        value={description}
        label="Description"
        name="text"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
        multiline
      />

      <TextField
        id="project"
        name="project"
        select
        fullWidth
        required
        label="Project"
        value={projectId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          setProjectId(e.target.value);
        }}
        // helperText="Please select your currency"
        variant="outlined"
        margin="normal"
      >
        {allProjects.map((p) => (
          <MenuItem key={p.id} value={p.id}>
            {p.title}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="date"
        name="date"
        label="Due Date"
        type="date"
        margin="normal"
        fullWidth
        // defaultValue={new Date().toISOString()}
        // className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        required
        value={endingDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEndingDate(e.target.value)
        }
      />

      <Grid container justify="space-between">
        <TextField
          id="category"
          name="category"
          select
          label="Category"
          value={categoryID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setCategoryID(parseInt(e.target.value));
          }}
          variant="outlined"
          margin="normal"
          className={classes.select}
        >
          {Category.map((c: string, i: number) => (
            <MenuItem key={i} value={i + 1}>
              {c}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          className={classes.select}
          id="impact"
          name="impact"
          select
          label="Impact"
          value={impactID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setImpactID(parseInt(e.target.value));
          }}
          variant="outlined"
          margin="normal"
        >
          {Impact.map((c: string, i: number) => (
            <MenuItem key={i} value={i + 1}>
              {c}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          className={classes.select}
          id="difficulty"
          name="difficulty"
          select
          label="Difficulty"
          value={difficultyID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setDifficultyID(parseInt(e.target.value));
          }}
          variant="outlined"
          margin="normal"
        >
          {Difficulty.map((c: string, i: number) => (
            <MenuItem key={i} value={i + 1}>
              {c}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Modal>
  );
};

export default NewTicketModal;
