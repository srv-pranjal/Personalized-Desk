import { DisplayQuote, DisplayTime, GreetUser, MainFocus } from "components";
import "./Dashboard.css";

export const Dashboard = () => {
  return (
    <div className="dashboard section">
      <DisplayTime />
      <GreetUser />
      <MainFocus />
      <DisplayQuote />
    </div>
  );
};
