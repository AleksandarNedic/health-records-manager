import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import "../../App.css";
import { addHealthRecord } from "../../lib/healthRecords";

function AddHealthRecord() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      await addHealthRecord({
        title: title.trim(),
        category,
        date,
        doctor: doctor.trim(),
        description: description.trim(),
      });

      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("Failed to save health record:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to save the health record. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="health-app">
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <i className="bi bi-chevron-right" />{" "}
            <strong>Add health record</strong>
          </div>

          <button
            type="button"
            className="outline-button"
            onClick={() => navigate("/dashboard")}
            disabled={loading}
          >
            <i className="bi bi-arrow-left me-2" />
            Back to dashboard
          </button>
        </header>

        <section className="welcome-section">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              YOUR HEALTH HISTORY
            </div>

            <h1>
              Add a health <br />
              <span>record.</span>
            </h1>

            <p className="welcome-copy">
              Keep your medical information organized in one place.
            </p>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">NEW ENTRY</span>
              <h2>Medical record details</h2>
              <p className="panel-subtitle">
                Enter the details of your medical visit or report.
              </p>
            </div>

            <span className="appointment-icon">
              <i className="bi bi-clipboard2-pulse" />
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-12">
                <label htmlFor="title" className="form-label">
                  Record title
                </label>

                <input
                  id="title"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Blood test results"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="category" className="form-label">
                  Category
                </label>

                <select
                  id="category"
                  className="form-select"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="General checkup">General checkup</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Vaccination">Vaccination</option>
                  <option value="Prescription">Prescription</option>
                  <option value="Imaging">Medical imaging</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="date" className="form-label">
                  Record date
                </label>

                <input
                  id="date"
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="doctor" className="form-label">
                  Doctor or medical facility
                </label>

                <input
                  id="doctor"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Dr. Smith or City Medical Center"
                  value={doctor}
                  onChange={(event) => setDoctor(event.target.value)}
                />
              </div>

              <div className="col-12">
                <label htmlFor="description" className="form-label">
                  Description and notes
                </label>

                <textarea
                  id="description"
                  className="form-control"
                  rows={5}
                  placeholder="Add details about the visit, results, or recommendations..."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="alert alert-danger mt-4" role="alert">
                {error}
              </div>
            )}

            <div className="d-flex justify-content-end gap-3 mt-4">
              <button
                type="button"
                className="outline-button"
                onClick={() => navigate("/dashboard")}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={loading}
              >
                <i className="bi bi-plus-lg me-2" />
                {loading ? "Saving..." : "Save record"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddHealthRecord;
