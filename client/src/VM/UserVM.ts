import { Project } from "../types/Project";
import { Ticket } from "../types/Ticket";
import { User } from "../types/User";

export class UserVM {
  public fullName: string;
  public presentation: string;
  public picture: string;
  public projects: Project[];
  public tickets: Ticket[];

  public constructor(user: User) {
    this.fullName = user.fullName;
    this.presentation = user.presentation;
    this.picture = user.picture;
    this.projects = user.projects;
    this.tickets = user.tickets;
  }
}
