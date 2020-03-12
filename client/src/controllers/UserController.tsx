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
// import { AppFile } from "../types/AppFile";
// import { Activity } from "../types/Activity";
// import { Ticket } from "../types/Ticket";

export const UserController: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>({} as User);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");
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

  // const user: User = {
  //   id: "resldsm,dgd",
  //   firstName: "Ti",
  //   lastName: "Nyny",
  //   fullName: "Nilka Netty Nemo",
  //   presentation: "Woman of my life  ❤️❤️❤️",
  //   creationDate: new Date().toDateString(),
  //   email: "dw@mail.au",
  //   phone: "0998765432",
  //   picture: require("../images/user_1.jpg"),
  //   projects: [
  //     {
  //       id: 1,
  //       title: "OP Baby",
  //       description: "What is it about",
  //       progression: 25,
  //       creationDate: new Date().toDateString(),
  //       endingDate: "2020-02-17 15:51:02.787373",
  //       status: "Todo",
  //       manager: {} as User,
  //       users: [] as User[],
  //       tickets: [] as Ticket[],
  //       files: [] as AppFile[],
  //       activities: [] as Activity[]
  //     }
  //   ],
  //   tickets: [
  //     {
  //       id: 1,
  //       title: "Client objective meeting",
  //       description: "Client objective meeting",
  //       endingDate: "2020-02-17 15:51:02.787373",
  //       status: "Done",
  //       project: {
  //         id: 1,
  //         title: "Project Title",
  //         description: "What is it about",
  //         progression: 25,
  //         creationDate: new Date().toDateString(),
  //         endingDate: "2020-02-17 15:51:02.787373",
  //         status: "Todo",
  //         manager: {} as User,
  //         users: [] as User[],
  //         tickets: [] as Ticket[],
  //         files: [] as AppFile[],
  //         activities: [] as Activity[]
  //       }
  //     },
  //     {
  //       id: 2,
  //       title: "Assemble Outcomes Report for client",
  //       description: "Assemble Outcomes Report for client",
  //       endingDate: "2020-02-27 15:51:02.787373",
  //       status: "To Do",
  //       project: {
  //         id: 1,
  //         title: "Project Title",
  //         description: "What is it about",
  //         progression: 25,
  //         creationDate: new Date().toDateString(),
  //         endingDate: "2020-02-17 15:51:02.787373",
  //         status: "Todo",
  //         manager: {} as User,
  //         users: [] as User[],
  //         tickets: [] as Ticket[],
  //         files: [] as AppFile[],
  //         activities: [] as Activity[]
  //       }
  //     }
  //   ],
  //   activities: []
  // };

  useEffect(() => {
    if (id !== undefined) {
      httpGetUser(id);
    } else {
      setHasError(true);
      setError("Bad Request");
    }
  }, [id]);

  if (hasError) {
    return <ErrorController error={error} />;
  }

  const viewModel = new UserVM(user);
  return isLoading ? <Preloader /> : <UserPage viewModel={viewModel} />;
};
