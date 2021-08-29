import React, { lazy, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoadingPage from "../pages/LoadingPage/LoadingPage";
import { Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage/SettingsPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));

const Routes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <ProtectedRoute path="/parametres" component={SettingsPage} />

          <Route path="/login">
            <RegisterPage />
          </Route>
          <Route path="/signup">
            <RegisterPage />
          </Route>

          <Route path="/not-found">
            <NotFoundPage />
          </Route>
          <Redirect to="/not-found" />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routes;
