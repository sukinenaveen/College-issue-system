import { useState, useEffect } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import IssueTable from "../components/IssueTable";
import Toast from "../components/Toast";

/**
 * Admin Dashboard — stats overview, all issues table with action controls
 */
export default function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("All");
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [issueRes, statsRes] = await Promise.all([
        API.get("/issues"),
        API.get("/stats"),
      ]);
      setIssues(issueRes.data);
      setStats(statsRes.data);
    } catch (err) {
      setToast({ message: "Failed to load dashboard data", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status, resolution) => {
    try {
      await API.put(`/issues/${id}`, { status, resolution });
      setToast({ message: `Issue updated to "${status}"`, type: "success" });
      fetchData(); // Refresh data
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Failed to update issue",
        type: "error",
      });
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (filter === "All") return true;
    return issue.status === filter;
  });

  return (
    <div className="page-wrapper">
      <Navbar />
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />

      <main className="dashboard-content">
        {/* Header */}
        <section className="welcome-section">
          <div className="welcome-text">
            <h1>Admin Dashboard 🛡️</h1>
            <p>Manage and resolve all campus issues.</p>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="stats-grid">
          <StatsCard icon="📊" label="Total Issues" count={stats.total} color="#6366f1" />
          <StatsCard icon="⏳" label="Pending" count={stats.pending} color="#ef4444" />
          <StatsCard icon="🔄" label="In Progress" count={stats.inProgress} color="#f59e0b" />
          <StatsCard icon="✅" label="Completed" count={stats.resolved} color="#10b981" />
        </section>

        {/* All Issues Table */}
        <section className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>📋 All Issues</h2>
            <div className="filter-group">
              <select 
                className="assign-input" 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                style={{ width: "150px" }}
              >
                <option value="All">All Issues</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <IssueTable
            issues={filteredIssues}
            isAdmin={true}
            loading={loading}
            onUpdateStatus={handleUpdateStatus}
          />
        </section>
      </main>
    </div>
  );
}
