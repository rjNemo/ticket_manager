import { Ticket } from "../types/Ticket";
import { Project } from "../types/Project";
import { User } from "../types/User";

export class TicketVM {
  public id: number;
  public title: string;
  public description: string;
  public creationDate: string;
  public endingDate: string;
  public status: string;
  public impact: string;
  public difficulty: string;
  public category: string;
  public creatorId: string;
  public project: Project;
  public users: User[];

  public constructor(ticket: Ticket) {
    this.id = ticket.id;
    this.title = ticket.title;
    this.description = ticket.description;
    this.creationDate = ticket.creationDate;
    this.endingDate = ticket.endingDate;
    this.status = ticket.status;
    this.impact = ticket.impact;
    this.difficulty = ticket.difficulty;
    this.category = ticket.category;
    this.creatorId = ticket.creatorId;
    this.project = ticket.project;
    this.users = ticket.users;
  }
}
