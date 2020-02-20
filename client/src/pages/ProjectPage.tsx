import React, { FC } from "react";
import { Header } from "../components/Header";
import { AvatarList } from "../components/AvatarList";
import { ProgressBar } from "../components/ProgressBar";
import ProjectVM from "../viewModels/ProjectVM";
import { TabRouter } from "../components/TabRouter";
import { FloatingButton } from "../components/FloatingButton";

interface IProps {
  viewModel: ProjectVM;
}
export const ProjectPage: FC<IProps> = ({ viewModel }) => {
  const {
    title,
    description,
    avatars,
    value,
    tickets,
    ticketsDone,
    ticketsTotalCount,
    remainingDays
  } = viewModel;
  const tabNames: string[] = ["Tickets", "Files", "Activity"];
  return (
    <div className="section">
      <div className="container">
        <Header title={title} description={description} />
        <div className="row valign-wrapper">
          <AvatarList avatars={avatars} />
          <FloatingButton icon="add" color="grey" size="small" />
        </div>
        <ProgressBar
          value={value}
          tasksDone={ticketsDone}
          tasksTotalCount={ticketsTotalCount}
          remainingDays={remainingDays}
        />
        <TabRouter
          tabNames={tabNames}
          tickets={tickets}
          remainingDays={remainingDays}
        />
      </div>
    </div>
  );
};
