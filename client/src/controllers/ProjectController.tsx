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
import { User } from "../types/User";

export const ProjectController: FC = () => {
  const [project, setProject] = useState<Project>({} as Project);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  async function httpGetProjects(id: string): Promise<void> {
    try {
      const response: HttpResponse<Project> = await get<Project>(
        `${Constants.projectsURI}/${id}`
      );
      if (response.parsedBody !== undefined) {
        setProject(response.parsedBody);
        setIsLoading(false);
      }
    } catch (ex) {
      console.error(ex);
      setHasError(true);
      setError(ex);
    }
  }

  async function httpGetAllUsers(): Promise<void> {
    try {
      const response: HttpResponse<User> = await get<User>(
        `${Constants.usersURI}`
      );
      if (response.parsedBody !== undefined) {
        setAllUsers((response.parsedBody as unknown) as User[]);
      }
    } catch (ex) {
      setHasError(true);
      setError(ex);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      httpGetProjects(id);
      httpGetAllUsers();
    } else {
      setHasError(true);
      setError("Bad Request");
    }
  }, [id]);

  if (hasError) {
    return <ErrorController error={error} />;
  }
  const viewModel = new ProjectVM(project, allUsers);
  return isLoading ? <Preloader /> : <ProjectPage viewModel={viewModel} />;
};
