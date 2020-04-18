import React from "react";
import { Router } from "react-router-dom";
import { useAuth0 } from "./authentication/auth0";
import { history } from "./utils/history";
import MainLayout from "./layouts/MainLayout";
import { AppRouter } from "./routes/AppRouter";

export default function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router history={history}>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </Router>
  );
}
