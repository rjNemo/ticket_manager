import React, { FC } from "react";
// import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { PlaylistAddCheck } from "@material-ui/icons";

type IProps = {
  tasksTotalCount?: number;
  tasksDone?: number;
  remainingDays?: number;
};

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: "100%",
//       "& > * + *": {
//         marginTop: theme.spacing(2),
//       },
//     },
//   })
// );

export const ProgressInfo: FC<IProps> = ({
  tasksDone,
  tasksTotalCount,
  remainingDays,
}) => {
  // const classes = useStyles();

  return (
    <Box>
      <PlaylistAddCheck />
      <span>
        {tasksDone}/{tasksTotalCount}
      </span>
      <Box className="right">
        <span>Due {remainingDays} days</span>
      </Box>
    </Box>
  );
};
