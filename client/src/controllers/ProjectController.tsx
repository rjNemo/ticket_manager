import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ErrorController } from "./ErrorController";
import { ProjectPage } from "../pages/ProjectPage";
import ProjectVM from "../VM/ProjectVM";
import { Project } from "../types/Project";
import { HttpResponse } from "../types/HttpResponse";
import { Preloader } from "../components/Preloader";
import { Constants } from "../utils/Constants";
import { get } from "../utils/http";

export const ProjectController: FC = () => {
  const [project, setProject] = useState<Project>({} as Project);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState();
  const { id } = useParams();

  async function httpGet(id: string): Promise<void> {
    try {
      const response: HttpResponse<Project> = await get<Project>(
        `${Constants.projectsURI}/${id}`
      );
      if (response.parsedBody !== undefined) {
        setProject(response.parsedBody);
        setIsLoading(false);
      }
    } catch (ex) {
      setHasError(true);
      setError(ex);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      httpGet(id);
    }
  }, [id]);

  if (hasError) {
    return <ErrorController error={error} />;
  }
  const viewModel = new ProjectVM(project);
  return isLoading ? <Preloader /> : <ProjectPage viewModel={viewModel} />;
};
