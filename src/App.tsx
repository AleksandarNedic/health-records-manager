
import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import AddHealthRecord from "./pages/medical-records/AddHealthRecord";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/medical-records/new" element={<AddHealthRecord />} />
    </Routes>
  );
}

export default App;

