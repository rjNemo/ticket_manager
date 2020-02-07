import { Ticket } from "../types/Ticket";
import { Project } from "../types/Project";
import { Constants } from "../utils/Constants";

export default class ProjectVM {
  public id: number;
  public title: string;
  public description: string;
  // public avatars: string[];
  public value: number;
  public tickets: Ticket[];

  /**
   * getMembers
   */
  public getMembers() {
    let res: Promise<Response> = fetch(
      `${Constants.getProjectURI}/${this.id}/members`
    );
    return JSON.stringify(res);
    // res.json();
  }

  public constructor(project: Project) {
    this.id = project.id;
    this.title = project.title;
    this.description = project.description;
    // this.avatars = project.getUsers().map(u => u.Picture);
    this.value = project.progression;
    this.tickets = project.tickets;
  }
}
