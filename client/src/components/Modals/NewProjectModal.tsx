import React, { FC, useState, FormEvent } from "react";
import TextField from "@material-ui/core";
import Modal from "./Modal";
import Project from "../../types/Project";
import User from "../../types/User";
import post from "../../utils/http";
import Constants from "../../utils/Constants";

interface IProps {
  show: boolean;
  handleClose: () => void;
  allUsers: User[];
}

const NewProjectModal: FC<IProps> = ({ show, handleClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endingDate, setEndingDate] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let newProject = {
      title: title,
      description: description,
      endingDate: new Date(endingDate).toISOString(),
      managerId: "cd179eb7-3a54-4060-b22c-3e947bdffcbc", // get current User id
    };

    await post<Project>(`${Constants.projectsURI}`, newProject);
    handleClose();
  };

  return (
    <Modal
      name="New Project"
      show={show}
      handleClose={handleClose}
      action="New Project"
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
        id="date"
        name="date"
        label="Due Date"
        type="date"
        margin="normal"
        fullWidth
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
    </Modal>
  );
};

export default NewProjectModal;
