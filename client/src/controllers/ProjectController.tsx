import React, { FC, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { ProjectPage } from "../pages/ProjectPage";
import ProjectVM from "../VM/ProjectVM";
import { Project } from "../types/Project";
import { Preloader } from "../components/Preloader";
import { Constants } from "../utils/Constants";
import { HttpResponse, get } from "../utils/http";

export const ProjectController: FC = () => {
  const [project, setProject] = useState({} as Project);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { id } = useParams();

  async function httpGet(id: string): Promise<void> {
    try {
      const response: HttpResponse<Project> = await get<Project>(
        `${Constants.getProjectURI}/${id}`
      );
      if (response.parsedBody !== undefined) {
        setProject(response.parsedBody);
        setIsLoading(false);
      }
    } catch (ex) {
      setHasError(true);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      httpGet(id);
    }
  }, [id]);

  const viewModel = new ProjectVM(project);

  if (hasError) {
    return <Redirect to="/error" />;
  }
  return isLoading ? <Preloader /> : <ProjectPage viewModel={viewModel} />;
};
