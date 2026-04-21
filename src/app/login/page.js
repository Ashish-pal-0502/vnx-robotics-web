"use client";

import apiClient from "@/api/client";
import React, { useEffect, useState } from "react";

function page() {
  const [user, setUser] = useState();
  console.log("user");

  const loginUser = async () => {
    console.log("click");

    console.log("payload", {
      email: "erdkydv@gmail.com",
      password: "Dh@12345",
    });
    const response = await apiClient.post("/user/login", {
      email: "erdkydv@gmail.com",
      password: "Dh@12345",
    });
    console.log("response", response);

    // setUser(resopnse.data.user)
  };

  return (
    <div className="h-screen bg-accent-400 w-full">
      login page
      <button onClick={() => loginUser()}>login</button>
    </div>
  );
}

export default page;
