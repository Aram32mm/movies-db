import { IPill } from "./types";
import React from "react";
import classNames from "classnames";

const Pill: React.FC<IPill> = ({ title, color }) => {
  const pillClass = classNames({
    "text-white text-sm font-medium leading-none my-0 mx-0 mb-1 p-1.5 table rounded":
      true,
    "bg-red-500": color === "red",
    "bg-yellow-500": color === "yellow",
    "bg-green-500": color === "green",
  });
  return <div className={pillClass}>{title}</div>;
};

export default Pill;
