import React, { FC } from "react";

type ProgressBarProps = {
  value: number;
  max?: number;
};

export const ProgressBar: FC<ProgressBarProps> = ({ value, max = 100 }) => {
  return (
    <div className="row">
      <progress value={value} max={max}></progress>
    </div>
  );
};
