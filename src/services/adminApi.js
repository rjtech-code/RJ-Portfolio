import { request } from "./api";

// The admin token is a signed, expiring credential issued by the server. Every admin
// API call is authorised on the server; the browser copy only identifies the session.
const SESSION_KEY = "rj_admin_session";
export const SESSION_EXPIRED_EVENT = "rj-admin-session-expired";

export const getSession = () => {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));
    return session?.token ? session : null;
  } catch {
    return null;
  }
};

export const saveSession = (session) => localStorage.setItem(SESSION_KEY, JSON.stringify(session));
export const clearSession = () => localStorage.removeItem(SESSION_KEY);

const call = async (path, options = {}) => {
  const session = getSession();
  try {
    return await request(`/api/admin${path}`, { ...options, token: session?.token });
  } catch (error) {
    if (error.status === 401) {
      clearSession();
      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
    }
    throw error;
  }
};

export const login = async (email, password) => {
  const data = await request("/api/admin/login", { method: "POST", body: { email, password } });
  saveSession({ email: data.email, token: data.token });
  return data;
};

export const adminApi = {
  me: () => call("/me"),
  stats: () => call("/stats"),
  list: (resource) => call(`/${resource}`),
  get: (resource, id) => call(`/${resource}/${id}`),
  create: (resource, body) => call(`/${resource}`, { method: "POST", body }),
  update: (resource, id, body) => call(`/${resource}/${id}`, { method: "PATCH", body }),
  remove: (resource, id) => call(`/${resource}/${id}`, { method: "DELETE" }),
  // Enquiries use the existing contact endpoints
  enquiries: () => request("/api/contact", { token: getSession()?.token }).catch(handleContactError),
  updateEnquiry: (id, body) => request(`/api/contact/${id}`, { method: "PATCH", body, token: getSession()?.token }).catch(handleContactError),
  deleteEnquiry: (id) => request(`/api/contact/${id}`, { method: "DELETE", token: getSession()?.token }).catch(handleContactError),
  pages: () => call("/pages"),
  savePage: (key, body) => call(`/pages/${key}`, { method: "PUT", body }),
  settings: () => call("/settings"),
  saveSettings: (body) => call("/settings", { method: "PUT", body }),
  rebuild: () => call("/rebuild", { method: "POST" }),
};

function handleContactError(error) {
  if (error.status === 401) {
    clearSession();
    window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
  }
  throw error;
}
