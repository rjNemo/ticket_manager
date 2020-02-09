import { Ticket } from "./Ticket";
import { User } from "./User";

export interface Project {
  id: number;
  title: string;
  description: string;
  progression: number;
  tickets: Ticket[];
  users: User[];
  plannedEnding: string;
}
