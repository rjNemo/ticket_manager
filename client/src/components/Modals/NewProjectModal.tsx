import React, { FC, useState, FormEvent } from "react";
import { TextField } from "@material-ui/core";
import Modal from "./Modal";
import Preloader from "../Preloader";
import { useAuth0 } from "../../authentication/auth0";
import { ProjectService } from "../../services";
import { getUID } from "../../authentication/helpers";
import { today } from "../../utils/methods";

interface IProps {
  show: boolean;
  handleClose: () => void;
}

const NewProjectModal: FC<IProps> = ({ show, handleClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endingDate, setEndingDate] = useState(today());
  const [loading, setLoading] = useState(false);
  const { getTokenSilently, user } = useAuth0();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let newProject = {
      title: title,
      description: description,
      endingDate: new Date(endingDate).toISOString(),
      managerId: getUID(user),
    };

    const token = await getTokenSilently();
    const Projects = new ProjectService(token);
    Projects.add(newProject).catch((err) => console.error(err));
    setLoading(false);
    setTitle("");
    setDescription("");
    setEndingDate(today());

    handleClose();
  };

  return loading ? (
    <Preloader />
  ) : (
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
