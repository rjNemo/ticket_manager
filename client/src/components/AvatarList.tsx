import React, { FC } from "react";
import { FloatingButton } from "./FloatingButton";

interface AvatarListProps {
  avatars: string[];
}

export const AvatarList: FC<AvatarListProps> = ({ avatars }) => {
  return (
    <>
      {avatars.map((avatar: string) => (
        <img className="circle" src={avatar} width="32vh" height="32vh" />
      ))}
    </>
  );
};
