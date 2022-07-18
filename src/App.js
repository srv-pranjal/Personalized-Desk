import { useUserDetails } from "contexts";
import { WelcomePage, Dashboard } from "pages";

function App() {
  const {
    userDetails: { userName },
  } = useUserDetails();

  return (
    <div>
      {userName.length > 0 ? <Dashboard /> : <WelcomePage />}
    </div>
  );
}

export default App;
