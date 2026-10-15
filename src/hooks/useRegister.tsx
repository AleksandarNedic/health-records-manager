
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router";
import { auth, db } from "../lib/firebase";

export default function useRegister() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName: name,
        email: userCredential.user.email,
        createdAt: serverTimestamp(),
      });

      navigate("/dashboard");
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";

      if (code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (code === "auth/weak-password") {
        setError("Password must contain at least 6 characters.");
      } else if (code === "auth/network-request-failed") {
        setError("Network error. Check your internet connection.");
      } else if (code === "permission-denied") {
        setError("You do not have permission to save your profile.");
      } else {
        setError("Failed to create an account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { register, error, loading };
}
