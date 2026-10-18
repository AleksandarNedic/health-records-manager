import { useNavigate } from "react-router";

export default function Medications() {
  const navigate = useNavigate();

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
              <h2>0</h2>
            </div>
          </div>

          <div className="medication-stat-card">
            <div className="medication-stat-icon active">
              <i className="bi bi-check-circle" />
            </div>
            <div>
              <p>Active medications</p>
              <h2>0</h2>
            </div>
          </div>

          <div className="medication-stat-card">
            <div className="medication-stat-icon completed">
              <i className="bi bi-clock-history" />
            </div>
            <div>
              <p>Completed treatments</p>
              <h2>0</h2>
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

          <div className="medications-empty-state">
            <div className="medications-empty-icon">
              <i className="bi bi-capsule" />
            </div>

            <h3>No medications yet</h3>

            <p>
              You haven't added any medications. Add your first medication to
              keep your treatment information organized.
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
        </section>

        <footer className="medications-footer">
          <i className="bi bi-shield-check" />
          Your health information should remain private and secure.
        </footer>
      </main>
    </div>
  );
}
