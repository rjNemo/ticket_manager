import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorController from "./ErrorController";
import UserPage from "../pages/UserPage";
import { UserVM } from "../VM/UserVM";
import User from "../types/User";
import Preloader from "../components/Preloader";
import { UserService } from "../services";
import { useAuth0 } from "../authentication/auth0";

const UserController: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>({} as User);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    const getUser = async (id: string): Promise<void> => {
      try {
        const token = await getTokenSilently();
        const Users = new UserService(token);
        const response: User = await Users.get(id);

        if (response !== undefined) {
          setUser(response);
          setIsLoading(false);
        }
      } catch (ex) {
        console.error(ex);
        setHasError(true);
        setError(ex);
      }
    };

    if (id !== undefined) {
      getUser(id);
    } else {
      setHasError(true);
      setError("Bad Request");
    }
  }, [id, getTokenSilently]);

  if (hasError) {
    return <ErrorController error={error} />;
  }

  const viewModel = new UserVM(user);
  return isLoading ? <Preloader /> : <UserPage viewModel={viewModel} />;
};

export default UserController;
