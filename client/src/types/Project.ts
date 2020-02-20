import { Ticket } from "./Ticket";
import { User } from "./User";
import { AppFile } from "./AppFile";
import { Activity } from "./Activity";

export interface Project {
  id: number;
  title: string;
  description: string;
  progression: number;
  tickets: Ticket[];
  users: User[];
  plannedEnding: string;
  files: AppFile[];
  activities: Activity[];
}
