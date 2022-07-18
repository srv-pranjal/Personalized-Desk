import { useUserDetails } from "contexts";
import { WelcomePage } from "pages";

function App() {
  const {
    userDetails: { userName },
  } = useUserDetails();

  return (
    <div>
      <WelcomePage />
    </div>
  );
}

export default App;
