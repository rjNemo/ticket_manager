import IService from ".";
import Ticket from "../types/Ticket";
import HttpHandler from "./http";
import * as API from "../constants/api";

interface NewTicket {
  title: string;
  description: string;
  endingDate: string;
  creatorId: string;
  projectId: number;
  impact: number;
  difficulty: number;
  category: number;
}

export default class TicketService implements IService<Ticket> {
  constructor(private key: string) {}

  private http = new HttpHandler<Ticket>();
  private path: string = API.TICKETS;

  all = async (): Promise<Ticket[]> => {
    const response = await this.http.get(this.path, this.key);
    return (response.parsedBody as unknown) as Ticket[];
  };

  get = async (id: string): Promise<Ticket> => {
    const response = await this.http.get(`${this.path}/${id}`, this.key);
    const body = response.parsedBody;
    return body ?? ({} as Ticket);
  };

  add = async (item: NewTicket): Promise<Ticket> => {
    const response = await this.http.post(this.path, item, this.key);
    const body = response.parsedBody;
    return body ?? ({} as Ticket);
  };

  update(id: string, item: Ticket): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  close = async (id: string): Promise<void> => {
    await this.http.put(`${this.path}/${id}/closed`, {}, this.key);
  };
}
