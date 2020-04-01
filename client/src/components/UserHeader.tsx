import React, { FC } from "react";
import { Header } from "../components/Header";
import { UserAvatar } from "./UserAvatar";

interface IProps {
  fullName: string;
  presentation: string;
  picture: string;
}
export const UserHeader: FC<IProps> = ({ fullName, presentation, picture }) => {
  return (
    <div className="row valign-wrapper">
      <div className="col s2">
        <UserAvatar picture={picture} alt="" />
      </div>
      <div className="col s10">
        <Header title={fullName} description={presentation} />
      </div>
    </div>
  );
};
