import React, { FC } from "react";
import { Header } from "../components/Header";
import { AvatarList } from "../components/AvatarList";
import { TicketVM } from "../VM/TicketVM";

interface IProps {
  viewModel: TicketVM;
}

export const TicketPage: FC<IProps> = ({ viewModel }) => {
  const { title, description, users } = viewModel;
  return (
    <div className="section">
      <div className="container">
        <Header title={title} description={description} />
        <AvatarList users={users} />
      </div>
    </div>
  );
};
