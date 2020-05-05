import React, { FC, useState, ChangeEvent, MouseEvent } from "react";
import ActivityCollection from "../ActivityCollection";
import FilterBar from "../FilterBar";
import Activity from "../../types/Activity";

type IProps = {
  activities: Activity[];
};

const ActivityList: FC<IProps> = ({ activities }) => {
  const [filterText, setFilterText] = useState<string>("");
  const clearFilterText: (e: MouseEvent) => void = (e: MouseEvent) => {
    setFilterText("");
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  return (
    <>
      <div className="row valign-wrapper">
        <h3>Activity</h3>
        <FilterBar
          filterText={filterText}
          handleChange={handleChange}
          clearFilterText={clearFilterText}
        />
      </div>
      <ActivityCollection activities={activities} filterText={filterText} />
    </>
  );
};

export default ActivityList;
