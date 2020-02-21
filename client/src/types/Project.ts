import { Ticket } from "./Ticket";
import { User } from "./User";
import { Activity } from "./Activity";

export interface Project {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  plannedEnding: string;
  progression: number;
  status: string;
  manager: User;
  users: User[];
  tickets: Ticket[];
  activities: Activity[];
  files: File[];
}
