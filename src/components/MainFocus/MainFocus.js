import { useUserDetails } from "contexts";
import { useState, useEffect, useRef } from "react";
import { TbEdit } from "react-icons/tb";
import "./MainFocus.css";

export const MainFocus = () => {
  const { userDetails, setUserDetails } = useUserDetails();
  const { focus } = userDetails;
  const [mainFocus, setMainFocus] = useState(focus);
  const inputRef = useRef();

  useEffect(() => {
    !focus && inputRef.current.focus();
  }, [focus]);

  const setMainFocusHandler = (e) => {
    if (e.key === "Enter") {
      localStorage.setItem(
        "USER",
        JSON.stringify({ ...userDetails, focus: mainFocus })
      );
      setUserDetails((user) => ({
        ...user,
        focus: mainFocus,
      }));
    }
  };

  return (
    <div className="focus">
      {focus ? (
        <>
          <p className="focus__text">My main Focus for today is: {focus}</p>
          <TbEdit
            className="focus__edit"
            onClick={() =>
              setUserDetails((user) => ({
                ...user,
                focus: "",
              }))
            }
          />
        </>
      ) : (
        <div>
          <p className="focus__text">What is your main Focus for today?</p>
          <input
            className="focus__input"
            type="text"
            ref={inputRef}
            value={mainFocus}
            onChange={(e) => setMainFocus(e.target.value)}
            onKeyDown={setMainFocusHandler}
          />
        </div>
      )}
    </div>
  );
};
