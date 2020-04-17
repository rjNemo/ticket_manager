import React, { FC, MouseEvent } from "react";
import { HorizontalCard } from "./HorizontalCard";
import { Typography } from "@material-ui/core";
import { getRemainingdays } from "../utils/methods";

interface IProps {
  title?: string;
  remainingDays?: string;
  link?: string;
}

const ProjectCard: FC<IProps> = ({ title, remainingDays, link = "#" }) => {
  const Content: FC = () => {
    return (
      <Typography variant="body2" component="p">
        <span>
          Due{" "}
          {remainingDays ? (
            getRemainingdays(remainingDays)
          ) : (
            <span>
              <del>Too much</del> 0
            </span>
          )}{" "}
          days
        </span>
      </Typography>
    );
  };

  return <HorizontalCard title={title} link={link} content={<Content />} />;
};

export default ProjectCard;
