
import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import AddHealthRecord from "./pages/medical-records/AddHealthRecord";
import AllHealthRecords from "./pages/medical-records/AllMedicalRecords";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/medical-records/new" element={<AddHealthRecord />} />
      <Route path="/all-medical-records" element={<AllHealthRecords />} />
    </Routes>
  );
}

export default App;

