import { useContext } from "react";
import AuthContext from "./context";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    localStorage.setItem("token", authToken);
    document.cookie = `token=${authToken}; path=/; max-age=2592000`;
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
  };

  return { user, logIn, logOut };
};

export default useAuth;
