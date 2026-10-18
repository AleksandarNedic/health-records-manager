import { useNavigate } from "react-router";

export default function AddMedications() {
  const navigate = useNavigate();

  return (
    <div className="health-app medications-page">
      <main className="main-content">
        <header className="page-header">
          <div>
            <span className="page-eyebrow">HEALTH RECORDS</span>
            <h1>Medications</h1>
            <p>Manage your medications and keep track of your treatments.</p>
          </div>

          <div className="medications-header-icon">
            <i className="bi bi-capsule" />
          </div>
        </header>

        <section className="medication-form-card">
          <div className="form-heading">
            <div className="form-heading-icon">
              <i className="bi bi-prescription2" />
            </div>

            <div>
              <h2>Add medication</h2>
              <p>Enter the details of your medication below.</p>
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              navigate("/medications");
            }}
          >
            <div className="medication-form-grid">
              <div className="form-group">
                <label htmlFor="medicationName">
                  Medication name <span>*</span>
                </label>
                <input
                  type="text"
                  id="medicationName"
                  name="medicationName"
                  placeholder="e.g. Medication name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dosage">Dosage</label>
                <input
                  type="text"
                  id="dosage"
                  name="dosage"
                  placeholder="e.g. 500 mg"
                />
              </div>

              <div className="form-group">
                <label htmlFor="frequency">Frequency</label>
                <select id="frequency" name="frequency" defaultValue="">
                  <option value="" disabled>
                    Select frequency
                  </option>
                  <option value="once-daily">Once daily</option>
                  <option value="twice-daily">Twice daily</option>
                  <option value="three-times-daily">Three times daily</option>
                  <option value="as-needed">As needed</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="route">Administration route</label>
                <select id="route" name="route" defaultValue="">
                  <option value="" disabled>
                    Select route
                  </option>
                  <option value="oral">Oral</option>
                  <option value="topical">Topical</option>
                  <option value="injection">Injection</option>
                  <option value="inhalation">Inhalation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="startDate">Start date</label>
                <input type="date" id="startDate" name="startDate" />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End date</label>
                <input type="date" id="endDate" name="endDate" />
              </div>

              <div className="form-group full-width">
                <label htmlFor="prescribedBy">Prescribed by</label>
                <input
                  type="text"
                  id="prescribedBy"
                  name="prescribedBy"
                  placeholder="Doctor's name (optional)"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="medicationNotes">Notes</label>
                <textarea
                  id="medicationNotes"
                  name="medicationNotes"
                  rows={4}
                  placeholder="Additional information..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/medications")}
              >
                Cancel
              </button>

              <button type="submit" className="btn-primary">
                <i className="bi bi-plus-lg" />
                Add medication
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
