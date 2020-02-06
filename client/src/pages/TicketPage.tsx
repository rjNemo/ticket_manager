import React, { FC } from "react";

export const TicketPage: FC = () => {
    return(
        <Header />
        <AvatarList />
        <ProgressBar/>
        <TabView>
            <ChildTicket/>
            <ChildFile/>
            <ChildActivity/>
        </TabView>
        <Notes/>
    )
}