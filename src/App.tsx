
import './App.css';

const healthMetrics = [
  { label: 'Heart rate', value: '72', unit: 'BPM', icon: 'bi-heart-pulse', change: 'Normal range', color: 'lime' },
  { label: 'Blood pressure', value: '118/78', unit: 'mmHg', icon: 'bi-activity', change: 'Optimal', color: 'purple' },
  { label: 'Sleep quality', value: '8.2', unit: 'HRS', icon: 'bi-moon-stars', change: '+12% this week', color: 'blue' },
];

const records = [
  { date: '12', month: 'OCT', title: 'Annual health examination', category: 'GENERAL CHECKUP', doctor: 'Dr. Sarah Mitchell', status: 'Completed', icon: 'bi-clipboard2-pulse' },
  { date: '08', month: 'OCT', title: 'Blood test results', category: 'LABORATORY', doctor: 'City Medical Center', status: 'Reviewed', icon: 'bi-droplet-half' },
  { date: '02', month: 'OCT', title: 'Influenza vaccination', category: 'VACCINATION', doctor: 'Dr. James Wilson', status: 'Completed', icon: 'bi-shield-plus' },
];

const week = [
  { day: 'M', height: 42 },
  { day: 'T', height: 66 },
  { day: 'W', height: 51 },
  { day: 'T', height: 83 },
  { day: 'F', height: 61 },
  { day: 'S', height: 95 },
  { day: 'S', height: 72 },
];

function App() {
  return (
    <div className="health-app">
      <aside className="sidebar">
        <a href="#dashboard" className="brand">
          <span className="brand-mark"><i className="bi bi-plus-lg" /></span>
          <span>pulse<span className="brand-light">care</span><small>PERSONAL HEALTH OS</small></span>
        </a>

        <div className="nav-label">WORKSPACE</div>
        <nav className="app-nav">
          <a className="nav-item active" href="#dashboard"><i className="bi bi-grid-1x2-fill" /> Overview <span className="nav-indicator" /></a>
          <a className="nav-item" href="#records"><i className="bi bi-folder2-open" /> Medical records <span className="nav-count">12</span></a>
          <a className="nav-item" href="#medications"><i className="bi bi-capsule" /> Medications</a>
          <a className="nav-item" href="#appointments"><i className="bi bi-calendar2-week" /> Appointments <span className="nav-dot" /></a>
          <a className="nav-item" href="#insights"><i className="bi bi-graph-up-arrow" /> Health insights</a>
        </nav>

        <div className="sidebar-bottom">
          <div className="privacy-card">
            <div className="privacy-icon"><i className="bi bi-shield-lock" /></div>
            <span className="privacy-title">Your health. Your data.</span>
            <p>Your personal health information deserves privacy.</p>
            <a href="#privacy">Privacy settings <i className="bi bi-arrow-up-right" /></a>
          </div>
          <div className="profile">
            <div className="avatar">AM</div>
            <div className="profile-info"><strong>Alex Morgan</strong><span>Personal account</span></div>
            <button className="icon-button" aria-label="Account options"><i className="bi bi-three-dots" /></button>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div className="breadcrumb">Workspace <i className="bi bi-chevron-right" /> <strong>Overview</strong></div>
          <div className="top-actions">
            <span className="sync-status"><span /> ALL SYSTEMS HEALTHY</span>
            <button className="icon-button notification-button" aria-label="Notifications"><i className="bi bi-bell" /><span /></button>
            <div className="top-date"><i className="bi bi-calendar3" /> OCT 2026</div>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> YOUR PERSONAL HEALTH SPACE</div>
            <h1>Know your body.<br /><span>Own your health.</span></h1>
            <p className="welcome-copy">One clear view of your health journey, all in one place.</p>
          </div>
          <div className="welcome-right">
            <div className="date-label">TUESDAY, OCTOBER 14</div>
            <button className="primary-button" onClick={() => document.getElementById('records')?.scrollIntoView({ behavior: 'smooth' })}>
              <i className="bi bi-plus-lg" /> Add health record
            </button>
          </div>
          <div className="hero-decoration"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit-core"><i className="bi bi-heart-pulse" /></div><span className="orbit-label">HEALTH<br />IN FOCUS</span></div>
        </section>

        <section className="health-summary">
          <div className="section-heading">
            <div><span className="section-kicker">01 / LIVE SNAPSHOT</span><h2>Your health at a glance</h2></div>
            <span className="muted-label"><i className="bi bi-clock-history" /> SAMPLE DATA</span>
          </div>

          <div className="metric-grid">
            {healthMetrics.map((metric) => (
              <article className={`metric-card metric-${metric.color}`} key={metric.label}>
                <div className="metric-top"><span>{metric.label}</span><i className={`bi ${metric.icon}`} /></div>
                <div className="metric-value">{metric.value}<small>{metric.unit}</small></div>
                <div className="metric-bottom"><span className="metric-status-dot" />{metric.change}</div>
                <div className="metric-decoration" />
              </article>
            ))}
          </div>
        </section>

        <div className="dashboard-grid">
          <section className="panel activity-panel" id="insights">
            <div className="panel-heading">
              <div><span className="section-kicker">02 / WEEKLY OVERVIEW</span><h2>Your rhythm</h2></div>
              <button className="period-select">This week <i className="bi bi-chevron-down" /></button>
            </div>
            <div className="chart-summary"><strong>82<span>/100</span></strong><span className="chart-positive"><i className="bi bi-arrow-up-right" /> +8.4%</span><small>Wellness consistency score</small></div>
            <div className="chart">
              {week.map((item, index) => (
                <div className="chart-column" key={`${item.day}-${index}`}>
                  <div className={`chart-bar ${index === 5 ? 'chart-bar-highlight' : ''}`} style={{ height: `${item.height}%` }}>
                    {index === 5 && <span className="chart-tooltip">95%</span>}
                  </div>
                  <span className={index === 5 ? 'chart-day chart-day-active' : 'chart-day'}>{item.day}</span>
                </div>
              ))}
            </div>
            <div className="chart-footer"><span><i className="bi bi-circle-fill" /> Wellness score</span><span>Updated today</span></div>
          </section>

          <section className="panel appointment-panel" id="appointments">
            <div className="panel-heading">
              <div><span className="section-kicker">03 / UP NEXT</span><h2>Take care of you</h2></div>
              <span className="appointment-icon"><i className="bi bi-calendar-heart" /></span>
            </div>
            <div className="appointment-card">
              <div className="appointment-date"><strong>21</strong><span>OCT</span></div>
              <div className="appointment-details"><span className="appointment-type">GENERAL CHECKUP</span><strong>Annual check-up</strong><span><i className="bi bi-clock" /> 10:30 AM</span></div>
            </div>
            <div className="doctor-row"><div className="doctor-avatar"><i className="bi bi-person-fill" /></div><div><strong>Dr. Sarah Mitchell</strong><span>Family medicine</span></div><i className="bi bi-arrow-up-right doctor-arrow" /></div>
            <button className="outline-button" onClick={() => alert('Appointment management will be available when connected to your database.')}>View appointment details <i className="bi bi-arrow-right" /></button>
          </section>
        </div>

        <section className="panel records-panel" id="records">
          <div className="panel-heading records-heading">
            <div><span className="section-kicker">04 / YOUR HISTORY</span><h2>Recent medical records</h2><p className="panel-subtitle">Your health story, documented over time.</p></div>
            <button className="text-button" onClick={() => alert('Your full medical history will appear here once connected to Firestore.')}>View all records <i className="bi bi-arrow-up-right" /></button>
          </div>
          <div className="record-list">
            {records.map((record) => (
              <article className="record-row" key={record.title}>
                <div className="record-date"><strong>{record.date}</strong><span>{record.month}</span></div>
                <div className="record-icon"><i className={`bi ${record.icon}`} /></div>
                <div className="record-info"><span className="record-category">{record.category}</span><strong>{record.title}</strong><span className="record-doctor">{record.doctor}</span></div>
                <span className="record-status"><i className="bi bi-check-circle-fill" /> {record.status}</span>
                <button className="icon-button record-more" aria-label={`More options for ${record.title}`}><i className="bi bi-three-dots-vertical" /></button>
              </article>
            ))}
          </div>
        </section>

        <footer className="app-footer"><span><span className="footer-heart">+</span> pulsec are<span className="footer-dot">.</span></span><span>YOUR HEALTH JOURNEY, IN YOUR HANDS.</span><span>DESIGNED FOR WELLBEING <i className="bi bi-heart-pulse" /></span></footer>
      </main>
    </div>
  );
}

export default App;
