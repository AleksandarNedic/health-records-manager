import { useState } from "react";
import { auth, db } from "../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

type AppointmentData = {
  appointmentTitle: string;
  appointmentType: string;
  doctorName: string;
  specialty: string;
  appointmentDate: string;
  appointmentTime: string;
  location: string;
  appointmentNotes: string;
};

export default function useAppointments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const saveAppointment = async (appointment: AppointmentData) => {
    const user = auth.currentUser;

    if (!user) {
      setError("You must be logged in to save an appointment.");
      return false;
    }

    setLoading(true);
    setError("");

    try {
      const appointmentsRef = collection(db, "users", user.uid, "appointments");

      const docRef = await addDoc(appointmentsRef, {
        ...appointment,
        createdAt: serverTimestamp(),
      });

      console.log("Appointment saved with ID:", docRef.id);

      return true;
    } catch (error) {
      console.error("Error adding appointment:", error);
      setError("Failed to save appointment. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { saveAppointment, loading, error };
}
