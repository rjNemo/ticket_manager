import React from "react";
import { Router } from "react-router-dom";
import Layout from "./pages/Layout";
import { useAuth0 } from "./authentication/auth0";
// import history from "./utils/history";
import * as createHistory from "history";
export const history = createHistory.createBrowserHistory();
export default function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router history={history}>
      <Layout />
    </Router>
  );
}
