import React, { FC } from "react";

type AvatarListProps = {
  avatars: string[];
};

export const AvatarList: FC<AvatarListProps> = ({ avatars }) => {
  return (
    <div className="row">
      {avatars.map((avatar: string) => (
        <img className="circle" src={avatar} width="50vh" height="50vh" />
      ))}
    </div>
  );
};
