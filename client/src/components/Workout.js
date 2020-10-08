import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Wokrout() {
  const authContext = useContext(AuthContext);
  console.log(authContext, authContext.user);

  return <h1>Workout</h1>;
}
