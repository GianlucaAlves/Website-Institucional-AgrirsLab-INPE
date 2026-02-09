// Global API Configuration for Dashboard
// Este arquivo deve ser incluído em TODAS as páginas do dashboard antes de qualquer outro script
// Exemplo: <script src="/dashboard/dashboard_js/api-config.js"></script>

(function () {
  window.BACKEND_BASE_URL =
    "https://website-institucional-agrirslab-inpe.onrender.com";
  // Detecta automaticamente se está em desenvolvimento ou produção
  const isDevelopment =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const configuredBaseUrl = window.BACKEND_BASE_URL || window.API_BASE_URL;

  // Define a URL base da API
  window.API_BASE_URL =
    configuredBaseUrl ||
    (isDevelopment ? "http://localhost:3000" : window.location.origin);

  console.log("Dashboard API Base URL:", window.API_BASE_URL);
})();
