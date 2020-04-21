import React from "react";
import { Router } from "react-router-dom";
import { useAuth0 } from "./authentication/auth0";
import MainLayout from "./layouts/MainLayout";
import AppRouter from "./routes/AppRouter";
import history from "./utils/history";
import Preloader from "./components/Preloader";

export default function App() {
  const { loading } = useAuth0();

  return loading ? (
    <Preloader />
  ) : (
    <Router history={history}>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </Router>
  );
}
