import { User } from "./User";
import { Ticket } from "./Ticket";

export default interface Activity {
  id: number;
  description: string;
  date: Date;
  user: User;
  ticket: Ticket;
}
