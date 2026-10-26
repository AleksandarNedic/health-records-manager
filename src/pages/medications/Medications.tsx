
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

interface Medication {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: string;
  endDate: string;
  prescribedBy: string;
  medicationNotes: string;
}

export default function Medications() {
  const navigate = useNavigate();

  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let unsubscribeMedications: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeMedications?.();
      unsubscribeMedications = undefined;

      if (!user) {
        setMedications([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      const medicationsCollection = collection(
        db,
        "users",
        user.uid,
        "medications"
      );

      unsubscribeMedications = onSnapshot(
        medicationsCollection,
        (snapshot) => {
          const medicationList: Medication[] = snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
              id: doc.id,
              medicationName: data.medicationName ?? "",
              dosage: data.dosage ?? "",
              frequency: data.frequency ?? "",
              route: data.route ?? "",
              startDate: data.startDate ?? "",
              endDate: data.endDate ?? "",
              prescribedBy: data.prescribedBy ?? "",
              medicationNotes: data.medicationNotes ?? "",
            };
          });

          setMedications(medicationList);
          setLoading(false);
        },
        (error) => {
          console.error("Error loading medications:", error);
          setError("Failed to load medications.");
          setLoading(false);
        }
      );
    });

    return () => {
      unsubscribeAuth();
      unsubscribeMedications?.();
    };
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const activeMedications = medications.filter(
    (medication) => !medication.endDate || medication.endDate >= today
  );

  const completedMedications = medications.filter(
    (medication) =>
      Boolean(medication.endDate) && medication.endDate < today
  );

  const formatValue = (value: string) => {
    if (!value) return "";

    return value
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  return (
    <div className="health-app medications-page">
      <main className="main-content">
        <header className="page-header">
          <div>
            <span className="page-eyebrow">HEALTH RECORDS</span>
            <h1>Medications</h1>
            <p>View and manage your medications and treatment history.</p>
          </div>

          <div className="medications-header-icon">
            <i className="bi bi-capsule" />
          </div>
        </header>

        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate("/dashboard")}
        >
          <i className="bi bi-arrow-left" />
          Back to Dashboard
        </button>

        <section className="medications-overview">
          <div className="medication-stat-card">
            <div className="medication-stat-icon">
              <i className="bi bi-capsule" />
            </div>
            <div>
              <p>Total medications</p>
              <h2>{medications.length}</h2>
            </div>
          </div>

          <div className="medication-stat-card">
            <div className="medication-stat-icon active">
              <i className="bi bi-check-circle" />
            </div>
            <div>
              <p>Active medications</p>
              <h2>{activeMedications.length}</h2>
            </div>
          </div>

          <div className="medication-stat-card">
            <div className="medication-stat-icon completed">
              <i className="bi bi-clock-history" />
            </div>
            <div>
              <p>Completed treatments</p>
              <h2>{completedMedications.length}</h2>
            </div>
          </div>
        </section>

        <section className="medications-list-panel">
          <div className="medications-list-header">
            <div>
              <h2>My medications</h2>
              <p>Your saved medication records will appear here.</p>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={() => navigate("/addmedications")}
            >
              <i className="bi bi-plus-lg" />
              Add Medication
            </button>
          </div>

          {loading ? (
            <p>Loading medications...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : medications.length === 0 ? (
            <div className="medications-empty-state">
              <div className="medications-empty-icon">
                <i className="bi bi-capsule" />
              </div>

              <h3>No medications yet</h3>

              <p>
                You haven't added any medications. Add your first medication
                to keep your treatment information organized.
              </p>

              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate("/addmedications")}
              >
                <i className="bi bi-plus-lg" />
                Add your first medication
              </button>
            </div>
          ) : (
            <div className="medications-list">
              {medications.map((medication) => (
                <article
                  key={medication.id}
                  className="medication-stat-card"
                >
                  <div className="medication-stat-icon">
                    <i className="bi bi-capsule" />
                  </div>

                  <div>
                    <h3>{medication.medicationName}</h3>

                    {medication.dosage && (
                      <p>Dosage: {medication.dosage}</p>
                    )}

                    {medication.frequency && (
                      <p>
                        Frequency: {formatValue(medication.frequency)}
                      </p>
                    )}

                    {medication.route && (
                      <p>Route: {formatValue(medication.route)}</p>
                    )}

                    {medication.startDate && (
                      <p>Start date: {medication.startDate}</p>
                    )}

                    {medication.endDate && (
                      <p>End date: {medication.endDate}</p>
                    )}

                    {medication.prescribedBy && (
                      <p>Prescribed by: {medication.prescribedBy}</p>
                    )}

                    {medication.medicationNotes && (
                      <p>Notes: {medication.medicationNotes}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="medications-footer">
          <i className="bi bi-shield-check" />
          Your health information should remain private and secure.
        </footer>
      </main>
    </div>
  );
}
