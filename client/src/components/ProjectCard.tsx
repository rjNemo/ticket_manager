import React, { FC } from "react";
import { HorizontalCard } from "./HorizontalCard";
import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
import { getRemainingdays } from "../utils/methods";
import { User } from "../types/User";
import { AvatarList } from "./AvatarList";
import { ProgressBar } from "./ProgressBar";
import { ProgressInfo } from "./ProgressInfo";

interface IProps {
  title?: string;
  remainingDays?: string;
  link?: string;
  members?: User[];
  progress?: number;
  ticketsNumber?: number;
  ticketsDone?: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      paddingTop: theme.spacing(2),
    },
  })
);

const ProjectCard: FC<IProps> = ({
  title,
  remainingDays = "",
  link = "#",
  members,
  progress = 0,
  ticketsNumber,
  ticketsDone,
}) => {
  const classes = useStyles();

  const Content: FC = () => {
    return (
      <>
        {members && <AvatarList users={members} />}
        <div className={classes.progress}>
          <ProgressInfo
            remainingDays={getRemainingdays(remainingDays)}
            tasksDone={ticketsDone}
            tasksTotalCount={ticketsNumber}
          />
        </div>
      </>
    );
  };

  return (
    <HorizontalCard
      title={title}
      link={link}
      content={<Content />}
      progress={progress}
    />
  );
};

export default ProjectCard;
