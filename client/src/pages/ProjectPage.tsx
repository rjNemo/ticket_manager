import React, { FC } from "react";
import { Header } from "../components/Header";
import { AvatarList } from "../components/AvatarList";
import { ProgressBar } from "../components/ProgressBar";
import { TicketList } from "../components/TicketList";
import ProjectVM from "../viewModels/ProjectVM";
import { TabRouter } from "../components/TabRouter";

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
  return (
    <div className="section">
      <div className="container">
        <Header title={title} description={description} />
        <AvatarList avatars={avatars} />
        <ProgressBar
          value={value}
          tasksDone={ticketsDone}
          tasksTotalCount={ticketsTotalCount}
          remainingDays={remainingDays}
        />
        <TabRouter>
          {/* <TabRouterSelector/> */}
          <TicketList tickets={tickets} />
          {/* <ChildFile />
        <ChildActivity /> */}
        </TabRouter>
      </div>
    </div>
  );
};
