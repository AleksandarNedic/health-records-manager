import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import AddHealthRecord from "./pages/medical-records/AddHealthRecord";
import AllHealthRecords from "./pages/medical-records/AllMedicalRecords";
import Medications from "./pages/medications/Medications";
import AddMedications from "./pages/medications/AddMedications";
import Appointments from "../src/pages/appointments/Appointments";
import AddAppointment from "./pages/appointments/addAppointment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/medical-records/new" element={<AddHealthRecord />} />
      <Route path="/all-medical-records" element={<AllHealthRecords />} />
      <Route path="/medications" element={<Medications />} />
      <Route path="/addmedications" element={<AddMedications />} />
      <Route path="/appointments" element={<Appointments />}></Route>
      <Route path="/addappointment" element={<AddAppointment />}></Route>
    </Routes>
  );
}

export default App;
