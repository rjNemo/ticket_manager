import { Ticket } from "../types/Ticket";
import { Project } from "../types/Project";
// import { Constants } from "../utils/Constants";
// import { User } from "../types/User";
import { AppFile } from "../types/AppFile";
import { Activity } from "../types/Activity";
import { User } from "../types/User";
import { getRemainingdays } from "../utils/methods";

export default class ProjectVM {
  public id: number;
  public title: string;
  public description: string;
  public value: number;
  public tickets: Ticket[];
  public users: User[];
  public ticketsTotalCount: number;
  public ticketsDone: number;
  public remainingDays: number;
  public files: AppFile[];
  public activities: Activity[];

  /**
   * getMembers
   */
  // public getMembers(): string {
  //   let res: Promise<Response> = fetch(
  //     `${Constants.getProjectURI}/${this.id}/members`
  //   );
  //   return JSON.stringify(res);
  //   // res.json();
  // }

  public constructor(project: Project) {
    this.id = project.id;
    this.title = project.title;
    this.description = project.description;
    this.users = project.users;
    this.value = project.progression;
    this.tickets = project.tickets;
    this.ticketsTotalCount = this.tickets.length;
    this.ticketsDone = this.tickets.filter(t => t.status === "Done").length;
    this.files = project.files;
    this.activities = project.activities;
    this.remainingDays = getRemainingdays(project.plannedEnding);
  }
}
