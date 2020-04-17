import React, { FC, useState, FormEvent } from "react";
import { useRouteMatch } from "react-router-dom";
import { Modal } from "./Modal";
import { NewTicketForm } from "../NewTicketForm";
import { Ticket } from "../../types/Ticket";
import { Project } from "../../types/Project";
import { post } from "../../utils/http";
import { Constants } from "../../utils/Constants";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";

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
      <div className="row valign-wrapper indigo">
        {/* <div className="col s10">
          <h4 className="white-text">New Ticket</h4>
        </div> */}

        <div className="col s2">
          <i
            className="right material-icons indigo lighten-3 circle"
            onClick={handleClose}
          >
            close
          </i>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <NewTicketForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            endingDate={endingDate}
            setEndingDate={setEndingDate}
            allProjects={allProjects}
            projectId={projectId}
            setProjectId={setProjectId}
          />
        </div>

        <div className="modal-footer grey lighten-3">
          <input
            type="submit"
            className="modal-close waves-effect waves-green btn indigo"
            value="Create Task"
          />
        </div>
      </form>
    </Modal>
  );
};
