/* If deploying static, replace this file during CI or set API_URL in runtime */
if (typeof window !== 'undefined' && !window.API_URL) {
  window.API_URL = 'REPLACE_WITH_BACKEND_URL';
}
