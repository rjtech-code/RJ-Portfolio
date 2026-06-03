export function getApiBaseUrl() {
  const env = import.meta.env.VITE_API_BASE_URL || '';
  if (typeof window !== 'undefined') {
    // If running on HTTPS but env provides an HTTP URL, force HTTPS
    if (env && window.location.protocol === 'https:' && env.startsWith('http://')) {
      return env.replace(/^http:\/\//, 'https://');
    }
    if (env) return env;

    // Fallback to same origin (useful for dev where backend proxies or same host are used)
    const port = window.location.port ? `:${window.location.port}` : '';
    return `${window.location.protocol}//${window.location.hostname}${port}`;
  }

  return env;
}
