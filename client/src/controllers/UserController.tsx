import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorController from "./ErrorController";
import UserPage from "../pages/UserPage";
import { UserVM } from "../VM/UserVM";
import User from "../types/User";
import Preloader from "../components/Preloader";
import { UserService } from "../services";
import { useAuth0 } from "../authentication/auth0";
import { getUID } from "../authentication/helpers";

const UserController: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState<User>({} as User);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const { getTokenSilently, user } = useAuth0();

  useEffect(() => {
    const getUser = async (id: string): Promise<void> => {
      const token = await getTokenSilently();
      const Users = new UserService(token);
      let response: User | undefined;

      try {
        response = await Users.get(id);
      } catch (ex) {
        if (ex === "Not Found") {
          // create user
          const { given_name, family_name, email, nickname, picture } = user;
          const newUser: User = {
            id: getUID(user),
            firstName: given_name,
            lastName: family_name,
            fullName: `${given_name} ${family_name}`,
            email,
            presentation: nickname,
            picture,
            phone: "",
            creationDate: Date.now().toLocaleString(),
            activities: [],
            projects: [],
            tickets: [],
          };
          response = await Users.add(newUser);
        } else {
          setHasError(true);
          setError(ex);
        }
      } finally {
        if (response !== undefined) {
          setAccount(response);
          setIsLoading(false);
        }
      }
    };

    if (id !== undefined) {
      getUser(id);
    } else {
      setHasError(true);
      setError("Bad Request");
    }
  }, [id, getTokenSilently, user]);

  if (hasError) {
    return <ErrorController error={error} />;
  }

  const viewModel = new UserVM(account);
  return isLoading ? <Preloader /> : <UserPage viewModel={viewModel} />;
};

export default UserController;
