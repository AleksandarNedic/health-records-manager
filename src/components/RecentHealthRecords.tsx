import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

interface HealthRecord {
  id: string;
  title: string;
  category: string;
  date: string;
  doctor: string;
  description: string;
}

function getCategoryIcon(category: string): string {
  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory.includes("laboratory")) {
    return "bi-droplet-half";
  }

  if (normalizedCategory.includes("vaccination")) {
    return "bi-shield-plus";
  }

  if (normalizedCategory.includes("prescription")) {
    return "bi-capsule";
  }

  if (normalizedCategory.includes("imaging")) {
    return "bi-camera";
  }

  if (
    normalizedCategory.includes("checkup") ||
    normalizedCategory.includes("check-up")
  ) {
    return "bi-clipboard2-pulse";
  }

  return "bi-file-earmark-medical";
}

function formatRecordDate(date: string) {
  if (!date) {
    return { day: "--", month: "---" };
  }

  const parsedDate = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return { day: "--", month: "---" };
  }

  return {
    day: String(parsedDate.getDate()).padStart(2, "0"),
    month: parsedDate.toLocaleString("en-US", { month: "short" }).toUpperCase(),
  };
}

function RecentHealthRecords() {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let unsubscribeRecords: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeRecords?.();
      unsubscribeRecords = undefined;

      if (!user) {
        setRecords([]);
        setLoading(false);
        setError("Please log in to view your medical records.");
        return;
      }

      setLoading(true);
      setError("");

      const recordsQuery = query(
        collection(db, "users", user.uid, "healthRecords"),
        orderBy("date", "desc"),
      );

      unsubscribeRecords = onSnapshot(
        recordsQuery,
        (snapshot) => {
          const userRecords: HealthRecord[] = snapshot.docs.map((document) => {
            const data = document.data();

            return {
              id: document.id,
              title: data.title ?? "Untitled record",
              category: data.category ?? "Medical record",
              date: data.date ?? "",
              doctor: data.doctor ?? "",
              description: data.description ?? "",
            };
          });

          setRecords(userRecords);
          setLoading(false);
          setError("");
        },
        (snapshotError) => {
          console.error("Error loading medical records:", snapshotError);
          setError("Could not load your medical records.");
          setLoading(false);
        },
      );
    });

    return () => {
      unsubscribeAuth();
      unsubscribeRecords?.();
    };
  }, []);

  return (
    <section className="panel records-panel" id="records">
      <div className="panel-heading records-heading">
        <div>
          <span className="section-kicker">04 / YOUR HISTORY</span>
          <h2>Recent medical records</h2>
          <p className="panel-subtitle">
            Your health story, documented over time.
          </p>
        </div>

        <button
          type="button"
          className="text-button"
          onClick={() => {
            document
              .getElementById("records")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          View all records <i className="bi bi-arrow-up-right" />
        </button>
      </div>

      <div className="record-list">
        {loading ? (
          <p className="panel-subtitle" role="status">
            Loading medical records...
          </p>
        ) : error ? (
          <p className="panel-subtitle" role="alert">
            {error}
          </p>
        ) : records.length === 0 ? (
          <div className="empty-records">
            <i className="bi bi-folder2-open" />
            <p>No medical records yet.</p>
            <span>Add your first health record to see it here.</span>
          </div>
        ) : (
          records.slice(0, 5).map((record) => {
            const { day, month } = formatRecordDate(record.date);

            return (
              <article className="record-row" key={record.id}>
                <div className="record-date">
                  <strong>{day}</strong>
                  <span>{month}</span>
                </div>

                <div className="record-icon">
                  <i className={`bi ${getCategoryIcon(record.category)}`} />
                </div>

                <div className="record-info">
                  <span className="record-category">
                    {record.category.toUpperCase()}
                  </span>

                  <strong>{record.title}</strong>

                  <span className="record-doctor">
                    {record.doctor || "Doctor not specified"}
                  </span>
                </div>

                <span className="record-status">
                  <i className="bi bi-check-circle-fill" /> Saved
                </span>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

export default RecentHealthRecords;
