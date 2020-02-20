import { Ticket } from "../types/Ticket";
import { Project } from "../types/Project";
import { Constants } from "../utils/Constants";
import { User } from "../types/User";
import { AppFile } from "../types/AppFile";
import { Activity } from "../types/Activity";

export default class ProjectVM {
  public id: number;
  public title: string;
  public description: string;
  public value: number;
  public tickets: Ticket[];
  public avatars: string[];
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
    this.avatars = project.users.map(u => u.picture);
    this.value = project.progression;
    this.tickets = project.tickets;
    this.ticketsTotalCount = this.tickets.length;
    this.ticketsDone = this.tickets.filter(t => t.status === "Done").length;
    this.files = project.files;
    this.activities = project.activities;

    let endingDate: Date = new Date(project.plannedEnding);
    let today: Date = new Date();
    let plannedEnding: number = Math.abs(
      endingDate.getDate() - today.getDate()
    );
    this.remainingDays = plannedEnding;
  }
}
