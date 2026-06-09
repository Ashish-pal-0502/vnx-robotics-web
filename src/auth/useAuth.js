// import { useContext } from "react";
// import AuthContext from "./context";
// import { jwtDecode } from "jwt-decode";

// const useAuth = () => {
//   const { user, setUser } = useContext(AuthContext);

//   const logIn = (authToken) => {
//     const user = jwtDecode(authToken);
//     setUser(user);
//     localStorage.setItem("token", authToken);
//     document.cookie = `token=${authToken}; path=/; max-age=2592000`;
//   };

//   const logOut = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//     document.cookie = "token=; path=/; max-age=0";
//     document.cookie = "authToken=; path=/; max-age=0";
//   };

//   return { user, logIn, logOut };
// };

// export default useAuth;

import { useContext } from "react";
import AuthContext from "./context";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (accessToken, refreshToken = null) => {
    const user = jwtDecode(accessToken);
    setUser(user);

    // Store tokens in localStorage only
    localStorage.setItem("accessToken", accessToken);

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    // ❌ REMOVE all cookie code
    // document.cookie = `token=${accessToken}; path=/; max-age=2592000`;
  };

  const logOut = () => {
    setUser(null);

    // Clear localStorage only
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // ❌ REMOVE cookie clearing code
    // document.cookie = "token=; path=/; max-age=0";
  };

  return { user, logIn, logOut };
};

export default useAuth;
