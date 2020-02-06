import React, { FC } from "react";

export const ProjectPage: FC = () => {
    return(
        <Header />
        <AvatarList />
        <ProgressBar/>
        <TabView>
            <ChildTicket/>
            <ChildFile/>
            <ChildActivity/>
        </TabView>
    )
}