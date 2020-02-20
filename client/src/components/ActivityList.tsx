import React, { FC, useState, ChangeEvent } from "react";
import { ActivityCollection } from "./ActivityCollection";
import { Activity } from "../types/Activity";
import { FilterBar } from "./FilterBar";

type IProps = {
  activities: Activity[];
};

export const ActivityList: FC<IProps> = ({ activities }) => {
  const [filterText, setFilterText] = useState<string>("");

  const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(e.target.value);
  };

  return (
    <>
      <div className="row valign-wrapper">
        <h3>Activity</h3>
        <FilterBar filterText={filterText} handleChange={handleChange} />
      </div>
      <ActivityCollection activities={activities} />
    </>
  );
};
