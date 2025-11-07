import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import Splash from "./pages/Splash";
import Onboard from "./pages/Onboard";
import OnboardJoin from "./pages/OnboardJoin";
import OnboardJoinConfirm from "./pages/OnboardJoinConfirm";
import OnboardProfile from "./pages/OnboardProfile";
import OnboardCreate from "./pages/OnboardCreate";
import OnboardCreateComplete from "./pages/OnboardCreateComplete";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* splash */}
          <Route path="/" element={<Splash />} />
          {/* login */}
          <Route path="/login" element={<Login />} />
          {/* onboard */}
          <Route path="/onboard" element={<Onboard />} />
          <Route path="/onboard/join" element={<OnboardJoin />} />
          <Route path="/onboard/join/confirm" element={<OnboardJoinConfirm />} />
          <Route path="/onboard/create" element={<OnboardCreate />} />
          <Route
            path="/onboard/create/complete"
            element={<OnboardCreateComplete />}
          />
          <Route path="/onboard/profile" element={<OnboardProfile />} />
          {/* home */}
          <Route path="/home" element={<Home />} />

          {/* today question */}

          {/* answer */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
