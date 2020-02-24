import React, { FC, useState, ChangeEvent, useEffect } from "react";
import { Modal } from "./Modal";
import { AvatarList } from "./AvatarList";
import { User } from "../types/User";
import { FilterBar } from "./FilterBar";
import { HttpResponse } from "../types/HttpResponse";
import { get } from "../utils/http";
import { Constants } from "../utils/Constants";
import { UsersModalEntry } from "./UsersModalEntry";

interface IProps {
  show: boolean;
  handleClose: () => void;
  users: User[];
}

export const UsersModal: FC<IProps> = ({ show, handleClose, users }) => {
  const [filterText, setFilterText] = useState<string>("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isChecked, setIsChecked] = useState(true);
  const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(e.target.value);
  };

  async function httpGet(): Promise<void> {
    try {
      const response: HttpResponse<User> = await get<User>(
        `${Constants.usersURI}`
      );
      if (response.parsedBody !== undefined) {
        setAllUsers((response.parsedBody as unknown) as User[]);
      }
    } catch (ex) {
      // setHasError(true);
      // setError(ex);
    }
  }

  useEffect(() => {
    // if (id !== undefined) {
    httpGet();
    // } else {
    // setHasError(true);
    // setError("Bad Request");
    // }
  }, []);

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
      {/* <div className="code">{allUsers}</div> */}
      <form>
        <ul>
          {allUsers.map((u: User) => (
            <li key={u.id}>
              {console.log(isChecked)}
              <UsersModalEntry
                user={u}
                isChecked={isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setIsChecked(!isChecked);
                }}
              />
            </li>
          ))}
        </ul>
      </form>
    </Modal>
  );
};
