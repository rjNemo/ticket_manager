import { Ticket } from "./Ticket";
import { User } from "./User";
import { AppFile } from "./AppFile";
import { Activity } from "./Activity";

export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  endingDate: string;
  progression: number;
  status: string;
  manager: User;
  users: User[];
  tickets: Ticket[];
  files: AppFile[];
  activities: Activity[];
}
