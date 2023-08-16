import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Levels from "./pages/Levels";
import Users from "./pages/Users";
import Devices from "./pages/Devices";
import Vehicles from "./pages/Vehicles";

function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/levels" element={<Levels />} />
          <Route path="/users" element={<Users />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
