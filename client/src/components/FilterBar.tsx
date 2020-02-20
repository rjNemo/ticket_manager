import React, { FC } from "react";
import { useRouteMatch } from "react-router-dom";

type IProps = {
  filterText: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FilterBar: FC<IProps> = ({ filterText, handleChange }) => {
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
          <i
            className="material-icons" //onClick={clearSearchBar}
          >
            close
          </i>
        </div>
        <div className="col s2 valign-wrapper"></div>
      </div>
    </>
  );
};
