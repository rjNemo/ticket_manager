import { Project } from "./Project";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
  endingDate: string;
  project: Project;
}
