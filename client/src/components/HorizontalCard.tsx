import React, { FC, MouseEvent } from "react";
import { AvatarList } from "./AvatarList";

interface IProps {
  title: string;
  tasksTotalCount?: number;
  tasksDone?: number;
  remainingDays?: number;
  avatars: string[];
  validateTicket: (event: MouseEvent) => void;
  archiveTicket: (event: MouseEvent) => void;
}

export const HorizontalCard: FC<IProps> = ({
  title,
  tasksDone,
  tasksTotalCount,
  remainingDays,
  avatars,
  archiveTicket,
  validateTicket
}) => {
  return (
    <div className="col s12">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <div className="row">
              <div className="card-title">
                <h6>{title}</h6>
              </div>
              <span>Due {remainingDays} days</span>
              {/* <AvatarList avatars={avatars} /> */}
              <div className="right">
                {/* <i className=" material-icons">playlist_add_check</i>
                <span>
                  {" "}
                  {tasksDone}/{tasksTotalCount}
                </span> */}

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
    </div>
  );
};
