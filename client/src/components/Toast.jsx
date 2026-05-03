import { useEffect } from "react";

/**
 * Toast notification component
 * Shows success/error messages and auto-dismisses after 3 seconds
 */
export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">
        {type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"}
      </span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
}
