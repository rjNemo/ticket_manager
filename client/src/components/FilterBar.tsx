import React, { FC, ChangeEvent, MouseEvent } from "react";
import { useRouteMatch } from "react-router-dom";

type IProps = {
  filterText: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  clearFilterText: (e: MouseEvent<HTMLInputElement>) => void;
};

export const FilterBar: FC<IProps> = ({
  filterText,
  handleChange,
  clearFilterText
}) => {
  const { url } = useRouteMatch();
  const placeholder: string = url.split("/")[3];
  return (
    <>
      <div className="nav-wrapper">
        <div className="input-field">
          <input
            //   className="validate"
            id="filter"
            type="search"
            required
            name="filter"
            value={filterText}
            placeholder={`Filter ${placeholder}`}
            onChange={handleChange}
          />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">filter_list</i>
          </label>
          <i className="material-icons" onClick={clearFilterText}>
            close
          </i>
        </div>
      </div>
    </>
  );
};
