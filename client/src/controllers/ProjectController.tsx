import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectPage } from "../pages/ProjectPage";
import ProjectVM from "../viewModels/ProjectVM";
import { Constants } from "../utils/Constants";
import { Project } from "../types/Project";
import { Ticket } from "../types/Ticket";
import { User } from "../types/User";

export const ProjectController: FC = () => {
  // const [project, setProject] = useState({} as Project);
  const [isLoading, setIsLoading] = useState(false);
  // const { id } = useParams();

  // const getProject: Function = (id: number) => {
  //   fetch(`${Constants.getProjectURI}/${id}`)
  //     .then(res => res.json())
  //     .catch(err => console.log(err))
  //     .then(data => setProject(data))
  //     .finally(() => setIsLoading(false));
  // };

  // useEffect(() => {
  //   getProject(id);
  // }, []);

  // const viewModel = new ProjectVM(project);
  // console.log(viewModel.getMembers());

  const tickets: Ticket[] = [
    {
      id: 1,
      title: "Ticket #1"
    },
    {
      id: 2,
      title: "Ticket #2"
    }
  ];

  const project: Project = {
    id: 1,
    title: "Project Title",
    description: "What is it about",
    progression: 25,
    tickets: tickets
  };
  const viewModel = new ProjectVM(project);

  return isLoading ? <p>Loading ...</p> : <ProjectPage viewModel={viewModel} />;
};
