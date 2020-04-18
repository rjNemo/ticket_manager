import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserPage } from "../pages/UserPage";
import { UserVM } from "../VM/UserVM";
import { User } from "../types/User";
import { HttpResponse } from "../types/HttpResponse";
import { Preloader } from "../components/Preloader";
import { get } from "../utils/http";
import { Constants } from "../utils/Constants";
import { ErrorController } from "./ErrorController";

export const UserController: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>({} as User);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { id } = useParams();

  async function httpGetUser(id: string): Promise<void> {
    try {
      const response: HttpResponse<User> = await get<User>(
        `${Constants.usersURI}/${id}`
      );
      if (response.parsedBody !== undefined) {
        setUser(response.parsedBody);
        setIsLoading(false);
      }
    } catch (ex) {
      console.error(ex);
      setHasError(true);
      setError(ex);
    }
  }

  async function httpGetAllUsers(): Promise<void> {
    try {
      const response: HttpResponse<User> = await get<User>(
        `${Constants.usersURI}`
      );
      if (response.parsedBody !== undefined) {
        setAllUsers((response.parsedBody as unknown) as User[]);
      }
    } catch (ex) {
      setHasError(true);
      setError(ex);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      httpGetUser(id);
      httpGetAllUsers();
    } else {
      setHasError(true);
      setError("Bad Request");
    }
  }, [id]);

  if (hasError) {
    return <ErrorController error={error} />;
  }

  const viewModel = new UserVM(user, allUsers);
  return isLoading ? <Preloader /> : <UserPage viewModel={viewModel} />;
};
