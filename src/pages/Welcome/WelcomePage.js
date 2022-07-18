import "./WelcomePage.css";
import { useState, useRef, useEffect } from "react";
import { useUserDetails } from "contexts";

export const WelcomePage = () => {
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef();
  const { userDetails, setUserDetails } = useUserDetails();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const setUserNameHandler = (e) => {
    if (e.key === "Enter") {
      localStorage.setItem(
        "USER",
        JSON.stringify({ ...userDetails, userName: userInput })
      );
      setUserDetails((user) => ({
        ...user,
        userName: userInput,
      }));
    }
  };

  return (
    <div className="welcome section">
      <p className="section__heading">Hello, What's your name</p>
      <input
        className="welcome__input"
        type="text"
        ref={inputRef}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={setUserNameHandler}
      />
      {userInput.length > 0 && <p>Press Enter</p>}
    </div>
  );
};
