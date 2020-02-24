import React, { FC, useState } from "react";
import ProjectVM from "../VM/ProjectVM";
import { Header } from "../components/Header";
import { AvatarList } from "../components/AvatarList";
import { ProgressBar } from "../components/ProgressBar";
import { TabRouter } from "../components/TabRouter";
import { FloatingButton } from "../components/FloatingButton";
import { UsersModal } from "../components/UsersModal";

interface IProps {
  viewModel: ProjectVM;
}

export const ProjectPage: FC<IProps> = ({ viewModel }) => {
  const {
    title,
    description,
    users,
    value,
    tickets,
    ticketsDone,
    ticketsTotalCount,
    remainingDays,
    files,
    activities
  } = viewModel;

  const tabNames: string[] = ["Tickets", "Files", "Activity"];
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="section">
      <div className="container">
        <Header title={title} description={description} />
        <div className="row valign-wrapper">
          <AvatarList users={users} />
          <FloatingButton
            icon="add"
            color="grey"
            size="small"
            onClick={() => setShowModal(true)}
          />
          <UsersModal
            show={showModal}
            users={users}
            handleClose={() => setShowModal(false)}
          />
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
          files={files}
          activities={activities}
        />
      </div>
    </div>
  );
};
