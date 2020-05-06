import IService from ".";
import User from "../types/User";
import HttpHandler from "./http";
import * as API from "../constants/api";

export default class UserService implements IService<User> {
  constructor(private key: string) {}

  private http = new HttpHandler<User>();
  private path: string = API.USERS;

  all = async (): Promise<User[]> => {
    const response = await this.http.get(this.path, this.key);
    return (response.parsedBody as unknown) as User[];
  };

  get = async (id: string): Promise<User> => {
    const response = await this.http.get(`${this.path}/${id}`, this.key);
    const body = response.parsedBody;
    return body ?? ({} as User);
  };

  add = async (item: User): Promise<User> => {
    const response = await this.http.post(this.path, item, this.key);
    const body = response.parsedBody;
    return body ?? ({} as User);
  };

  update = async (id: string, item: User): Promise<void> => {
    // const response =
    await this.http.put(`${this.path}/${id}`, item, this.key);
    // const body = response.parsedBody;
    // return body ?? ({} as User);
  };

  delete = async (id: string): Promise<void> => {
    throw new Error("Method not implemented.");
  };
}
