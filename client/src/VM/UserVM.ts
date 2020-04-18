import { Project } from "../types/Project";
import { Ticket } from "../types/Ticket";
import { User } from "../types/User";
import { Activity } from "../types/Activity";

export class UserVM {
  public id: string;
  public firstName: string;
  public lastName: string;
  public fullName: string;
  public presentation: string;
  public email: string;
  public phone: string;
  public creationDate: string;
  public picture: string;
  public projects: Project[];
  public tickets: Ticket[];
  public activities: Activity[];
  public allUsers: User[];

  public constructor(user: User, allUsers: User[]) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.fullName = user.fullName;
    this.presentation = user.presentation;
    this.email = user.email;
    this.phone = user.phone;
    this.creationDate = user.creationDate;
    this.picture = user.picture;
    this.projects = user.projects;
    this.tickets = user.tickets;
    this.activities = user.activities;
    this.allUsers = allUsers;
  }
}
