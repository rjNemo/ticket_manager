import React, { FC } from "react";
import { UserAvatar } from "./UserAvatar";
import { Link } from "react-router-dom";

export const ProfileSelector: FC = () => {
  return (
    <div className="section col s10 offset-s1 white z-depth-1">
      <div className="row ">
        <div className="center ">
          <h4>Select a profile</h4>
          <Link to="/users/cd179eb7-3a54-4060-b22c-3e947bdffcbc">
            <UserAvatar
              alt=""
              picture="https://vignette.wikia.nocookie.net/jamescameronsavatar/images/0/08/Neytiri_Profilbild.jpg/revision/latest/scale-to-width-down/250?cb=20100107164021&path-prefix=de"
            />
          </Link>
          <h5>Demo User</h5>
        </div>
      </div>
    </div>
  );
};
