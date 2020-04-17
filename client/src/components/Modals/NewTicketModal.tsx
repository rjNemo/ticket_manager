import React, { FC, useState, FormEvent } from "react";
import { useRouteMatch } from "react-router-dom";
import { Modal } from "./Modal";
import { NewTicketForm } from "../NewTicketForm";
import { Ticket } from "../../types/Ticket";
import { Project } from "../../types/Project";
import { post } from "../../utils/http";
import { Constants } from "../../utils/Constants";
import { TextField, MenuItem } from "@material-ui/core";

interface IProps {
  show: boolean;
  handleClose: () => void;
  allProjects: Project[];
}

export const NewTicketModal: FC<IProps> = ({
  show,
  handleClose,
  allProjects,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endingDate, setEndingDate] = useState("");

  const { url } = useRouteMatch();
  const id = url.split("/")[2];
  const [projectId, setProjectId] = useState(id);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let newTicket = {
      title: title,
      description: description,
      endingDate: new Date(endingDate).toISOString(),
      creatorId: "20bf4b2a-7209-4826-96cd-29c2bc937a94",
      projectId: parseInt(projectId),
    };

    // const response: HttpResponse<Ticket> =
    await post<Ticket>(`${Constants.ticketsURI}`, newTicket);
    handleClose();
  };

  return (
    <Modal
      name="New Ticket"
      show={show}
      handleClose={handleClose}
      action="New Ticket"
      handleAction={handleSubmit}
    >
      {/* <form onSubmit={handleSubmit}> */}
      <div className="row">
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
          id="date"
          label="Due Date"
          type="date"
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

        <TextField
          id="project"
          select
          label="Project"
          value={projectId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            setProjectId(e.target.value);
          }}
          // helperText="Please select your currency"
          variant="outlined"
        >
          {allProjects.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.title}
            </MenuItem>
          ))}
        </TextField>
      </div>
      {/* </form> */}
    </Modal>
  );
};
