import Activity from "../types/Activity";
import AppFile from "../types/AppFile";
import Project from "../types/Project";
import Ticket from "../types/Ticket";
import User from "../types/User";
import getRemainingdays from "../utils/methods";

export default class ProjectVM {
  public id: number;
  public title: string;
  public description: string;
  public creationDate: string;
  public endingDate: string;
  public progression: number;
  public status: string;
  public manager: User;
  public users: User[];
  public tickets: Ticket[];
  public files: AppFile[];
  public activities: Activity[];
  public allUsers: User[];
  public ticketsTotalCount: number;
  public ticketsDone: number;
  public remainingDays: number;
  public allProjects: Project[];

  public constructor(
    project: Project,
    allUsers: User[],
    allProjects: Project[]
  ) {
    this.id = project.id;
    this.title = project.title;
    this.description = project.description;
    this.creationDate = project.creationDate;
    this.endingDate = project.endingDate;
    this.progression = project.progression;
    this.status = project.status;
    this.manager = project.manager;
    this.users = project.users;
    this.tickets = project.tickets;
    this.files = project.files;
    this.activities = project.activities;
    this.allUsers = allUsers;
    this.ticketsTotalCount =
      this.tickets === undefined ? 0 : this.tickets.length;
    this.ticketsDone =
      this.tickets === undefined
        ? 0
        : this.tickets.filter((t) => t.status === "Done").length;
    this.remainingDays = getRemainingdays(project.endingDate);
    this.allProjects = allProjects;
  }
}
