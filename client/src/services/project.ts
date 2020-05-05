import IService from ".";
import Project from "../types/Project";
import HttpHandler from "./http";

interface NewProject {
  title: string;
  description: string;
  endingDate: string;
  managerId: string;
}
export default class ProjectService implements IService<Project> {
  constructor(private key: string) {}

  private http = new HttpHandler<Project>();
  private path: string = "/api/v1/projects";

  all = async (): Promise<Project[]> => {
    const response = await this.http.get(this.path, this.key);
    return (response.parsedBody as unknown) as Project[];
  };

  get = async (id: string): Promise<Project> => {
    const response = await this.http.get(`${this.path}/${id}`, this.key);
    const body = response.parsedBody;
    return body ?? ({} as Project);
  };

  add = async (item: NewProject): Promise<Project> => {
    const response = await this.http.post(this.path, item, this.key);
    const body = response.parsedBody;
    return body ?? ({} as Project);
  };

  update(id: string, item: Project): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  setMembers = async (id: string, members: string[]): Promise<void> => {
    await this.http.patch(`${this.path}/${id}/members`, members, this.key);
  };
}
