import { useUserDetails } from "contexts";
import { useState, useEffect, useRef } from "react";
import { getUserGreeting } from "utils";
import { TbEdit } from "react-icons/tb";
import "./GreetUser.css";

export const GreetUser = () => {
  const [userGreeting, setUserGreeting] = useState("Good Morning");
  const [editUserName, setEditUserName] = useState(false);
  const { userDetails, setUserDetails } = useUserDetails();
  const { userName } = userDetails;
  const [newUserName, setNewUserName] = useState(userName);
  const inputRef = useRef();

  useEffect(() => {
    setUserGreeting(getUserGreeting());
  }, []);

  useEffect(() => {
    editUserName && inputRef.current.focus();
  }, [editUserName]);

  const setNewUserNameHandler = () => {
    localStorage.setItem(
      "USER",
      JSON.stringify({ ...userDetails, userName: newUserName })
    );
    setUserDetails((user) => ({
      ...user,
      userName: newUserName,
    }));
    setEditUserName(false);
  };

  return (
    <div className="greeting">
      <span>{userGreeting}, </span>
      {editUserName ? (
        <input
          className="greeting__input"
          type="text"
          ref={inputRef}
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setNewUserNameHandler()}
          onBlur={setNewUserNameHandler}
        />
      ) : (
        <>
          <span>{userName}</span>
          <TbEdit
            className="greeting__edit"
            onClick={() => setEditUserName(true)}
          />
        </>
      )}
    </div>
  );
};
