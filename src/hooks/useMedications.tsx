
import { useState } from "react";
import { auth, db } from "../lib/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

export default function useMedications() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addMedication = async (medication: {
    medicationName: string;
    dosage: string;
    frequency: string;
    route: string;
    startDate: string;
    endDate: string;
    prescribedBy: string;
    medicationNotes: string;
  }) => {
    const user = auth.currentUser;

    if (!user) {
      setError("You must be logged in to add a medication.");
      return false;
    }

    setLoading(true);
    setError("");

    try {
      await addDoc(
        collection(db, "users", user.uid, "medications"),
        {
          ...medication,
          createdAt: serverTimestamp(),
        }
      );

      return true;
    } catch (error) {
      console.error("Error adding medication:", error);
      setError("Failed to add medication. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addMedication, loading, error };
}
