import React, { FC, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { getRemainingdays } from "../utils/methods";

interface IProps {
  title?: string;
  remainingDays?: string;
  validateTicket?: (event: MouseEvent) => void;
  link?: string;
}

export const HorizontalCard: FC<IProps> = ({
  title,
  remainingDays,
  link = "#",
  validateTicket
}) => {
  return (
    <li>
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <div className="row">
              <div className="card-title">
                <h6>
                  <Link to={link}>
                    <b>{title ?? "Nothing to do"}</b>
                  </Link>
                </h6>
              </div>
              <span>
                Due{" "}
                {remainingDays ? (
                  getRemainingdays(remainingDays)
                ) : (
                  <span>
                    <del>Too much</del> 0
                  </span>
                )}{" "}
                days
              </span>
              <div className="right">
                <Link to="#">
                  <i className="material-icons" onClick={validateTicket}>
                    check
                  </i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
