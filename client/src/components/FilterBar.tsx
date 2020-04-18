import React, { FC, ChangeEvent, MouseEvent } from "react";
import { useRouteMatch } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
// import { AccountCircle, FilterList, FilterListSharp } from "@material-ui/icons";

type IProps = {
  filterText: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  clearFilterText: (e: MouseEvent<HTMLInputElement>) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    margin: {
      margin: theme.spacing(1),
    },
    filter: {
      backgroundColor: "#fff",
    },
  })
);

export const FilterBar: FC<IProps> = ({
  filterText,
  handleChange,
  // clearFilterText
}) => {
  const { url } = useRouteMatch();
  const placeholder: string = url.split("/")[3] || "elements";
  const classes = useStyles();
  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <TextField
            id="input-with-icon-grid"
            variant="outlined"
            label={`Filter ${placeholder}`}
            size="small"
            value={filterText}
            onChange={handleChange}
            color="primary"
            className={classes.filter}
          />
        </Grid>
      </Grid>
    </div>
  );
};
