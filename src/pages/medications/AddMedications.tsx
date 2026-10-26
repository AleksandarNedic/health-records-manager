import { useState } from "react";
import { useNavigate } from "react-router";
import useMedications from "../../hooks/useMedications";

export default function AddMedications() {
  const navigate = useNavigate();
  const { addMedication, loading, error } = useMedications();

  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

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
            onSubmit={async (event) => {
              event.preventDefault();

              setSuccessMessage("");
              setSubmitError("");

              const form = event.currentTarget;
              const formData = new FormData(form);

              try {
                const success = await addMedication({
                  medicationName: String(formData.get("medicationName") ?? ""),
                  dosage: String(formData.get("dosage") ?? ""),
                  frequency: String(formData.get("frequency") ?? ""),
                  route: String(formData.get("route") ?? ""),
                  startDate: String(formData.get("startDate") ?? ""),
                  endDate: String(formData.get("endDate") ?? ""),
                  prescribedBy: String(formData.get("prescribedBy") ?? ""),
                  medicationNotes: String(
                    formData.get("medicationNotes") ?? "",
                  ),
                });

                if (success) {
                  setSuccessMessage("Medication added successfully!");
                  form.reset();
                } else {
                  setSubmitError(
                    error || "Failed to add medication. Please try again.",
                  );
                }
              } catch {
                setSubmitError(
                  "An error occurred while adding the medication.",
                );
              }
            }}
          >
            {successMessage && (
              <p className="success-message" role="status">
                <i className="bi bi-check-circle" /> {successMessage}
              </p>
            )}

            {(submitError || error) && (
              <p className="error-message" role="alert">
                <i className="bi bi-exclamation-circle" />{" "}
                {submitError || error}
              </p>
            )}

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
                <i className="bi bi-x-lg" />
                Cancel
              </button>

              <button type="submit" className="btn-primary" disabled={loading}>
                <i className="bi bi-plus-lg" />
                {loading ? "Saving..." : "Add medication"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
