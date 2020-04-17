import React, { FC, useState } from "react";
import { Grid, makeStyles, Theme } from "@material-ui/core";
import { Header } from "../components/Header";
import { AvatarList } from "../components/AvatarList";
import { ProgressBar } from "../components/ProgressBar";
import { FloatingButton } from "../components/FloatingButton";
import { UsersModal } from "../components/UsersModal";
import { ProjectTabPanel } from "../components/ProjectTabPanel";
import ProjectVM from "../VM/ProjectVM";
import PageLayout from "../layouts/PageLayout";
import { ProgressInfo } from "../components/ProgressInfo";

interface IProps {
  viewModel: ProjectVM;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1),
    flexGrow: 1,
  },
}));

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
    // activities,
    allProjects,
  } = viewModel;

  const tabNames: string[] = ["Tickets", "Files"]; //, "Activity"];
  const [showModal, setShowModal] = useState<boolean>(false);

  const classes = useStyles();

  const Content: FC = () => {
    return (
      <>
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

        <div className={classes.root}>
          <ProgressBar value={progression} />
          <ProgressInfo
            tasksDone={ticketsDone}
            tasksTotalCount={ticketsTotalCount}
            remainingDays={remainingDays}
          />
        </div>
        <ProjectTabPanel
          tabNames={tabNames}
          tickets={tickets}
          files={files}
          // activities={activities}
          allProjects={allProjects}
        />
      </>
    );
  };

  return (
    <PageLayout
      header={<Header title={title} description={description} />}
      content={<Content />}
    />
  );
};
