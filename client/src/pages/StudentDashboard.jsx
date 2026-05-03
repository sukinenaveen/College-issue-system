import { useState, useEffect } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import IssueTable from "../components/IssueTable";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

/**
 * Student dashboard — shows welcome, quick stats, and their issue history
 */
export default function StudentDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "" });

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await API.get(`/issues/student/${user.id}`);
      setIssues(res.data);
    } catch (err) {
      setToast({ message: "Failed to load issues", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const pending = issues.filter((i) => i.status === "Pending").length;
  const inProgress = issues.filter((i) => i.status === "In Progress").length;
  const resolved = issues.filter((i) => i.status === "Completed").length;

  return (
    <div className="page-wrapper">
      <Navbar />
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />

      <main className="dashboard-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-text">
            <h1>Welcome back, <span className="highlight">{user.name}</span> 👋</h1>
            <p>Track and manage your campus issues from one place.</p>
          </div>
          <button className="btn-primary btn-raise" onClick={() => navigate("/raise-issue")}>
            + Raise New Issue
          </button>
        </section>

        {/* Quick Stats */}
        <section className="student-stats">
          <div className="mini-stat">
            <span className="mini-stat-count">{issues.length}</span>
            <span className="mini-stat-label">Total Issues</span>
          </div>
          <div className="mini-stat mini-stat-pending">
            <span className="mini-stat-count">{pending}</span>
            <span className="mini-stat-label">Pending</span>
          </div>
          <div className="mini-stat mini-stat-progress">
            <span className="mini-stat-count">{inProgress}</span>
            <span className="mini-stat-label">In Progress</span>
          </div>
          <div className="mini-stat mini-stat-resolved">
            <span className="mini-stat-count">{resolved}</span>
            <span className="mini-stat-label">Completed</span>
          </div>
        </section>

        {/* Issue History */}
        <section className="section-card">
          <h2 className="section-title">📋 My Issues</h2>
          <IssueTable issues={issues} isAdmin={false} loading={loading} />
        </section>
      </main>
    </div>
  );
}
