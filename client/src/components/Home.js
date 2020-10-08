import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const authContext = useContext(AuthContext);
  console.log(authContext, authContext.user);

  return <h1>Home</h1>;
}
