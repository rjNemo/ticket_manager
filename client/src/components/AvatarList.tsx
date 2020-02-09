import React, { FC } from "react";
import { Button } from "./Button";
import { FloatingButton } from "./FloatingButton";

type AvatarListProps = {
  avatars: string[];
};

export const AvatarList: FC<AvatarListProps> = ({ avatars }) => {
  return (
    <div className="row valign-wrapper">
      {avatars.map((avatar: string) => (
        <img className="circle" src={avatar} width="32vh" height="32vh" />
      ))}
      <FloatingButton icon="add" color="grey" size="small" />
    </div>
  );
};
