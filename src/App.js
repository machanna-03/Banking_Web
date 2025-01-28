import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import OTPVerification from "./components/OtpVerification";
import MPINCreation from "./components/MPINCreation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/otp-verification/:email"
          exact
          element={<OTPVerification />}
        />
        <Route
          path="/mpin-creation"
          exact
          element={<MPINCreation />}
        />
        <Route
          path="/dashboard"
          exact
          element={<Dashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;
