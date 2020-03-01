import React, { FC, useState, ChangeEvent, useEffect, FormEvent } from "react";
import { Modal } from "./Modal";
import { AvatarList } from "./AvatarList";
import { User } from "../types/User";
import { FilterBar } from "./FilterBar";
import { patch } from "../utils/http";
import { Constants } from "../utils/Constants";
import { UsersModalEntry } from "./UsersModalEntry";
import { useParams } from "react-router-dom";

interface IProps {
  show: boolean;
  handleClose: () => void;
  users: User[];
  allUsers: User[];
}

export const UsersModal: FC<IProps> = ({
  show,
  handleClose,
  users,
  allUsers
}) => {
  const [filterText, setFilterText] = useState<string>("");
  const [members, setMembers] = useState<User[]>(users);
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
      members.map(m => m.id)
    );
    handleClose();
  };

  useEffect(() => {});
  return (
    <Modal show={show} handleClose={handleClose}>
      <div className="row valign-wrapper indigo">
        <div className="col s10">
          <h4 className="white-text">Manage users</h4>
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
      <div className="center">
        <AvatarList users={users} />
        <FilterBar
          filterText={filterText}
          clearFilterText={() => setFilterText("")}
          handleChange={handleChange}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <ul>
          {allUsers.map((u: User) => (
            <li key={u.id}>
              <UsersModalEntry
                user={u}
                members={members}
                setMembers={setMembers}
              />
            </li>
          ))}
        </ul>
        <div className="modal-footer grey lighten-3">
          <input
            type="submit"
            className="modal-close waves-effect waves-green btn indigo"
            value="Done"
          />
        </div>
      </form>
    </Modal>
  );
};
