import ProjectService from "./project";
import TicketService from "./ticket";
import UserService from "./user";

export default interface IService<T> {
  all(): Promise<T[]>;
  get(id: string): Promise<T>;
  add(item: any): Promise<T>;
  update(id: string, item: T): Promise<void>;
  delete(id: string): Promise<void>;
}

export { ProjectService, TicketService, UserService };
