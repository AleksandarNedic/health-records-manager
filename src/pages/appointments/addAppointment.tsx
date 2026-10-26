import { useState } from "react";
import { useNavigate } from "react-router";
import useAppointments from "../../hooks/useAppointments";

export default function AddAppointment() {
  const navigate = useNavigate();
  const { saveAppointment, loading, error } = useAppointments();
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const formData = new FormData(event.currentTarget);

    const appointmentData = {
      appointmentTitle: String(formData.get("appointmentTitle") || "").trim(),
      appointmentType: String(formData.get("appointmentType") || ""),
      doctorName: String(formData.get("doctorName") || "").trim(),
      specialty: String(formData.get("specialty") || "").trim(),
      appointmentDate: String(formData.get("appointmentDate") || ""),
      appointmentTime: String(formData.get("appointmentTime") || ""),
      location: String(formData.get("location") || "").trim(),
      appointmentNotes: String(formData.get("appointmentNotes") || "").trim(),
    };

    const saved = await saveAppointment(appointmentData);

    if (saved) {
      navigate("/appointments");
    } else {
      setFormError("Appointment could not be saved. Please try again.");
    }
  };

  return (
    <div className="health-app appointments-page">
      <main className="main-content">
        <header className="page-header">
          <div>
            <span className="page-eyebrow">HEALTH RECORDS</span>
            <h1>Appointments</h1>
            <p>Schedule and manage your medical appointments.</p>
          </div>

          <div className="appointments-header-icon">
            <i className="bi bi-calendar2-check" />
          </div>
        </header>

        <section className="medication-form-card">
          <div className="form-heading">
            <div className="form-heading-icon">
              <i className="bi bi-calendar-plus" />
            </div>

            <div>
              <h2>Book an appointment</h2>
              <p>Enter the details of your medical appointment below.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="medication-form-grid">
              <div className="form-group">
                <label htmlFor="appointmentTitle">
                  Appointment title <span>*</span>
                </label>
                <input
                  type="text"
                  id="appointmentTitle"
                  name="appointmentTitle"
                  placeholder="e.g. General check-up"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="appointmentType">
                  Appointment type <span>*</span>
                </label>
                <select
                  id="appointmentType"
                  name="appointmentType"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select appointment type
                  </option>
                  <option value="general-checkup">General check-up</option>
                  <option value="specialist">Specialist consultation</option>
                  <option value="dental">Dental appointment</option>
                  <option value="laboratory">Laboratory test</option>
                  <option value="imaging">Imaging / X-ray</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="doctorName">Doctor's name</label>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  placeholder="Enter doctor's name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="specialty">Specialty</label>
                <input
                  type="text"
                  id="specialty"
                  name="specialty"
                  placeholder="e.g. Cardiology"
                />
              </div>

              <div className="form-group">
                <label htmlFor="appointmentDate">
                  Date <span>*</span>
                </label>
                <input
                  type="date"
                  id="appointmentDate"
                  name="appointmentDate"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="appointmentTime">
                  Time <span>*</span>
                </label>
                <input
                  type="time"
                  id="appointmentTime"
                  name="appointmentTime"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="location">Clinic / Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter clinic name or address"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="appointmentNotes">Notes</label>
                <textarea
                  id="appointmentNotes"
                  name="appointmentNotes"
                  rows={4}
                  placeholder="Reason for appointment or other information..."
                />
              </div>
            </div>

            {(formError || error) && (
              <p className="error-message" role="alert">
                {formError || error}
              </p>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/dashboard")}
                disabled={loading}
              >
                <i className="bi bi-x-lg" />
                Cancel
              </button>

              <button type="submit" className="btn-primary" disabled={loading}>
                <i className="bi bi-calendar-check" />
                {loading ? "Saving..." : "Save appointment"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
