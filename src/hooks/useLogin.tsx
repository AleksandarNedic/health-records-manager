import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router";

export default function useLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";

      if (code === "auth/network-request-failed") {
        setError("Network error. Check your internet connection.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
}
