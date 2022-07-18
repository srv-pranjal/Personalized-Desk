import { DisplayTime, GreetUser } from "components";
import "./Dashboard.css";

export const Dashboard = () => {
  return (
    <div className="dashboard section">
      <DisplayTime />
      <GreetUser />
    </div>
  );
};
