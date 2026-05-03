import { useState } from "react";

/**
 * Reusable issue table component
 * Displays issues with status badges and optional admin action buttons
 */
export default function IssueTable({ issues, isAdmin, onUpdateStatus, loading }) {
  const [editingId, setEditingId] = useState(null);
  const [resolution, setResolution] = useState("");
  const [status, setStatus] = useState("");

  const getStatusClass = (status) => {
    const map = {
      Pending: "status-pending",
      "In Progress": "status-progress",
      Completed: "status-resolved",
    };
    return map[status] || "status-pending";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="table-loading">
        <div className="spinner"></div>
        <p>Loading issues...</p>
      </div>
    );
  }

  if (!issues || issues.length === 0) {
    return (
      <div className="table-empty">
        <span className="empty-icon">📋</span>
        <p>No issues found</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="issue-table">
        <thead>
          <tr>
            <th>#</th>
            {isAdmin && <th>Student ID</th>}
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Resolution</th>
            <th>Date</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {issues.map((issue, index) => {
            const id = issue._id || issue.id;
            return (
            <tr key={id} className="table-row-animate">
              <td>{index + 1}</td>
              {isAdmin && (
                <td className="td-student">
                  {issue.student_id ? (
                    <div>
                      <div style={{ fontWeight: "bold" }}>{issue.student_id.name || "Unknown"}</div>
                      <div style={{ fontSize: "0.8em", opacity: 0.8 }}>{issue.student_id._id || issue.student_id}</div>
                    </div>
                  ) : "—"}
                </td>
              )}
              <td>
                <span className="type-badge">{issue.title}</span>
              </td>
              <td style={{ maxWidth: "200px", whiteSpace: "normal" }}>{issue.description}</td>
              <td>
                {editingId === id ? (
                  <select
                    className="assign-input"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  <span className={`status-badge ${getStatusClass(issue.status)}`}>
                    {issue.status}
                  </span>
                )}
              </td>
              <td>
                {editingId === id ? (
                  <input
                    className="assign-input"
                    type="text"
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    placeholder="Enter resolution..."
                  />
                ) : (
                  <span className="assigned-text">
                    {issue.resolution || "—"}
                  </span>
                )}
              </td>
              <td className="td-date">{formatDate(issue.created_at || issue.createdAt)}</td>
              {isAdmin && (
                <td className="td-actions">
                  {editingId === id ? (
                    <div className="action-group">
                      <button
                        className="btn-action btn-save"
                        onClick={() => {
                          onUpdateStatus(id, status, resolution);
                          setEditingId(null);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="btn-action btn-cancel"
                        onClick={() => {
                          setEditingId(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="action-group">
                      <button
                        className="btn-action btn-assign"
                        onClick={() => {
                          setEditingId(id);
                          setStatus(issue.status);
                          setResolution(issue.resolution || "");
                        }}
                      >
                        Update
                      </button>
                    </div>
                  )}
                </td>
              )}
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
