document.addEventListener('DOMContentLoaded', () => {
  // Pega o id da notícia da URL
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));

  // Puxa os posts do backend
  fetch('http://localhost:3000/posts')
    .then(res => res.json())
    .then(posts => {
      const noticia = posts.find(p => p.id_conteudo === id);

      if (!noticia) {
        console.error('Notícia não encontrada');
        return;
      }

      // Atualiza título, lide e data
      document.querySelector('.ni-title h1').textContent = noticia.co_titulo || '';
      document.querySelector('.ni-title p').textContent = noticia.co_lide || '';
      document.querySelector('.ni-date p').textContent = noticia.co_data ? `Publicada em ${new Date(noticia.co_data).toLocaleDateString()}` : '';

      // Conteúdo completo
      document.querySelector('.ni-text p').textContent = noticia.co_conteudo || '';

      // Autor
      if (noticia.autor_nome) {
        document.querySelector('.ni-author p').textContent = `Por ${noticia.autor_nome}`;
      }

      // Referência
      if (noticia.co_citacao) {
        document.querySelector('.ni-reference p').textContent = noticia.co_citacao;
      }

      // Seleciona a div que irá ter o background (ajuste conforme sua estrutura HTML)
      const imgDiv = document.querySelector('.ni-img');
      if (!imgDiv) {
        console.error('A div com a classe "ni-img" não foi encontrada.');
        return;
      }

      // Imagem como background inline (mesmo esquema que você mandou)
      const exts = ["jpg", "png", "webp"];
      let found = false;

      exts.forEach(ext => {
        const url = `../src/assets/image/co${noticia.id_conteudo}.${ext}`;
        console.log("Tentando carregar imagem:", url);
        const img = new Image();
        img.src = url;

        img.onload = () => {
          if (!found) {
            found = true;
            console.log("Imagem carregada com sucesso:", url);
            imgDiv.style.backgroundImage = `url('${url}')`;
          }
        };

        img.onerror = () => {
          console.error("Erro ao carregar a imagem:", url);
        };
      });

      setTimeout(() => {
        if (!found) {
          imgDiv.style.backgroundImage = `url('../src/assets/image/co3.webp')`;
          console.log("Fallback para imagem padrão");
        }
      }, 300);

    })
    .catch(err => console.error('Erro ao carregar notícia:', err));
});
