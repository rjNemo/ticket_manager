import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectPage } from "../pages/ProjectPage";
import ProjectVM from "../viewModels/ProjectVM";
import { Constants } from "../utils/Constants";
import { Project } from "../types/Project";

export const ProjectController: FC = () => {
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const getProject: Function = (id: number) => {
    fetch(`${Constants.getProjectURI}/${id}`)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(data => setProject(data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getProject(id);
  }, []);

  const viewModel = new ProjectVM(project as Project);

  return isLoading ? <p>Loading ...</p> : <ProjectPage viewModel={viewModel} />;
};
