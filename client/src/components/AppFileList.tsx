import React, { FC, useState, ChangeEvent } from "react";
import { AppFile } from "../types/AppFile";
import { FileCollection } from "./FileCollection";
import { InputFile } from "./InputFile";
import { FilterBar } from "./FilterBar";

type IProps = {
  files: AppFile[];
};

export const FileList: FC<IProps> = ({ files }) => {
  const [filterText, setFilterText] = useState<string>("");

  const handleChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(e.target.value);
  };
  return (
    <>
      <div className="row valign-wrapper">
        <h3>Files</h3>
        <FilterBar filterText={filterText} handleChange={handleChange} />
      </div>
      <InputFile />
      <FileCollection files={files} />
    </>
  );
};
