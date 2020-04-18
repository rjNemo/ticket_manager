import React, { FC, useState, FormEvent } from "react";
import { useRouteMatch } from "react-router-dom";
import {
  TextField,
  MenuItem,
  Grid,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { Modal } from "./Modal";
import { Ticket } from "../../types/Ticket";
import { User } from "../../types/User";
import { post } from "../../utils/http";
import { Constants } from "../../utils/Constants";
import Category from "../../types/enums/category";
import Impact from "../../types/enums/impact";
import Difficulty from "../../types/enums/difficulty";

interface IProps {
  show: boolean;
  handleClose: () => void;
  allUsers: User[];
}

const useStyles = makeStyles((theme: Theme) => ({
  select: {
    width: 120,
  },
}));

export const NewProjectModal: FC<IProps> = ({
  show,
  handleClose,
  allUsers,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endingDate, setEndingDate] = useState("");

  const { url } = useRouteMatch();
  const id = url.split("/")[2];
  const [projectId, setProjectId] = useState(id);
  const [categoryID, setCategoryID] = useState(0);
  const [impactID, setImpactID] = useState(0);
  const [difficultyID, setDifficultyID] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let newTicket = {
      title: title,
      description: description,
      endingDate: new Date(endingDate).toISOString(),
      creatorId: "20bf4b2a-7209-4826-96cd-29c2bc937a94", // get current User id
      projectId: parseInt(projectId),
      impact: impactID,
      difficulty: difficultyID,
      category: categoryID,
    };

    // const response: HttpResponse<Ticket> =
    await post<Ticket>(`${Constants.ticketsURI}`, newTicket);
    handleClose();
  };

  const classes = useStyles();
  return (
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
        {allUsers.map((p) => (
          <MenuItem key={p.id} value={p.id}>
            {p}
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
            <MenuItem key={i} value={i}>
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
            <MenuItem key={i} value={i}>
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
            <MenuItem key={i} value={i}>
              {c}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Modal>
  );
};
