import React, { FC } from "react";
import Layout from "./pages/Layout";
import { useAuth0 } from "./authentication/auth0";

const App: FC = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Layout />
    </div>
  );
};

export default App;
