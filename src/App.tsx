import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* login */}
        <Route index element={<Login />} />
        {/* onboard */}

        {/* home */}
        <Route path="/home" element={<Home />} />

        {/* today question */}

        {/* answer */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
