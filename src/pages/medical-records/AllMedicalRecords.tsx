import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router";
import { auth, db } from "../../lib/firebase";
import "../../App.css";

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

function formatDate(date: string): string {
  if (!date) return "Date not specified";

  const parsedDate = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function AllMedicalRecords() {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribeRecords: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeRecords?.();
      unsubscribeRecords = undefined;

      if (!user) {
        setRecords([]);
        setLoading(false);
        navigate("/login", { replace: true });
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
          const savedRecords: HealthRecord[] = snapshot.docs.map((document) => {
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

          setRecords(savedRecords);
          setLoading(false);
          setError("");
        },
        (snapshotError) => {
          console.error("Failed to load medical records:", snapshotError);
          setError("Could not load your medical records. Please try again.");
          setLoading(false);
        },
      );
    });

    return () => {
      unsubscribeAuth();
      unsubscribeRecords?.();
    };
  }, [navigate]);

  return (
    <div className="health-app all-records-page">
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <i className="bi bi-chevron-right" />{" "}
            <strong>Medical records</strong>
          </div>

          <button
            type="button"
            className="btn create-account-button"
            onClick={() => navigate("/dashboard")}
          >
            <i className="bi bi-arrow-left me-2" />
            Back to dashboard
          </button>
        </header>

        <section className="panel records-panel" id="records">
          <div className="panel-heading records-heading">
            <div>
              <span className="section-kicker">YOUR HEALTH HISTORY</span>
              <h2>All medical records</h2>
              <p className="panel-subtitle">
                Your health story, documented over time.
              </p>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={() => navigate("/medical-records/new")}
            >
              <i className="bi bi-plus-lg" /> Add health record
            </button>
          </div>

          {loading ? (
            <p className="panel-subtitle" role="status">
              Loading your medical records...
            </p>
          ) : error ? (
            <p className="panel-subtitle" role="alert">
              {error}
            </p>
          ) : records.length === 0 ? (
            <div className="empty-records">
              <i className="bi bi-folder2-open" />
              <p>No medical records yet.</p>
              <span>Your saved records will appear here.</span>

              <button
                type="button"
                className="primary-button"
                onClick={() => navigate("/medical-records/new")}
              >
                <i className="bi bi-plus-lg" /> Add health record
              </button>
            </div>
          ) : (
            <>
              <p className="panel-subtitle">
                {records.length} {records.length === 1 ? "record" : "records"}{" "}
                saved
              </p>

              <div className="record-list">
                {records.map((record) => (
                  <article className="record-row" key={record.id}>
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

                      {record.description && (
                        <p className="panel-subtitle">{record.description}</p>
                      )}
                    </div>

                    <span className="record-date">
                      {formatDate(record.date)}
                    </span>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>

        <footer className="app-footer">
          <span>
            <span className="footer-heart">+</span> pulsecare
            <span className="footer-dot">.</span>
          </span>

          <span>YOUR HEALTH JOURNEY, IN YOUR HANDS.</span>

          <span>
            DESIGNED FOR WELLBEING <i className="bi bi-heart-pulse" />
          </span>
        </footer>
      </main>
    </div>
  );
}

export default AllMedicalRecords;
