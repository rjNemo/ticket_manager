import React, { FC, useState, useEffect, FormEvent } from "react";
import { Modal } from "./Modal";
import { Ticket } from "../types/Ticket";
import { post } from "../utils/http";
import { Constants } from "../utils/Constants";
import { HttpResponse } from "../types/HttpResponse";
import { NewTicketForm } from "./NewTicketForm";

interface IProps {
  show: boolean;
  handleClose(): void;
}

export const NewTicketModal: FC<IProps> = ({ show, handleClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endingDate, setEndingDate] = useState("");

  const handleSubmit: (event: FormEvent<HTMLFormElement>) => void = async (
    e: FormEvent
  ) => {
    e.preventDefault();
    let newTicket = {
      title: title,
      description: description,
      endingDate: new Date(endingDate).toISOString(),
      creatorId: "20bf4b2a-7209-4826-96cd-29c2bc937a94",
      projectId: 1
    };
    // console.log(newTicket);
    const response: HttpResponse<Ticket> = await post<Ticket>(
      `${Constants.ticketsURI}`,
      newTicket
    );
    // console.log(response.parsedBody);
    handleClose();
  };

  useEffect(() => {});
  return (
    <Modal show={show} handleClose={handleClose}>
      <div className="row valign-wrapper indigo">
        <div className="col s10">
          <h4 className="white-text">New Ticket</h4>
        </div>

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
