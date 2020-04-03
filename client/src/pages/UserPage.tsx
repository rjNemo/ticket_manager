import React, { FC } from "react";
import { UserVM } from "../VM/UserVM";
import { UserHeader } from "../components/UserHeader";
import { UserTabPanel } from "../components/UserTabPanel";
import { Container } from "@material-ui/core";

interface IProps {
  viewModel: UserVM;
}

export const UserPage: FC<IProps> = ({ viewModel }) => {
  const { fullName, presentation, picture, projects, tickets } = viewModel;
  const tabNames: string[] = ["Projects", "Tickets"];

  return (
    <Container maxWidth="md">
      <UserHeader
        picture={picture}
        fullName={fullName}
        presentation={presentation}
      />
      <UserTabPanel tabNames={tabNames} projects={projects} tickets={tickets} />
    </Container>
  );
};
