import React, { FC, useState, ChangeEvent, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "./Modal";
import { NewTicketTabRouter } from "./NewTicketTabRouter";
import { User } from "../types/User";
import { patch } from "../utils/http";
import { Constants } from "../utils/Constants";

interface IProps {
  show: boolean;
  handleClose(): void;
  allUsers: User[];
}

export const NewTicketModal: FC<IProps> = ({ show, handleClose, allUsers }) => {
  const [filterText, setFilterText] = useState<string>("");
  const { id } = useParams();

  const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(e.target.value);
  };

  const handleSubmit: (event: FormEvent<HTMLFormElement>) => void = async (
    e: FormEvent
  ) => {
    e.preventDefault();
    await patch<User[]>(
      `${Constants.projectsURI}/${id}/members`,
      {}
      // members.map(m => m.id)
    );
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
          <NewTicketTabRouter
            tabNames={["Details", "Members"]}
            users={allUsers}
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
