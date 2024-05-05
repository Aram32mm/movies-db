import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";
import React from "react";

const PrivateRouter = () => {
  return (
    <div>
      <Header />
      <div className="m-10">
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateRouter;
