import React, { FC, useState, ChangeEvent, MouseEvent } from "react";
import { Grid, Typography } from "@material-ui/core";
import FileCollection from "../FileCollection";
import FilterBar from "../FilterBar";
import InputFile from "../InputFile";
import AppFile from "../../types/AppFile";

type IProps = {
  files: AppFile[];
};

const FileList: FC<IProps> = ({ files }) => {
  const [filterText, setFilterText] = useState<string>("");
  const clearFilterText = (e: MouseEvent): void => {
    setFilterText("");
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilterText(e.target.value);
  };
  return (
    <>
      <Grid container>
        <Grid item xs>
          <Typography variant="h4" component="h4">
            Files
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <FilterBar
            filterText={filterText}
            handleChange={handleChange}
            clearFilterText={clearFilterText}
          />
        </Grid>
      </Grid>
      <InputFile />
      <FileCollection files={files} filterText={filterText} />
    </>
  );
};

export default FileList;
