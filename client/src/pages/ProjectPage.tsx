import React, { FC, useState } from "react";
import ProjectVM from "../VM/ProjectVM";
import { Header } from "../components/Header";
import { AvatarList } from "../components/AvatarList";
import { ProgressBar } from "../components/ProgressBar";
import { TabRouter } from "../components/TabRouter";
import { FloatingButton } from "../components/FloatingButton";
import { UsersModal } from "../components/UsersModal";
import { Container, Grid } from "@material-ui/core";
import { ProjectTabPanel } from "../components/ProjectTabPanel";

interface IProps {
  viewModel: ProjectVM;
}

export const ProjectPage: FC<IProps> = ({ viewModel }) => {
  const {
    // id,
    title,
    description,
    users,
    allUsers,
    progression,
    tickets,
    ticketsDone,
    ticketsTotalCount,
    remainingDays,
    files,
    activities,
    allProjects
  } = viewModel;

  const tabNames: string[] = ["Tickets", "Files"]; //, "Activity"];
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Container maxWidth="md">
      <Header title={title} description={description} />
      <UsersModal
        show={showModal}
        users={users}
        allUsers={allUsers}
        handleClose={() => setShowModal(false)}
      />

      <Grid container>
        <Grid item xs={3}>
          <AvatarList users={users} />
        </Grid>
        <Grid item xs={9}>
          <FloatingButton
            icon="add"
            color="default"
            size="small"
            onClick={() => setShowModal(true)}
          />
        </Grid>
      </Grid>

      <ProgressBar
        value={progression}
        tasksDone={ticketsDone}
        tasksTotalCount={ticketsTotalCount}
        remainingDays={remainingDays}
      />

      <ProjectTabPanel
        tabNames={tabNames}
        tickets={tickets}
        files={files}
        // activities={activities}
        allProjects={allProjects}
      />
    </Container>
  );
};
