import React from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <h1>Root</h1>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
