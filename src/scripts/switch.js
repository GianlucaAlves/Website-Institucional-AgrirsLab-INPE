document.addEventListener("DOMContentLoaded", () => {
  const switches = document.querySelectorAll('.sw-switch input');

  switches.forEach((checkbox) => {
    const circle = checkbox.parentElement.querySelector('.sw-circle');

    if (!circle) return;

    checkbox.addEventListener('change', () => {
      const onTransitionEnd = (e) => {
        if (e.propertyName === 'transform') {
          circle.removeEventListener('transitionend', onTransitionEnd);

          // Pega o caminho atual
          let currentPath = window.location.pathname;

          // Se estiver em "pages", troca pra "en-pages"
          if (checkbox.checked) {
            currentPath = currentPath.replace("/pages/", "/en-pages/");
          } 
          // Se estiver em "en-pages", troca pra "pages"
          else {
            currentPath = currentPath.replace("/en-pages/", "/pages/");
          }

          window.location.href = currentPath;
        }
      };

      circle.addEventListener('transitionend', onTransitionEnd);
    });
  });
});