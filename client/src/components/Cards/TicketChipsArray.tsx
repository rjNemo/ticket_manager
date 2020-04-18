import React, { FC } from "react";
import { Grid, Chip, makeStyles, Theme, createStyles } from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import SpeedIcon from "@material-ui/icons/Speed";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0,
      marginTop: 20,
      marginBottom: 20,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

interface IProps {
  status: string;
  category: string;
  impact: string;
  difficulty: string;
}
const TicketChipsArray: FC<IProps> = ({
  status,
  category,
  impact,
  difficulty,
}) => {
  const classes = useStyles();
  const chipData = [
    // { label: "status", value: status },
    { label: "category", value: category },
    { label: "impact", value: impact },
    { label: "difficulty", value: difficulty },
  ];

  return (
    // <Paper component="ul" className={classes.root}>
    <Grid component="ul" className={classes.root}>
      {chipData.map((data, i: number) => {
        let icon = <CategoryIcon />;
        let color: "inherit" | "default" | "primary" | "secondary" | undefined;

        if (data.label === "impact") {
          color = "primary";
          icon = <PriorityHighIcon />;
        }
        if (data.label === "difficulty") {
          color = "secondary";
          icon = <SpeedIcon />;
        }

        return (
          <li key={i}>
            <Chip
              icon={icon}
              color={color}
              label={data.value}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Grid>
  );
};

export default TicketChipsArray;
