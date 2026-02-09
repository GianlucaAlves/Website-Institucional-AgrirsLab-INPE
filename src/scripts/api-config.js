// Global API Configuration
// Este arquivo deve ser incluído em TODAS as páginas HTML antes de qualquer outro script
// Exemplo: <script src="/src/scripts/api-config.js"></script>

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

  console.log("API Base URL:", window.API_BASE_URL);
})();
