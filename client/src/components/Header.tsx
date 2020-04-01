import React, { FC } from "react";
import { Typography, Box } from "@material-ui/core";

type HeaderProps = {
  title: string;
  description: string;
};

export const Header: FC<HeaderProps> = ({ title, description }) => {
  return (
    <Box>
      <Typography variant="h2" component="h2">
        {title}
      </Typography>
      <Typography variant="subtitle2" component="h3">
        {description}
      </Typography>
    </Box>
  );
};
