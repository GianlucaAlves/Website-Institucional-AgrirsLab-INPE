document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("http://localhost:3000/posts?tipo=2"); // notícias
    const noticias = await res.json();

    const cards = document.querySelectorAll(".no-content");

    cards.forEach((card, i) => {
      const pub = noticias[i];

      if (!pub) {
        card.style.display = "none";
        return;
      }

      // ===============================
      //   IMAGEM (webp → jpg → png → default)
      // ===============================
      const imgDiv = card.querySelector("[class^='no-img']");
      if (imgDiv) {
        const base = `../src/assets/image/co${pub.id_conteudo}`;

        const tryLoad = async (exts) => {
          for (let ext of exts) {
            const path = `${base}.${ext}`;
            try {
              const res = await fetch(path, { method: "HEAD" });
              if (res.ok) {
                imgDiv.style.backgroundImage = `url('${path}')`;
                return true;
              }
            } catch (e) { }
          }
          imgDiv.style.backgroundImage = `url('../src/assets/image/default.png')`;
        };

        tryLoad(["webp", "jpg", "png"]);
      }

      // ===============================
      //   TÍTULO + RESUMO (LIDE)
      // ===============================
      const h3 = card.querySelector("h3");
      if (h3) h3.textContent = pub.co_titulo;

      const p = card.querySelector("p");
      if (p) p.textContent = pub.co_lide ?? "Sem resumo disponível.";

      // ===============================
      //   CLIQUE NA DIV → NOTÍCIA INDIVIDUAL
      // ===============================
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        window.location.href = `notindividual.html?id=${pub.id_conteudo}`;
      });

      // ===============================
      //   REMOVER LINKS INTERFERENTES
      // ===============================
      const a = card.querySelector("a");
      if (a) a.removeAttribute("href");
    });

  } catch (err) {
    console.error("Erro ao carregar notícias:", err);
  }
});

