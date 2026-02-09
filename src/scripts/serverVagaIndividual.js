document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1. Pega o ID da vaga que tá na URL
    const urlParams = new URLSearchParams(window.location.search);
    const vagaId = urlParams.get("id"); // <--- ESSE É O CERTO

    if (!vagaId) {
      console.error("Nenhum ID de vaga encontrado na URL");
      document.getElementById("va-content").innerHTML =
        "<p>Vaga não encontrada.</p>";
      return;
    }

    // 2. Busca os dados daquela vaga específica na API
    //    (!!! ATENÇÃO: Seu backend precisa ter essa rota: '/posts/:id')
    const res = await fetch(`${window.API_BASE_URL}/posts/${vagaId}`);
    const vaga = await res.json();

    // 3. Formata a data que veio do BD
    const dataPublicacao = new Date(vaga.co_data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    // 4. Popula o HTML com os dados da vaga
    //    (Usando os nomes das colunas do seu BD)

    // Atualiza o Título e a Data
    document.getElementById("title").textContent = vaga.co_titulo;
    document.querySelector("#va-title__info p em").textContent = dataPublicacao;

    // Pega os blocos de conteúdo (objetivo, requisitos, etc.)
    const blocos = document.querySelectorAll(".vai-content-block");

    // Bloco 1: Objetivo
    // (Pega o <p> dentro do primeiro <li>)
    blocos[0].querySelector("p").textContent = vaga.co_objetivo;

    // Bloco 2: Requisitos
    // (Pega o <ul> dentro do segundo <li>)
    const ulRequisitos = blocos[1].querySelector("ul");
    ulRequisitos.innerHTML = formatarLista(vaga.co_requisitos); // co_requisitos

    // Bloco 3: Plano de Trabalho
    // (Pega o <p> dentro do terceiro <li>)
    blocos[2].querySelector("p").textContent = vaga.co_plano_trabalho; // co_plano_trabalho

    // Bloco 4: Atividades
    // (Pega o <ul> dentro do quarto <li>)
    const ulAtividades = blocos[3].querySelector("ul");
    ulAtividades.innerHTML = formatarLista(vaga.co_atividades); // co_atividades
  } catch (err) {
    console.error("Erro ao carregar dados da vaga:", err);
    document.getElementById("va-content").innerHTML =
      "<p style='text-align: center; color: #fff;'>Deu ruim, mano. Não carregou essa vaga.</p>";
  }
});

/**
 * Função braba pra formatar as listas.
 * Ela pega um texto tipo "Item 1; Item 2; Item 3"
 * e transforma em <li>Item 1</li><li>Item 2</li><li>Item 3</li>
 *
 * !!! ATENÇÃO: Se no seu BD você separa por vírgula (,) ou outra coisa,
 * TROQUE o .split(';')
 */
function formatarLista(texto) {
  if (!texto) return "<li>Informação não disponível.</li>";

  return texto
    .split(";") // <-- MUDE AQUI SE O SEPARADOR FOR OUTRO
    .map((item) => `<li>${item.trim()}</li>`)
    .join("");
}
