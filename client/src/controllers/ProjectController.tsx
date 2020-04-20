import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorController from "./ErrorController";
import ProjectPage from "../pages/ProjectPage";
import ProjectVM from "../VM/ProjectVM";
import Project from "../types/Project";
import User from "../types/User";
import Preloader from "../components/Preloader";
import { ProjectService, UserService } from "../services";
import { useAuth0 } from "../authentication/auth0";

const ProjectController: FC = () => {
  const [project, setProject] = useState<Project>({} as Project);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    const getProject = async (id: string): Promise<void> => {
      const token = await getTokenSilently();
      try {
        const Projects = new ProjectService(token);
        const project: Project = await Projects.get(id);
        if (project !== undefined) {
          setProject(project);
          setIsLoading(false);
        }
      } catch (ex) {
        setHasError(true);
        setError(ex);
      }
    };

    const getAllUsers = async (): Promise<void> => {
      const token = await getTokenSilently();
      try {
        const Users = new UserService(token);
        const response: User[] = await Users.all();
        if (response !== undefined) {
          setAllUsers(response);
          setIsLoading(false);
        }
      } catch (ex) {
        setHasError(true);
        setError(ex);
      }
    };

    const getAllProjects = async (): Promise<void> => {
      const token = await getTokenSilently();
      try {
        const Projects = new ProjectService(token);
        const response: Project[] = await Projects.all();
        if (response !== undefined) {
          setAllProjects(response);
        }
      } catch (ex) {
        setHasError(true);
        setError(ex);
      }
    };

    if (id !== undefined) {
      getProject(id);
      getAllUsers();
      getAllProjects();
    } else {
      setHasError(true);
      setError("Bad Request");
    }
  }, [id, getTokenSilently]);

  if (hasError) {
    return <ErrorController error={error} />;
  }

  const viewModel = new ProjectVM(project, allUsers, allProjects);
  return isLoading ? <Preloader /> : <ProjectPage viewModel={viewModel} />;
};

export default ProjectController;
