import React from "react";
import { Router } from "react-router-dom";
import { useAuth0 } from "./authentication/auth0";
import MainLayout from "./layouts/MainLayout";
import AppRouter from "./routes/AppRouter";
import history from "./utils/history";

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
