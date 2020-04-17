import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box } from "@material-ui/core";

type IProps = {
  value: number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export const ProgressBar: FC<IProps> = ({ value }) => {
  // const styleString: CSSProperties = { width: `${value}%` };
  // let barColor: string = "green";

  // if (value < 100) {
  //   barColor = "yellow";
  // }
  // if (value < 200 / 3) {
  //   barColor = "orange";
  // }
  // if (value < 100 / 3) {
  //   barColor = "red";
  // }

  const classes = useStyles();

  return (
    <Box className="row">
      <div className={classes.root}>
        <LinearProgress variant="determinate" value={value} />
        {/* <LinearProgress variant="determinate" value={value} color={barColor} /> */}
      </div>
    </Box>
  );
};
