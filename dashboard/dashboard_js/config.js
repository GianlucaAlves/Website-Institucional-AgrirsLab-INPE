// dashboard/dashboard_js/config.js
// Configuração da API base URL para o Dashboard
// Em produção (Vercel), usa o domínio atual
// Em desenvolvimento, usa localhost:3000

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000'
  : window.location.origin;

export default API_BASE_URL;
