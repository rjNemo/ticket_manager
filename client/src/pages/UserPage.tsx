import React, { FC } from "react";
import { UserVM } from "../VM/UserVM";
import { UserHeader } from "../components/UserHeader";
import { UserTabPanel } from "../components/Panels/UserTabPanel";
import PageLayout from "../layouts/PageLayout";

interface IProps {
  viewModel: UserVM;
}

export const UserPage: FC<IProps> = ({ viewModel }) => {
  const {
    fullName,
    presentation,
    picture,
    projects,
    tickets,
    allUsers,
  } = viewModel;
  const tabNames: string[] = ["Projects", "Tickets"];

  return (
    <PageLayout
      header={
        <UserHeader
          picture={picture}
          fullName={fullName}
          presentation={presentation}
        />
      }
      content={
        <UserTabPanel
          tabNames={tabNames}
          projects={projects}
          tickets={tickets}
          allUsers={allUsers}
        />
      }
    />
  );
};
