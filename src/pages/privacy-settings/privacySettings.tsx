import { useState } from "react";
import { useNavigate } from "react-router";
import { collection, getDocs } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../../lib/firebase";

export default function PrivacySettings() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [exportLoading, setExportLoading] = useState(false);
  const [exportMessage, setExportMessage] = useState("");
  const [exportError, setExportError] = useState("");

  async function handlePasswordReset() {
    const email = auth.currentUser?.email;

    setPasswordMessage("");
    setPasswordError("");

    if (!email) {
      setPasswordError("No email is associated with your account.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setPasswordMessage("Password reset link sent to your email.");
    } catch {
      setPasswordError("Could not send the reset email. Please try again.");
    }
  }

  async function handleExportData() {
    const currentUser = auth.currentUser;

    setExportMessage("");
    setExportError("");

    if (!currentUser) {
      setExportError("You must be logged in to export your data.");
      return;
    }

    setExportLoading(true);

    try {
      const collectionNames = ["healthRecords", "medications", "appointments"];

      const exportedData: Record<string, unknown[]> = {};

      for (const collectionName of collectionNames) {
        const collectionRef = collection(
          db,
          "users",
          currentUser.uid,
          collectionName,
        );

        const snapshot = await getDocs(collectionRef);

        exportedData[collectionName] = snapshot.docs.map(
          (documentSnapshot) => ({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          }),
        );
      }

      const exportFile = {
        exportedAt: new Date().toISOString(),
        user: {
          uid: currentUser.uid,
          email: currentUser.email,
        },
        data: exportedData,
      };

      const blob = new Blob([JSON.stringify(exportFile, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "health-records-export.json";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);

      setExportMessage("Your data has been exported successfully.");
    } catch {
      setExportError(
        "Could not export your data. Check your connection and permissions, then try again.",
      );
    } finally {
      setExportLoading(false);
    }
  }

  return (
    <div className="privacy-page">
      <main className="privacy-main">
        <header className="privacy-header">
          <div>
            <span className="privacy-eyebrow">ACCOUNT &amp; SECURITY</span>
            <h1>Privacy Settings</h1>
            <p>Manage your personal information and data privacy.</p>
          </div>

          <button
            className="privacy-back-btn"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            <i className="bi bi-arrow-left" />
            Back to Dashboard
          </button>
        </header>

        <section className="privacy-profile-card">
          <div className="privacy-profile-icon">
            <i className="bi bi-shield-lock" />
          </div>

          <div>
            <h2>Your privacy matters</h2>
            <p>
              Your health information is personal. Review your privacy
              preferences and account security below.
            </p>
          </div>

          <span className="privacy-status">
            <i className="bi bi-shield-check" /> Privacy Center
          </span>
        </section>

        <section className="privacy-section">
          <div className="privacy-section-heading">
            <i className="bi bi-person-lock" />
            <div>
              <h2>Account Privacy</h2>
              <p>Manage your account and personal information.</p>
            </div>
          </div>

          <div className="privacy-setting-row">
            <div className="privacy-setting-icon">
              <i className="bi bi-envelope" />
            </div>

            <div className="privacy-setting-info">
              <h3>Account email</h3>
              <p>{user?.email || "No email available"}</p>
            </div>

            <span className="privacy-tag">Account</span>
          </div>

          <div className="privacy-setting-row">
            <div className="privacy-setting-icon">
              <i className="bi bi-shield-check" />
            </div>

            <div className="privacy-setting-info">
              <h3>Secure access</h3>
              <p>Your account is protected by Firebase Authentication.</p>
            </div>

            <button
              type="button"
              className="privacy-back-btn"
              onClick={handlePasswordReset}
            >
              Reset password
            </button>
          </div>

          {passwordMessage && (
            <p
              className="privacy-feedback privacy-feedback-success"
              role="status"
            >
              <i className="bi bi-check-circle" />
              {passwordMessage}
            </p>
          )}

          {passwordError && (
            <p className="privacy-feedback privacy-feedback-error" role="alert">
              <i className="bi bi-exclamation-circle" />
              {passwordError}
            </p>
          )}
        </section>

        <section className="privacy-section">
          <div className="privacy-section-heading">
            <i className="bi bi-heart-pulse" />
            <div>
              <h2>Health Data</h2>
              <p>Understand how your personal health information is handled.</p>
            </div>
          </div>

          <div className="privacy-setting-row">
            <div className="privacy-setting-icon">
              <i className="bi bi-database-lock" />
            </div>

            <div className="privacy-setting-info">
              <h3>Personal health records</h3>
              <p>
                Medical records, medications and appointments may contain
                sensitive personal information.
              </p>
            </div>
          </div>

          <div className="privacy-setting-row">
            <div className="privacy-setting-icon">
              <i className="bi bi-person-check" />
            </div>

            <div className="privacy-setting-info">
              <h3>Personal data access</h3>
              <p>
                Access to your records should be restricted to your
                authenticated account.
              </p>
            </div>
          </div>
        </section>

        <section className="privacy-section">
          <div className="privacy-section-heading">
            <i className="bi bi-sliders" />
            <div>
              <h2>Data Management</h2>
              <p>Options for managing your stored information.</p>
            </div>
          </div>

          <div className="privacy-setting-row">
            <div className="privacy-setting-icon">
              <i className="bi bi-file-earmark-arrow-down" />
            </div>

            <div className="privacy-setting-info">
              <h3>Export your data</h3>
              <p>Get a copy of your personal health information.</p>
            </div>

            <button
              type="button"
              className="privacy-back-btn"
              onClick={handleExportData}
              disabled={exportLoading}
            >
              {exportLoading ? "Exporting..." : "Export data"}
            </button>
          </div>

          {exportMessage && (
            <p
              className="privacy-feedback privacy-feedback-success"
              role="status"
            >
              <i className="bi bi-check-circle" />
              {exportMessage}
            </p>
          )}

          {exportError && (
            <p className="privacy-feedback privacy-feedback-error" role="alert">
              <i className="bi bi-exclamation-circle" />
              {exportError}
            </p>
          )}

          <div className="privacy-setting-row">
            <div className="privacy-setting-icon privacy-danger-icon">
              <i className="bi bi-trash3" />
            </div>

            <div className="privacy-setting-info">
              <h3>Delete health data</h3>
              <p>
                Permanently remove selected health records from your account.
              </p>
            </div>

            <span className="privacy-tag privacy-tag-planned">Coming soon</span>
          </div>
        </section>

        <section className="privacy-notice">
          <i className="bi bi-info-circle" />

          <div>
            <h3>Important privacy notice</h3>
            <p>
              The export option downloads health records, medications and
              appointments stored under your user document. Actual data
              protection depends on Firebase security rules and the way your
              application handles stored information.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
