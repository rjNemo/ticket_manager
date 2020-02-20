import React, { FC } from "react";
import { FloatingButton } from "./FloatingButton";
import { ActivityCollection } from "./ActivityCollection";
import { Activity } from "../types/Activity";

type IProps = {
  activities: Activity[];
};

export const ActivityList: FC<IProps> = ({ activities }) => {
  return (
    <>
      <div className="row valign-wrapper">
        <h3>Activity</h3>
        <FloatingButton color=" blue-grey lighten-4" size="" />
      </div>
      <ActivityCollection activities={activities} />
    </>
  );
};
