import React, { FC } from "react";
import { Header } from "../components/Header";
import { AvatarList } from "../components/AvatarList";
import { TicketVM } from "../VM/TicketVM";
import { getRemainingdays } from "../utils/methods";
import { Link } from "react-router-dom";

interface IProps {
  viewModel: TicketVM;
}

export const TicketPage: FC<IProps> = ({ viewModel }) => {
  const {
    title,
    description,
    users,
    endingDate,
    project,
    status,
    category,
    impact,
    difficulty
  } = viewModel;
  const daysToEnd: number = getRemainingdays(endingDate);
  let notes: string = "";

  return (
    <div className="section">
      <div className="container">
        <Header title={title} description={description} />
        <AvatarList users={users} />

        <div className="row section">
          <div className="col s9">
            <h5>
              <b>In project: </b>{" "}
              <Link to={`/projects/${project.id}`}>{project.title}</Link>
            </h5>
          </div>
          <div className="col s3">
            <i className="left material-icons">timer</i>
            <span>Due in {daysToEnd} days</span>
          </div>
        </div>

        <div className="section white center">
          <div className="chip">
            <span className="indigo-text">Status: </span> {status}
            {/* <i className="close material-icons">close</i> */}
          </div>

          <div className="chip">
            <span className="orange-text">Category: </span> {category}
            {/* <i className="close material-icons">close</i> */}
          </div>

          <div className="chip">
            <span className="green-text">Impact: </span> {impact}
            {/* <i className="close material-icons">close</i> */}
          </div>

          <div className="chip">
            <span className="red-text">Difficulty: </span> {difficulty}
            {/* <i className="close material-icons">close</i> */}
          </div>

          {/* <textarea
            id="notes"
            className="materialize-textarea validate"
            value={notes}
            // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            //   setDescription(e.target.value)
            // }
          ></textarea> */}
        </div>
      </div>
    </div>
  );
};
