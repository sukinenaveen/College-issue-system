import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

/**
 * Raise Issue page
 */
export default function RaiseIssue() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      setToast({ message: "Please enter both title and description", type: "error" });
      return;
    }

    setLoading(true);

    try {
      await API.post("/issues", {
        title: form.title,
        description: form.description,
      });

      setToast({ message: "Issue submitted successfully!", type: "success" });
      setForm({ title: "", description: "" });

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Failed to submit issue",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />

      <main className="dashboard-content">
        <section className="section-card raise-issue-card">
          <h2 className="section-title">🛠️ Raise a New Issue</h2>
          <p className="section-subtitle">Report a campus issue and we'll get it resolved.</p>

          <form className="raise-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="issue-title">Title</label>
              <input
                id="issue-title"
                type="text"
                className="form-input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="E.g., Fan not working in Room 301"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="issue-description">Description</label>
              <textarea
                id="issue-description"
                className="form-input"
                rows="4"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the issue in detail..."
                required
              ></textarea>
            </div>

            {form.title && (
              <div className="issue-preview">
                <h4>Issue Preview</h4>
                <div className="preview-row">
                  <span className="preview-label">Title:</span>
                  <span>{form.title}</span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">Description:</span>
                  <span>{form.description}</span>
                </div>
                <div className="preview-row">
                  <span className="preview-label">Status:</span>
                  <span className="status-badge status-pending">Pending</span>
                </div>
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <span className="btn-spinner"></span> : "Submit Issue"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
