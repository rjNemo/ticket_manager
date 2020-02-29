import React, { FC } from "react";
import { Activity } from "../types/Activity";
import { act } from "react-dom/test-utils";

type IProps = {
  activities: Activity[];
  filterText: string;
};

export const ActivityCollection: FC<IProps> = ({ activities, filterText }) => {
  return activities === undefined ? (
    <></>
  ) : (
    <>
      <ul className="collection">
        {activities.length === 0 ? (
          <ActivityEntry />
        ) : (
          activities
            .filter(
              a =>
                a.description
                  .toLowerCase()
                  .includes(filterText.toLowerCase()) ||
                a.user.firstName
                  .toLowerCase()
                  .includes(filterText.toLowerCase()) ||
                a.ticket.title.toLowerCase().includes(filterText.toLowerCase())
            )
            .map((activity: Activity) => (
              <ActivityEntry activity={activity} key={activity.id} />
            ))
        )}
      </ul>
    </>
  );
};

type IFProps = {
  activity?: Activity;
};

export const ActivityEntry: FC<IFProps> = ({ activity }) => {
  return (
    <>
      <li className="collection-item avatar">
        {/* <img
        src={
          activity
            ? activity.user.picture
            : "https://previews.123rf.com/images/vikpit/vikpit1604/vikpit160400034/54976526-welcome-sign-symbol-word-welcome-hand-lettering-calligraphic-font-letters-and-shade-isolated-on-whit.jpg"
        }
        alt=""
        height="32vh"
        width="32vh"
        className="circle"
      /> */}
        <i className="material-icons circle indigo lighten-1">folder</i>
        <span className="title">
          {activity ? activity.user.firstName : "Ruidy"}
          {activity ? activity.description : " welcomes you "}
          {activity ? activity.ticket.title : "here"}
        </span>
        <p>
          {activity ? activity.date.toDateString() : new Date().toDateString()}
        </p>
      </li>
    </>
  );
};
