import React from "react";
import { Outlet } from "react-router-dom";
import AppCTA from "../sections/AppCTA";

const Layout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <AppCTA />
    </div>
  );
};

export default Layout;
