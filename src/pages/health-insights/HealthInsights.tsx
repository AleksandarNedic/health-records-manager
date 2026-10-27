export default function HealthInsights() {
  return (
    <div className="health-app health-insights-page">
      <main className="main-content">
        <header className="page-header">
          <div>
            <span className="page-eyebrow">YOUR HEALTH</span>
            <h1>Health Insights</h1>
            <p>Track your health and discover useful insights.</p>
          </div>

          <div className="appointments-header-icon">
            <i className="bi bi-heart-pulse" />
          </div>
        </header>

        <section className="health-insights-card">
          <div className="health-insights-heading">
            <div className="health-insights-icon">
              <i className="bi bi-clipboard2-pulse" />
            </div>

            <div>
              <h2>Personal Health Information</h2>
              <p>Enter your information to review your health.</p>
            </div>
          </div>

          <form className="health-insights-form">
            <div className="form-group">
              <label htmlFor="health-goal">Main Health Goal</label>
              <select id="health-goal" name="healthGoal" defaultValue="">
                <option value="" disabled>
                  Select your health goal
                </option>
                <option value="fitness">Improve fitness</option>
                <option value="nutrition">Improve nutrition</option>
                <option value="sleep">Improve sleep</option>
                <option value="weight">Manage weight</option>
                <option value="general">General well-being</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sleep-hours">Average Sleep (hours)</label>
                <input
                  id="sleep-hours"
                  name="sleepHours"
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  placeholder="e.g. 8"
                />
              </div>

              <div className="form-group">
                <label htmlFor="water-intake">
                  Daily Water Intake (liters)
                </label>
                <input
                  id="water-intake"
                  name="waterIntake"
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g. 2.5"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="activity-level">Activity Level</label>
              <select id="activity-level" name="activityLevel" defaultValue="">
                <option value="" disabled>
                  Select your activity level
                </option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="health-notes">Additional Notes</label>
              <textarea
                id="health-notes"
                name="healthNotes"
                rows={4}
                placeholder="Add any health-related notes or goals..."
              />
            </div>

            <div className="health-insights-actions">
              <button type="reset" className="insights-reset-button">
                Back
              </button>

              <button type="submit" className="insights-submit-button">
                <i className="bi bi-heart-pulse" />
                Generate Insights
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
