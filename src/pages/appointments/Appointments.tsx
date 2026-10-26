import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

type Appointment = {
  id: string;
  appointmentTitle: string;
  appointmentType: string;
  doctorName: string;
  specialty: string;
  appointmentDate: string;
  appointmentTime: string;
  location: string;
  appointmentNotes: string;
  createdAt?: Timestamp;
};

export default function Appointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let unsubscribeAppointments: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // Prekini prethodno slušanje ako se korisnik promijeni.
      if (unsubscribeAppointments) {
        unsubscribeAppointments();
        unsubscribeAppointments = undefined;
      }

      if (!user) {
        setAppointments([]);
        setError("Please log in to view your appointments.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      const appointmentsRef = collection(db, "users", user.uid, "appointments");

      const appointmentsQuery = query(
        appointmentsRef,
        orderBy("appointmentDate", "asc"),
      );

      unsubscribeAppointments = onSnapshot(
        appointmentsQuery,
        (snapshot) => {
          const appointmentsData = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          })) as Appointment[];

          setAppointments(appointmentsData);
          setError("");
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching appointments:", error);
          setError("Failed to load appointments. Please try again.");
          setLoading(false);
        },
      );
    });

    return () => {
      unsubscribeAuth();
      unsubscribeAppointments?.();
    };
  }, []);

  const formatDate = (date: string) => {
    if (!date) return "Date not set";

    const parsedDate = new Date(`${date}T12:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatType = (type: string) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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

          <div className="appointments-header-actions">
            <button
              type="button"
              className="appointments-dashboard-button"
              onClick={() => navigate("/dashboard")}
            >
              <i className="bi bi-arrow-left" />
              <span>Back to Dashboard</span>
            </button>

            <div className="appointments-header-icon">
              <i className="bi bi-calendar2-check" />
            </div>
          </div>
        </header>

        <section className="appointments-list-section">
          <div className="appointments-list-heading">
            <div>
              <h2>Your appointments</h2>
              <p>Keep track of your upcoming medical visits.</p>
            </div>

            <div className="appointments-heading-actions">
              <span className="appointments-count">
                {appointments.length}{" "}
                {appointments.length === 1 ? "appointment" : "appointments"}
              </span>

              <button
                type="button"
                className="appointments-add-button"
                onClick={() => navigate("/addappointment")}
              >
                <i className="bi bi-plus-lg" />
                <span>Add Appointment</span>
              </button>
            </div>
          </div>

          {loading && (
            <div className="appointments-message">
              <i className="bi bi-arrow-repeat loading-icon" />
              <p>Loading your appointments...</p>
            </div>
          )}

          {!loading && error && (
            <div className="appointments-message error-message">
              <i className="bi bi-exclamation-circle" />
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && appointments.length === 0 && (
            <div className="appointments-empty">
              <div className="appointments-empty-icon">
                <i className="bi bi-calendar-plus" />
              </div>

              <h3>No appointments yet</h3>
              <p>
                You haven't added any appointments yet. Click the button above
                to schedule your first medical visit.
              </p>
            </div>
          )}

          {!loading && !error && appointments.length > 0 && (
            <div className="appointments-list">
              {appointments.map((appointment) => (
                <article className="appointment-card" key={appointment.id}>
                  <div className="appointment-date">
                    <i className="bi bi-calendar3" />
                    <span>{formatDate(appointment.appointmentDate)}</span>
                  </div>

                  <div className="appointment-card-content">
                    <div className="appointment-card-top">
                      <div>
                        <span className="appointment-type">
                          {formatType(appointment.appointmentType || "other")}
                        </span>

                        <h3>
                          {appointment.appointmentTitle ||
                            "Untitled appointment"}
                        </h3>
                      </div>

                      <span className="appointment-time">
                        <i className="bi bi-clock" />
                        {appointment.appointmentTime || "Time not set"}
                      </span>
                    </div>

                    {(appointment.doctorName || appointment.specialty) && (
                      <div className="appointment-detail">
                        <i className="bi bi-person-badge" />
                        <span>
                          {appointment.doctorName || "Doctor not specified"}
                          {appointment.specialty
                            ? ` · ${appointment.specialty}`
                            : ""}
                        </span>
                      </div>
                    )}

                    {appointment.location && (
                      <div className="appointment-detail">
                        <i className="bi bi-geo-alt" />
                        <span>{appointment.location}</span>
                      </div>
                    )}

                    {appointment.appointmentNotes && (
                      <div className="appointment-notes">
                        <span>Notes</span>
                        <p>{appointment.appointmentNotes}</p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
