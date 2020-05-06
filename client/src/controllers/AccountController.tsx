import React, { FC, useState, useEffect, useRef } from "react";
import AccountPage from "../pages/AccountPage";
import Preloader from "../components/Preloader";
import User from "../types/User";
import { UserService } from "../services";
import { useAuth0 } from "../authentication/auth0";
import { getUID } from "../authentication/helpers";

const AccountController: FC = () => {
  const { getTokenSilently, user } = useAuth0();
  const [account, setAccount] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  const token = useRef<string>("");

  useEffect(() => {
    const getUserInfo = async () => {
      // fetch current user data
      token.current = await getTokenSilently();
      const Users = new UserService(token.current);
      const uid: string = getUID(user);

      Users.get(uid)
        .then((authUser) => setAccount(authUser))
        .catch((err) => console.error(err));
    };

    getUserInfo().then(() => setLoading(false));
  }, [getTokenSilently, user]);

  return loading ? (
    // display preloader until data is fetched
    <Preloader />
  ) : // don't render page until data is fetched
  !!account ? (
    <AccountPage account={account} token={token.current} />
  ) : null;
};

export default AccountController;
