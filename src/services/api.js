import { getApiBaseUrl } from "../utils/api.js";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function request(path, { method = "GET", body, token, signal } = {}) {
  let response;
  try {
    response = await fetch(`${getApiBaseUrl()}${path}`, {
      method,
      signal,
      headers: {
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new ApiError("Could not reach the server. Check your connection and try again.", 0);
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // empty or non-JSON body
  }
  if (!response.ok) throw new ApiError(data?.message || `Request failed (${response.status})`, response.status);
  return data;
}

export const publicApi = {
  bootstrap: (signal) => request("/api/public/bootstrap", { signal }),
  portfolioItem: (slug) => request(`/api/public/portfolio/${encodeURIComponent(slug)}`),
  post: (slug) => request(`/api/public/blog/${encodeURIComponent(slug)}`),
  submitEnquiry: (body) => request("/api/contact", { method: "POST", body }),
};
