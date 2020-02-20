import React, { FC, CSSProperties } from "react";

type ProgressBarProps = {
  value: number;
  max?: number;
  tasksTotalCount?: number;
  tasksDone?: number;
  remainingDays?: number;
};

export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  max = 100,
  tasksDone,
  tasksTotalCount,
  remainingDays
}) => {
  const styleString: CSSProperties = { width: `${value}%` };
  return (
    <>
      <div className="row">
        <div className="progress">
          <div className="determinate" style={styleString}></div>
        </div>
        <div>
          <i className="left material-icons">playlist_add_check</i>
          <span>
            {tasksDone}/{tasksTotalCount}
          </span>
          <div className="right">
            <span>Due {remainingDays} days</span>
          </div>
        </div>
      </div>
    </>
  );
};
