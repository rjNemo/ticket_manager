import { Activity } from "./Activity";
import { Project } from "./Project";
import { Ticket } from "./Ticket";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  presentation: string;
  email: string;
  phone: string;
  createdAt: string;
  picture: string;
  activities: Activity[];
  projects: Project[];
  tickets: Ticket[];
}
