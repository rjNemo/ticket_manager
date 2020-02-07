import React, { FC } from "react";
import { Header } from "../components/Header";
import { AvatarList } from "../components/AvatarList";
import { ProgressBar } from "../components/ProgressBar";

export const TicketPage: FC = () => {
  return (
    <>
      <Header description = "Research, ideate and present brand concepts for client consideration" title = "Brand Concept and Design"/>
      <AvatarList avatars={["../images/user_1.jpg", "../images/user_2.jpg"]} />
      <ProgressBar />
      {/* // <TabView>
        //     <ChildTicket/>
        //     <ChildFile/>
        //     <ChildActivity/>
        // </TabView>
        // <Notes/> */}
    </>
  );
};
