import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import OTPVerification from "./components/OtpVerification";
import MPINCreation from "./components/MPINCreation";
import { Dashboard } from "./components/Dashboard";
import MPINLogin from "./components/MPINLogin";

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
        <Route
          path="/Mpin-login"
          exact
          element={<MPINLogin />}
        />
      </Routes>
    </Router>
  );
}

export default App;
