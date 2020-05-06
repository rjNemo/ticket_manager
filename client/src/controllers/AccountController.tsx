import React, { FC, useState, useEffect } from "react";
import AccountPage from "../pages/AccountPage";
import User from "../types/User";
import { UserService } from "../services";
import { useAuth0 } from "../authentication/auth0";
import { getUID } from "../authentication/helpers";

const Account: FC = () => {
  const { getTokenSilently, user } = useAuth0();
  const [account, setAccount] = useState<User>({} as User);

  useEffect(() => {
    const getUserInfo = async () => {
      // fetch current user data
      const token: string = await getTokenSilently();
      const Users = new UserService(token);
      const uid: string = getUID(user);
      Users.get(uid)
        .then((authUser) => setAccount(authUser))
        .catch((err) => console.error(err));
    };
    getUserInfo();
  }, [getTokenSilently, user]);

  return <AccountPage account={account} />;
};

export default Account;
