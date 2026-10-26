// Formatting helpers and status colours shared by admin pages
export const STATUS_TONES = {
  New: "orange", Contacted: "blue", "In Progress": "amber", Closed: "slate",
  Planning: "violet", Review: "blue", Completed: "green", "On Hold": "red",
  draft: "amber", published: "green",
};

export const toDateInput = (value) => (value ? new Date(value).toISOString().slice(0, 10) : "");
export const formatINR = (value) => (value || value === 0 ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value) : "—");
export const formatDateTime = (value) => (value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—");
