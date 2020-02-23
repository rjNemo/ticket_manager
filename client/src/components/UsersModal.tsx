import React, { FC, useState, ChangeEvent } from "react";
import { Modal } from "./Modal";
import { AvatarList } from "./AvatarList";
import { User } from "../types/User";
import { FilterBar } from "./FilterBar";

interface IProps {
  show: boolean;
  handleClose: () => void;
  users: User[];
}

export const UsersModal: FC<IProps> = ({ show, handleClose, users }) => {
  const [filterText, setFilterText] = useState<string>("");
  const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(e.target.value);
  };
  return (
    <Modal show={show} handleClose={handleClose}>
      <div className="row valign-wrapper blue">
        <div className="col s10">
          <h4 className="white-text">Manage users</h4>
        </div>
        <div className="col s2">
          <i
            className="right material-icons blue lighten-3 circle"
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
      <form>
        <ul>
          {users.map((u: User) => (
            <li key={u.id}>
              <div className="row">
                <input
                  id={u.id}
                  type="checkbox"
                  name="active"
                  value="true"
                  onChange={() => false}
                  // checked
                />
                <span>
                  {u.fullName}
                  <img
                    className="circle"
                    src={u.picture}
                    width="32vh"
                    height="32vh"
                    alt={u.fullName}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </form>
    </Modal>
  );
};
