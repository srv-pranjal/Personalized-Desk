import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    focus: "",
    is12HourClockEnabled: false,
    taskList: [],
    city: "",
  });

  useEffect(() => {
    localStorage.getItem("USER") &&
      setUserDetails(JSON.parse(localStorage.getItem("USER")));
  }, []);
  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserDetails = () => useContext(UserContext);

export { UserDetailsProvider, useUserDetails };
