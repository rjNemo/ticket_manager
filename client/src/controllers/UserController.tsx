import React, { FC, useState, useEffect } from "react";
import { UserPage } from "../pages/UserPage";
import { UserVM } from "../VM/UserVM";
import { User } from "../types/User";
import { AppFile } from "../types/AppFile";
import { Activity } from "../types/Activity";
import { Ticket } from "../types/Ticket";
import { Preloader } from "../components/Preloader";

export const UserController: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const user: User = {
    id: "resldsm,dgd",
    firstName: "David",
    lastName: "Whittaker",
    fullName: "David Whittaker",
    presentation: "Interface designer and front-end developer",
    creationDate: new Date().toDateString(),
    email: "dw@mail.au",
    phone: "0998765432",
    picture: require("../images/user_1.jpg"),
    projects: [
      {
        id: 1,
        title: "Project Title",
        description: "What is it about",
        progression: 25,
        creationDate: new Date().toDateString(),
        endingDate: "2020-02-17 15:51:02.787373",
        status: "Todo",
        manager: {} as User,
        users: [] as User[],
        tickets: [] as Ticket[],
        files: [] as AppFile[],
        activities: [] as Activity[]
      }
    ],
    tickets: [
      {
        id: 1,
        title: "Client objective meeting",
        description: "Client objective meeting",
        endingDate: "2020-02-17 15:51:02.787373",
        status: "Done"
      },
      {
        id: 2,
        title: "Assemble Outcomes Report for client",
        description: "Assemble Outcomes Report for client",
        endingDate: "2020-02-27 15:51:02.787373",
        status: "To Do"
      }
    ],
    activities: []
  };
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  });
  const viewModel = new UserVM(user);
  return isLoading ? <Preloader /> : <UserPage viewModel={viewModel} />;
};
