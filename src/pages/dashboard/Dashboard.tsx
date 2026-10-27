import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { auth, db } from "../../lib/firebase";
import "../../App.css";
import RecentHealthRecords from "../../components/RecentHealthRecords";

const healthMetrics = [
  {
    label: "Heart rate",
    value: "72",
    unit: "BPM",
    icon: "bi-heart-pulse",
    change: "Normal range",
    color: "lime",
  },
  {
    label: "Blood pressure",
    value: "118/78",
    unit: "mmHg",
    icon: "bi-activity",
    change: "Optimal",
    color: "purple",
  },
  {
    label: "Sleep quality",
    value: "8.2",
    unit: "HRS",
    icon: "bi-moon-stars",
    change: "+12% this week",
    color: "blue",
  },
];

const week = [
  { day: "M", height: 42 },
  { day: "T", height: 66 },
  { day: "W", height: 51 },
  { day: "T", height: 83 },
  { day: "F", height: 61 },
  { day: "S", height: 95 },
  { day: "S", height: 72 },
];

function Dashboard() {
  const [fullName, setFullName] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      const user = auth.currentUser;

      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!isMounted) return;

        if (userSnapshot.exists()) {
          const profile = userSnapshot.data();
          setFullName(profile.fullName || user.email || "User");
        } else {
          setFullName(user.displayName || user.email || "User");
        }
      } catch {
        if (!isMounted) return;

        setFullName(user.displayName || user.email || "User");
        setError("Could not load your profile.");
      } finally {
        if (isMounted) {
          setLoadingProfile(false);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  async function handleLogout() {
    setLogoutLoading(true);
    setError("");

    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch {
      setError("Failed to log out. Please try again.");
    } finally {
      setLogoutLoading(false);
    }
  }

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return (
    <div className="health-app">
      <aside className="sidebar">
        <button
          type="button"
          className="brand"
          onClick={() => navigate("/dashboard")}
        >
          <span className="brand-mark">
            <i className="bi bi-plus-lg" />
          </span>

          <span>
            pulse<span className="brand-light">care</span>
            <small>PERSONAL HEALTH OS</small>
          </span>
        </button>

        <div className="nav-label">WORKSPACE</div>

        <nav className="app-nav">
          <button
            type="button"
            className="nav-item active"
            onClick={() => navigate("/dashboard")}
          >
            <i className="bi bi-grid-1x2-fill" />
            Overview
            <span className="nav-indicator" />
          </button>

          <button
            type="button"
            className="nav-item"
            onClick={() => navigate("/all-medical-records")}
          >
            <i className="bi bi-folder2-open" />
            Medical records
          </button>

          <button
            type="button"
            className="nav-item"
            onClick={() => navigate("/medications")}
          >
            <i className="bi bi-capsule" />
            Medications
          </button>

          <button
            type="button"
            className="nav-item"
            onClick={() => navigate("/appointments")}
          >
            <i className="bi bi-calendar2-week" />
            Appointments
            <span className="nav-dot" />
          </button>

          <button
            type="button"
            className="nav-item"
            onClick={() => navigate("/healthinsights")}
          >
            <i className="bi bi-graph-up-arrow" />
            Health insights
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="privacy-card">
            <div className="privacy-icon">
              <i className="bi bi-shield-lock" />
            </div>

            <span className="privacy-title">Your health. Your data.</span>

            <p>Your personal health information deserves privacy.</p>

            <button
              type="button"
              className="privacy-link"
              onClick={() => navigate("/privacy")}
            >
              Privacy settings <i className="bi bi-arrow-up-right" />
            </button>
          </div>

          <div className="profile">
            <div className="avatar">{initials || "U"}</div>

            <div className="profile-info">
              <strong>{loadingProfile ? "Loading..." : fullName}</strong>
              <span>Personal account</span>
            </div>

            <button
              type="button"
              className="icon-button"
              onClick={handleLogout}
              disabled={logoutLoading}
              aria-label="Log out"
              title="Log out"
            >
              <i
                className={`bi ${
                  logoutLoading ? "bi-hourglass-split" : "bi-box-arrow-right"
                }`}
              />
            </button>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <i className="bi bi-chevron-right" />{" "}
            <strong>Overview</strong>
          </div>

          <div className="top-actions">
            <span className="sync-status">
              <span /> YOUR PERSONAL HEALTH SPACE
            </span>

            <div className="top-date">
              <i className="bi bi-calendar3" /> OCT 2026
            </div>

            <button
              type="button"
              className="btn create-account-button logout-button"
              onClick={handleLogout}
              disabled={logoutLoading}
            >
              <i className="bi bi-box-arrow-right me-2" />
              {logoutLoading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </header>

        {error && (
          <div className="login-error dashboard-error" role="alert">
            <i className="bi bi-exclamation-circle me-2" />
            {error}
          </div>
        )}

        <section className="welcome-section">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" />
              YOUR PERSONAL HEALTH SPACE
            </div>

            <h1>
              Welcome, <br />
              <span>
                {loadingProfile ? "..." : fullName.split(" ")[0] || "there"}.
              </span>
            </h1>

            <p className="welcome-copy">
              One clear view of your health journey, all in one place.
            </p>
          </div>

          <div className="welcome-right">
            <div className="date-label">YOUR HEALTH, YOUR PRIORITY</div>

            <button
              type="button"
              className="primary-button"
              onClick={() => navigate("/medical-records/new")}
            >
              <i className="bi bi-plus-lg" /> Add health record
            </button>
          </div>

          <div className="hero-decoration">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />

            <div className="orbit-core">
              <i className="bi bi-heart-pulse" />
            </div>

            <span className="orbit-label">
              HEALTH
              <br />
              IN FOCUS
            </span>
          </div>
        </section>

        <section className="health-summary">
          <div className="section-heading">
            <div>
              <span className="section-kicker">01 / LIVE SNAPSHOT</span>
              <h2>Your health at a glance</h2>
            </div>

            <span className="muted-label">
              <i className="bi bi-clock-history" /> SAMPLE DATA
            </span>
          </div>

          <div className="metric-grid">
            {healthMetrics.map((metric) => (
              <article
                className={`metric-card metric-${metric.color}`}
                key={metric.label}
              >
                <div className="metric-top">
                  <span>{metric.label}</span>
                  <i className={`bi ${metric.icon}`} />
                </div>

                <div className="metric-value">
                  {metric.value}
                  <small>{metric.unit}</small>
                </div>

                <div className="metric-bottom">
                  <span className="metric-status-dot" />
                  {metric.change}
                </div>

                <div className="metric-decoration" />
              </article>
            ))}
          </div>
        </section>

        <div className="dashboard-grid">
          <section className="panel activity-panel" id="insights">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">02 / WEEKLY OVERVIEW</span>
                <h2>Your rhythm</h2>
              </div>

              <button type="button" className="period-select">
                This week <i className="bi bi-chevron-down" />
              </button>
            </div>

            <div className="chart-summary">
              <strong>
                82<span>/100</span>
              </strong>

              <span className="chart-positive">
                <i className="bi bi-arrow-up-right" /> +8.4%
              </span>

              <small>Wellness consistency score</small>
            </div>

            <div className="chart">
              {week.map((item, index) => (
                <div className="chart-column" key={`${item.day}-${index}`}>
                  <div
                    className={`chart-bar ${
                      index === 5 ? "chart-bar-highlight" : ""
                    }`}
                    style={{ height: `${item.height}%` }}
                  >
                    {index === 5 && <span className="chart-tooltip">95%</span>}
                  </div>

                  <span
                    className={
                      index === 5 ? "chart-day chart-day-active" : "chart-day"
                    }
                  >
                    {item.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="chart-footer">
              <span>
                <i className="bi bi-circle-fill" /> Wellness score
              </span>
              <span>Updated today</span>
            </div>
          </section>

          <section className="panel appointment-panel" id="appointments">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">03 / UP NEXT</span>
                <h2>Take care of you</h2>
              </div>

              <span className="appointment-icon">
                <i className="bi bi-calendar-heart" />
              </span>
            </div>

            <div className="appointment-card">
              <div className="appointment-date">
                <strong>21</strong>
                <span>OCT</span>
              </div>

              <div className="appointment-details">
                <span className="appointment-type">GENERAL CHECKUP</span>
                <strong>Annual check-up</strong>
                <span>
                  <i className="bi bi-clock" /> 10:30 AM
                </span>
              </div>
            </div>

            <div className="doctor-row">
              <div className="doctor-avatar">
                <i className="bi bi-person-fill" />
              </div>

              <div>
                <strong>Dr. Sarah Mitchell</strong>
                <span>Family medicine</span>
              </div>

              <i className="bi bi-arrow-up-right doctor-arrow" />
            </div>

            <button
              type="button"
              className="outline-button"
              onClick={() => navigate("/appointments")}
            >
              View appointment details <i className="bi bi-arrow-right" />
            </button>
          </section>
        </div>

        <RecentHealthRecords />

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

export default Dashboard;
