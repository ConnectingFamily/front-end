import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* login */}
          <Route index element={<Login />} />
          {/* onboard */}

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
