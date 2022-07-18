import {
  DisplayQuote,
  DisplayTime,
  DisplayWeather,
  GreetUser,
  MainFocus,
  Todo,
} from "components";
import "./Dashboard.css";

export const Dashboard = () => {
  return (
    <div className="dashboard section">
      <DisplayTime />
      <GreetUser />
      <MainFocus />
      <DisplayQuote />
      <Todo />
      <DisplayWeather />
    </div>
  );
};
