// src/scripts/config.js
// Configuração da API base URL
// Em produção (Vercel), usa o domínio atual
// Em desenvolvimento, usa localhost:3000

const API_BASE_URL =
  window.BACKEND_BASE_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : window.location.origin);

export default API_BASE_URL;
