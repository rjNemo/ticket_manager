import React, { FC } from "react";
import { Header } from "../components/Header";
import { AvatarList } from "../components/AvatarList";
import { ProgressBar } from "../components/ProgressBar";

export const TicketPage: FC = () => {
  return (
    <>
      <Header
        description="Research, ideate and present brand concepts for client consideration"
        title="Brand Concept and Design"
      />
      {/* <AvatarList users={["../images/user_1.jpg", "../images/user_2.jpg"]} /> */}
      <ProgressBar value={60} />
      {/* // <TabView>
        //     <ChildTicket/>
        //     <ChildFile/>
        //     <ChildActivity/>
        // </TabView>
        // <Notes/> */}
    </>
  );
};
