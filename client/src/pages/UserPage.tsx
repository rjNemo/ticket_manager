import React, { FC } from "react";
import { UserVM } from "../VM/UserVM";
import { UserHeader } from "../components/UserHeader";
import { UserTabRouter } from "../components/UserTabRouter";

interface IProps {
  viewModel: UserVM;
}
export const UserPage: FC<IProps> = ({ viewModel }) => {
  const { fullName, presentation, picture, projects, tickets } = viewModel;
  const tabNames: string[] = ["Projects", "Tickets"];
  return (
    <div className="section">
      <div className="container">
        <UserHeader
          picture={picture}
          fullName={fullName}
          presentation={presentation}
        />
        <UserTabRouter
          tabNames={tabNames}
          projects={projects}
          tickets={tickets}
        />
      </div>
    </div>
  );
};
