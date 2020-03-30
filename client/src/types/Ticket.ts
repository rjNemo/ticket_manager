import { Project } from "./Project";
import { User } from "./User";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  endingDate: string;
  status: string;
  impact: string;
  difficulty: string;
  category: string;
  creatorId: string;
  project: Project;
  users: User[];
}
