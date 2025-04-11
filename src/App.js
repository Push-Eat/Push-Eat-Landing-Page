import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Privacy from "./components/pages/Privacy";
import Terms_Service from "./components/pages/Terms_Service";
import Contact_us from "./components/pages/Contact_us";
import Layout from "./components/UI/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/privacy"
          element={
            <Layout>
              <Privacy />
            </Layout>
          }
        />
        <Route
          path="/terms"
          element={
            <Layout>
              <Terms_Service />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact_us />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
