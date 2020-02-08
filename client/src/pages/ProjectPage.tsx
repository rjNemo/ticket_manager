import React, { FC } from "react";
import { Header } from "../components/Header";
import { AvatarList } from "../components/AvatarList";
import { ProgressBar } from "../components/ProgressBar";
import { TicketList } from "../components/TicketList";
import ProjectVM from "../viewModels/ProjectVM";

interface IProps {
  viewModel: ProjectVM;
}
export const ProjectPage: FC<IProps> = ({ viewModel }) => {
  const { title, description, avatars, value, tickets } = viewModel;
  return (
    <div className="section">
      <div className="container">
        <Header title={title} description={description} />
        <AvatarList avatars={avatars} />
        <ProgressBar value={value} />
        {/* <TabView> */}
        <TicketList tickets={tickets} />
        {/* <ChildFile />
        <ChildActivity /> */}
        {/* </TabView> */}
      </div>
    </div>
  );
};
