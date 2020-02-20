import React, { FC } from "react";
import { Activity } from "../types/Activity";

type IProps = {
  activities: Activity[];
};

export const ActivityCollection: FC<IProps> = ({ activities }) => {
  return (
    <>
      <ul className="collection">
        {activities.map((f: Activity) => (
          <ActivityEntry activity={f} />
        ))}
      </ul>
    </>
  );
};

type IFProps = {
  activity: Activity;
};

export const ActivityEntry: FC<IFProps> = ({ activity }) => {
  return (
    <li key={activity.id} className="collection-item avatar">
      <img src={activity.user.picture} alt="" className="circle" />
      {/* <i className="material-icons circle">folder</i> */}
      <span className="title">
        {activity.user.firstName} {activity.description} {activity.ticket.title}
      </span>
      <p>{activity.date.toDateString()}</p>
    </li>
  );
};
