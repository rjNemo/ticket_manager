import React, { FC } from "react";
import { AvatarList } from "./AvatarList";

interface IProps {
  title: string;
  tasksTotalCount?: number;
  tasksDone?: number;
  remainingDays?: number;
  avatars: string[];
}

export const HorizontalCard: FC<IProps> = ({
  title,
  tasksDone,
  tasksTotalCount,
  remainingDays,
  avatars
}) => {
  return (
    <div className="col s12">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <h6>{title}</h6>
            <AvatarList avatars={avatars} />
            <div className="row">
              <i className="left material-icons">playlist_add_check</i>
              <span>
                {tasksDone}/{tasksTotalCount}
              </span>

              <div className="right">
                <span>Due {remainingDays} days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
