# Guia de Migração de URLs para Produção

## Problema

Atualmente, o projeto possui URLs hardcoded para `http://localhost:3000` em vários arquivos. Isso impede que o site funcione corretamente quando deployado no Vercel ou outro ambiente de produção.

## Solução

Foram criados arquivos de configuração que detectam automaticamente o ambiente:

- `src/scripts/config.js` - Para o website principal
- `dashboard/dashboard_js/config.js` - Para o dashboard

Estes arquivos exportam `API_BASE_URL` que será:
- `http://localhost:3000` em desenvolvimento (localhost)
- URL do site atual em produção (Vercel)

## Como Atualizar os Arquivos

### Arquivos que Precisam ser Atualizados

#### Website Principal (src/scripts/)
1. ✅ `ProjetosIndividual.js`
2. ✅ `serverVagaIndividual.js`
3. ✅ `serverProjetos.js`
4. ✅ `membros.js`
5. ✅ `servervagas.js`
6. ✅ `publicacoes.js`
7. ✅ `home.js`
8. ✅ `servernotindividual.js`
9. ✅ `servernoticias.js`

#### Dashboard (dashboard/dashboard_js/)
1. ✅ `listar-membros.js`
2. ✅ `script.js`
3. ✅ `posts.js`
4. ✅ `editar-membro.js`
5. ✅ `criar-membros.js`
6. ✅ `listar-posts.js`

#### Páginas HTML
1. ✅ `pages/contato.html`

## Instruções de Atualização

### Para Arquivos JavaScript

**ANTES:**
```javascript
const apiUrl = "http://localhost:3000/membros";
```

**DEPOIS:**
```javascript
import API_BASE_URL from './config.js';
const apiUrl = `${API_BASE_URL}/membros`;
```

### Para Arquivos HTML com Forms

**ANTES:**
```html
<form action="http://localhost:3000/enviar" method="post">
```

**DEPOIS:**
```html
<form action="/enviar" method="post">
```

**Nota:** Em arquivos HTML, use URLs relativas (começando com `/`) pois o Vercel roteará automaticamente.

### Exemplo Completo de Migração

**Arquivo:** `src/scripts/membros.js`

**ANTES:**
```javascript
const API_URL = "http://localhost:3000/membros";

async function fetchMembros() {
    const res = await fetch(API_URL);
    // ...
    const imgUrl = `http://localhost:3000/uploads/${imagem}`;
}
```

**DEPOIS:**
```javascript
import API_BASE_URL from './config.js';

const API_URL = `${API_BASE_URL}/membros`;

async function fetchMembros() {
    const res = await fetch(API_URL);
    // ...
    const imgUrl = `${API_BASE_URL}/uploads/${imagem}`;
}
```

## Arquivos a Serem Atualizados

### 1. src/scripts/ProjetosIndividual.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 2. src/scripts/serverVagaIndividual.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 3. src/scripts/serverProjetos.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 4. src/scripts/membros.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 5. src/scripts/servervagas.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 6. src/scripts/publicacoes.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 7. src/scripts/home.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 8. src/scripts/servernotindividual.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 9. src/scripts/servernoticias.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 10. dashboard/dashboard_js/listar-membros.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 11. dashboard/dashboard_js/script.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 12. dashboard/dashboard_js/posts.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 13. dashboard/dashboard_js/editar-membro.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 14. dashboard/dashboard_js/criar-membros.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 15. dashboard/dashboard_js/listar-posts.js
```javascript
import API_BASE_URL from './config.js';
// Substituir http://localhost:3000 por API_BASE_URL
```

### 16. pages/contato.html
```html
<!-- Trocar de http://localhost:3000/enviar para /enviar -->
<form action="/enviar" method="post">
```

## Verificação

Após fazer as alterações:

1. **Teste localmente:**
```bash
cd backend
npm run dev
```
Abra o site em `http://localhost:3000` e verifique se tudo funciona.

2. **Teste no Vercel:**
Faça o deploy e verifique se as requisições estão sendo feitas para a URL correta do Vercel.

## Notas Importantes

- ⚠️ **Module Type:** Os arquivos HTML que importam os scripts devem usar `type="module"`:
  ```html
  <script type="module" src="./script.js"></script>
  ```

- ⚠️ **CORS:** O backend já está configurado com CORS aberto. Em produção, considere restringir para seu domínio.

- ⚠️ **Extensões .js:** Sempre use `.js` nas importações quando estiver usando ES modules.

## Status da Migração

- [ ] Atualizar todos os arquivos em `src/scripts/`
- [ ] Atualizar todos os arquivos em `dashboard/dashboard_js/`
- [ ] Atualizar `pages/contato.html`
- [ ] Verificar se as páginas HTML usam `type="module"`
- [ ] Testar localmente
- [ ] Fazer deploy no Vercel e testar

## Alternativa Simples (Se Preferir)

Se você não quiser usar ES modules, pode adicionar o script de configuração diretamente nas páginas HTML:

```html
<script>
  window.API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'
    : window.location.origin;
</script>
```

E então usar `window.API_BASE_URL` em vez de importar o módulo.
