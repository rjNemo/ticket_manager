import React, { FC } from "react";
import { Activity } from "../types/Activity";

type IProps = {
  activities: Activity[];
};

export const ActivityCollection: FC<IProps> = ({ activities }) => {
  return (
    <>
      <ul className="collection">
        {activities.map((activity: Activity) => (
          <li key={activity.id} className="collection-item avatar">
            <ActivityEntry activity={activity} />
          </li>
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
    <>
      <img src={activity.user.picture} alt="" className="circle" />
      {/* <i className="material-icons circle">folder</i> */}
      <span className="title">
        {activity.user.firstName} {activity.description} {activity.ticket.title}
      </span>
      <p>{activity.date.toDateString()}</p>
    </>
  );
};
