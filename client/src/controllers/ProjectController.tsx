import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectPage } from "../pages/ProjectPage";
import ProjectVM from "../VM/ProjectVM";
import { Constants } from "../utils/Constants";
import { Project } from "../types/Project";
import { Preloader } from "../components/Preloader";

export const ProjectController: FC = () => {
  const [project, setProject] = useState({} as Project);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const getProject: (id: string) => void = async (id: string) => {
    await fetch(`${Constants.getProjectURI}/${id}`)
      .then((res: Response) => res.json())
      .catch(err => console.log(err))
      .then(data => setProject(data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (id !== undefined) {
      getProject(id);
    }
  }, [id]);

  const viewModel = new ProjectVM(project);

  return isLoading ? <Preloader /> : <ProjectPage viewModel={viewModel} />;
};
