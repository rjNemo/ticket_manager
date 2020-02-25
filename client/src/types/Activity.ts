import { User } from "./User";
import { Ticket } from "./Ticket";

export interface Activity {
  id: number;
  description: string;
  date: Date;
  user: User;
  ticket: Ticket;
}
