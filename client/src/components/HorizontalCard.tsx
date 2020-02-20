import React, { FC, MouseEvent } from "react";
import { AvatarList } from "./AvatarList";
import { Link } from "react-router-dom";

interface IProps {
  title: string;
  remainingDays?: number;
  validateTicket: (event: MouseEvent) => void;
  archiveTicket: (event: MouseEvent) => void;
}

export const HorizontalCard: FC<IProps> = ({
  title,
  remainingDays,
  archiveTicket,
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
            <span>Due {remainingDays} days</span>
            <div className="right">
              <a>
                <i className="material-icons" onClick={validateTicket}>
                  check
                </i>
              </a>
              <a>
                <i className="material-icons" onClick={archiveTicket}>
                  archive
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
