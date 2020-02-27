import React, { FC, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { getRemainingdays } from "../utils/methods";

interface IProps {
  title: string;
  remainingDays: string;
  validateTicket: (event: MouseEvent) => void;
  // archiveTicket: (event: MouseEvent) => void;
}

export const HorizontalCard: FC<IProps> = ({
  title,
  remainingDays,
  // archiveTicket,
  validateTicket
}) => {
  return (
    <div className="card horizontal">
      <div className="card-stacked">
        <div className="card-content">
          <div className="row">
            <div className="card-title">
              <h6>
                <Link to="#">
                  <b>{title}</b>
                </Link>
              </h6>
            </div>
            <span>Due {getRemainingdays(remainingDays)} days</span>
            <div className="right">
              <Link to="#">
                <i className="material-icons" onClick={validateTicket}>
                  check
                </i>
              </Link>
              {/* <Link to="#">
                <i className="material-icons" onClick={archiveTicket}>
                  archive
                </i>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
