import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Goals() {
  const authContext = useContext(AuthContext);
  console.log(authContext, authContext.user);

  return <h1>Goals</h1>;
}
