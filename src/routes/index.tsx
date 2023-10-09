import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { PageNotFound } from "../components";
import Containers from "../containers";
import ProtectedRoutes from "./private";

const LazyLoginPage = lazy(() => import("../pages/authentication/Login"));

const ApplicationRoutes = () => {
  return (
    <Router>
      <React.Fragment>
        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedRoutes
                component={Containers}
                authenticationComponent={LazyLoginPage}
              />
            }
          ></Route>
          <Route path="/login" element={<LazyLoginPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </React.Fragment>
    </Router>
  );
};

export default ApplicationRoutes;
