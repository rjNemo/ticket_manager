import { Ticket } from "../types/Ticket";
import { Project } from "../types/Project";
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
  public allUsers: User[];
  public ticketsTotalCount: number;
  public ticketsDone: number;
  public remainingDays: number;
  public files: AppFile[];
  public activities: Activity[];

  public constructor(project: Project, allUsers: User[]) {
    this.id = project.id;
    this.title = project.title;
    this.description = project.description;
    this.users = project.users;
    this.allUsers = allUsers;
    this.value = project.progression;
    this.tickets = project.tickets;
    this.ticketsTotalCount =
      this.tickets === undefined ? 0 : this.tickets.length;
    this.ticketsDone =
      this.tickets === undefined
        ? 0
        : this.tickets.filter(t => t.status === "Done").length;
    this.files = project.files;
    this.activities = project.activities;
    this.remainingDays = getRemainingdays(project.plannedEnding);
  }
}
