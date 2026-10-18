import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

export interface NewHealthRecord {
  title: string;
  category: string;
  date: string;
  doctor: string;
  description: string;
}

export async function addHealthRecord(
  record: NewHealthRecord,
): Promise<string> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be logged in to save a health record.");
  }

  try {
    const docRef = await addDoc(
      collection(db, "users", user.uid, "healthRecords"),
      {
        ...record,
        createdAt: serverTimestamp(),
      },
    );

    return docRef.id;
  } catch (error: unknown) {
    console.error("Error adding health record:", error);
    throw error;
  }
}
